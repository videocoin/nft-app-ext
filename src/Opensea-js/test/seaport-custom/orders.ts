import * as dotenv from "dotenv"
dotenv.config()

import {
    assert,
} from 'chai'

import { before } from 'mocha'

import {
  suite,
  test,
} from 'mocha-typescript'

const HDWalletProvider = require("@truffle/hdwallet-provider");

import { OpenSeaPort } from '../../src/index'
import { Network, OrderJSON, OrderSide, Order, SaleKind, UnhashedOrder, UnsignedOrder, Asset, WyvernSchemaName } from '../../src/types'
import { orderFromJSON, getOrderHash, estimateCurrentPrice, assignOrdersToSides, makeBigNumber} from '../../src/utils/utils'
import * as ordersJSONFixture from '../fixtures/orders.json'
import { BigNumber } from 'bignumber.js'
import { DIGITAL_ART_CHAIN_ADDRESS, DIGITAL_ART_CHAIN_TOKEN_ID, MYTHEREUM_TOKEN_ID, MYTHEREUM_ADDRESS, CK_ADDRESS, DEVIN_ADDRESS, CUSTOM_API_KEY } from '../constants'
import {
  NULL_ADDRESS,
  OPENSEA_FEE_RECIPIENT,
  CUSTOM_PROVIDER_URL
} from '../../src/constants'

import { testFeesMakerOrder } from '../seaport/fees'

// priv key 924f4fa9485ff65be55c3297a8dc05b71af1c8b82996fdda2ca683449f59c7ab
const TARAS_ADDRESS = '0x3f374c806ef204cadb31540d013a433af4946b51'
// priv key 2bc6381c5a2b8ec7fb498a2227e168b375609c9b6d28b005032d323a1b21ee55
const TARAS_ADDRESS_2 = '0xa48711dda65b4d9bf38c0670413b40e80f15d810'

const WETH_TOKEN_ADDRESS = '0x9834f449937e29d5a26465d1a9cda2fe234570ec'

const TESTERC1155_TOKEN = '0xA1DC45Fd27A498BB500184571c0bE17B094A903f'
// owner TARAS_ADDRESS
const BIG_BUCK_BUNNY_TOKEN = 0x309
const RUNNING_HORSE_TOKEN = 0x29a

const ordersJSON = ordersJSONFixture as any

const customProvider = new HDWalletProvider(
  [
    '924f4fa9485ff65be55c3297a8dc05b71af1c8b82996fdda2ca683449f59c7ab', 
    '2bc6381c5a2b8ec7fb498a2227e168b375609c9b6d28b005032d323a1b21ee55'
  ], 
  CUSTOM_PROVIDER_URL
)

const client = new OpenSeaPort(customProvider, {
  networkName: Network.Custom,
  apiKey: CUSTOM_API_KEY
}, line => console.info(`CUSTOM: ${line}`))

const assetsForBundleOrder = [
  { tokenId: MYTHEREUM_TOKEN_ID.toString(), tokenAddress: MYTHEREUM_ADDRESS },
  { tokenId: DIGITAL_ART_CHAIN_TOKEN_ID.toString(), tokenAddress: DIGITAL_ART_CHAIN_ADDRESS },
]

let manaAddress: string
let daiAddress: string

suite('Custom seaport: orders', () => {

  before(async () => {
    daiAddress = (await client.api.getPaymentTokens({ symbol: 'DAI'})).tokens[0].address
    manaAddress = (await client.api.getPaymentTokens({ symbol: 'MANA'})).tokens[0].address
  })

  ordersJSON.map((orderJSON: OrderJSON, index: number) => {
    test('Order #' + index + ' has correct types', () => {
      const order = orderFromJSON(orderJSON)
      assert.instanceOf(order.basePrice, BigNumber)
      assert.typeOf(order.hash, "string")
      assert.typeOf(order.maker, "string")
      assert.equal(+order.quantity, 1)
    })
  })

  ordersJSON.map((orderJSON: OrderJSON, index: number) => {
    test('Order #' + index + ' has correct hash', () => {
      const order = orderFromJSON(orderJSON)
      assert.equal(order.hash, getOrderHash(order))
    })
  })

  test("Correctly sets decimals on fungible order", async () => {
    const accountAddress = TARAS_ADDRESS
    const tokenId = BIG_BUCK_BUNNY_TOKEN.toString()
    const tokenAddress = TESTERC1155_TOKEN
    const quantity = 1
    const decimals = 2

    const order = await client._makeSellOrder({
      asset: { tokenAddress, tokenId, decimals, schemaName: WyvernSchemaName.ERC1155 },
      quantity,
      accountAddress,
      startAmount: 2,
      extraBountyBasisPoints: 0,
      buyerAddress: NULL_ADDRESS,
      expirationTime: 0,
      paymentTokenAddress: NULL_ADDRESS,
      waitForHighestBid: false,
    })

    assert.equal(order.quantity.toNumber(), quantity * Math.pow(10, decimals))
  })

  test("Correctly errors for invalid sell order price parameters", async () => {
    const accountAddress = TARAS_ADDRESS
    const expirationTime = Math.round(Date.now() / 1000 + 60) // one minute from now
    const paymentTokenAddress = manaAddress
    const tokenId = BIG_BUCK_BUNNY_TOKEN.toString()
    const tokenAddress = TESTERC1155_TOKEN
    const schemaName = WyvernSchemaName.ERC1155

    try {
      await client._makeSellOrder({
        asset: { tokenAddress, tokenId, schemaName },
        quantity: 1,
        accountAddress,
        startAmount: 2,
        extraBountyBasisPoints: 0,
        buyerAddress: NULL_ADDRESS,
        expirationTime: 0,
        paymentTokenAddress,
        waitForHighestBid: true,
      })
      assert.fail()
    } catch (error) {
      assert.include(error.message, 'English auctions must have an expiration time')
    }

    try {
      await client._makeSellOrder({
        asset: { tokenAddress, tokenId, schemaName },
        quantity: 1,
        accountAddress,
        startAmount: 2,
        endAmount: 1, // Allow declining minimum bid
        extraBountyBasisPoints: 0,
        buyerAddress: NULL_ADDRESS,
        expirationTime,
        paymentTokenAddress: NULL_ADDRESS,
        waitForHighestBid: true,
      })
      assert.fail()
    } catch (error) {
      assert.include(error.message, 'English auctions must use wrapped ETH')
    }

    try {
      await client._makeSellOrder({
        asset: { tokenAddress, tokenId, schemaName },
        quantity: 1,
        accountAddress,
        startAmount: 2,
        endAmount: 3,
        extraBountyBasisPoints: 0,
        buyerAddress: NULL_ADDRESS,
        expirationTime,
        paymentTokenAddress: NULL_ADDRESS,
        waitForHighestBid: false,
      })
      assert.fail()
    } catch (error) {
      assert.include(error.message, 'End price must be less than or equal to the start price')
    }

    try {
      await client._makeSellOrder({
        asset: { tokenAddress, tokenId, schemaName },
        quantity: 1,
        accountAddress,
        startAmount: 2,
        endAmount: 1,
        extraBountyBasisPoints: 0,
        buyerAddress: NULL_ADDRESS,
        expirationTime: 0,
        paymentTokenAddress: NULL_ADDRESS,
        waitForHighestBid: false,
      })
      assert.fail()
    } catch (error) {
      assert.include(error.message, 'Expiration time must be set if order will change in price')
    }

    try {
      await client._makeSellOrder({
        asset: { tokenAddress, tokenId, schemaName },
        quantity: 1,
        accountAddress,
        startAmount: 2,
        listingTime: Math.round(Date.now() / 1000 - 60),
        extraBountyBasisPoints: 0,
        buyerAddress: NULL_ADDRESS,
        expirationTime: 0,
        paymentTokenAddress: NULL_ADDRESS,
        waitForHighestBid: false,
      })
      assert.fail()
    } catch (error) {
      assert.include(error.message, 'Listing time cannot be in the past')
    }

    try {
      await client._makeSellOrder({
        asset: { tokenAddress, tokenId, schemaName },
        quantity: 1,
        accountAddress,
        startAmount: 2,
        listingTime: Math.round(Date.now() / 1000 + 20),
        extraBountyBasisPoints: 0,
        buyerAddress: NULL_ADDRESS,
        expirationTime,
        paymentTokenAddress,
        waitForHighestBid: true,
      })
      assert.fail()
    } catch (error) {
      assert.include(error.message, 'Cannot schedule an English auction for the future')
    }

    try {
      await client._makeSellOrder({
        asset: { tokenAddress, tokenId, schemaName },
        quantity: 1,
        accountAddress,
        startAmount: 2,
        extraBountyBasisPoints: 0,
        buyerAddress: NULL_ADDRESS,
        expirationTime,
        paymentTokenAddress,
        waitForHighestBid: false,
        englishAuctionReservePrice: 1
      })
      assert.fail()
    } catch (error) {
      assert.include(error.message, 'Reserve prices may only be set on English auctions')
    }

    try {
      await client._makeSellOrder({
        asset: { tokenAddress, tokenId, schemaName },
        quantity: 1,
        accountAddress,
        startAmount: 2,
        extraBountyBasisPoints: 0,
        buyerAddress: NULL_ADDRESS,
        expirationTime,
        paymentTokenAddress,
        waitForHighestBid: true,
        englishAuctionReservePrice: 1
      })
      assert.fail()
    } catch (error) {
      assert.include(error.message, 'Reserve price must be greater than or equal to the start amount')
    }
  })

  test("Correctly errors for invalid buy order price parameters", async () => {
    const accountAddress = TARAS_ADDRESS_2
    const expirationTime = Math.round(Date.now() / 1000 + 60) // one minute from now
    const tokenId = BIG_BUCK_BUNNY_TOKEN.toString()
    const tokenAddress = TESTERC1155_TOKEN
    const schemaName = WyvernSchemaName.ERC1155

    try {
      await client._makeBuyOrder({
        asset: { tokenAddress, tokenId, schemaName },
        quantity: 1,
        accountAddress,
        startAmount: 2,
        extraBountyBasisPoints: 0,
        expirationTime,
        paymentTokenAddress: NULL_ADDRESS
      })
      assert.fail()
    } catch (error) {
      assert.include(error.message, 'Offers must use wrapped ETH or an ERC-20 token')
    }
  }) 

  test('Cannot yet match a new English auction sell order, bountied', async () => {
    const accountAddress = TARAS_ADDRESS
    const takerAddress = TARAS_ADDRESS_2
    const amountInToken = 1.2
    const paymentTokenAddress = WETH_TOKEN_ADDRESS
    const expirationTime = Math.round(Date.now() / 1000 + 60) // one minute from now
    const bountyPercent = 1.1
    const schemaName = WyvernSchemaName.ERC1155

    const tokenId = BIG_BUCK_BUNNY_TOKEN.toString()
    const tokenAddress = TESTERC1155_TOKEN

    const order = await client._makeSellOrder({
      asset: { tokenAddress, tokenId, schemaName },
      quantity: 1,
      accountAddress,
      startAmount: amountInToken,
      paymentTokenAddress,
      extraBountyBasisPoints: bountyPercent * 100,
      buyerAddress: NULL_ADDRESS,
      expirationTime,
      waitForHighestBid: true,
    })

    assert.equal(order.taker, NULL_ADDRESS)
    assert.equal(order.basePrice.toNumber(), Math.pow(10, 18) * amountInToken)
    assert.equal(order.extra.toNumber(), 0)
    // Make sure there's gap time to expire it
    assert.isAbove(order.expirationTime.toNumber(), expirationTime)
    // Make sure it's listed in the future
    assert.equal(order.listingTime.toNumber(), expirationTime)

    await client._sellOrderValidationAndApprovals({ order, accountAddress })

    // Make sure match is impossible
    try {
      await testMatchingNewOrder(order, takerAddress, expirationTime + 100)
      assert.fail()
    } catch (error) {
      assert.include(error.message, "Buy-side order is set in the future or expired")
    }
  })

  test('Ensures buy order compatibility with an English sell order', async () => {
    const accountAddress = TARAS_ADDRESS_2
    const takerAddress = TARAS_ADDRESS
    const paymentTokenAddress = WETH_TOKEN_ADDRESS
    const amountInToken = 0.01
    const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24) // one day from now
    const extraBountyBasisPoints = 1.1 * 100

    const tokenId = BIG_BUCK_BUNNY_TOKEN.toString()
    const tokenAddress = TESTERC1155_TOKEN

    const asset = await client.api.getAsset({ tokenAddress, tokenId })

    const sellOrder = await client._makeSellOrder({
      asset: { tokenAddress, tokenId, schemaName: WyvernSchemaName.ERC1155 },
      quantity: 1,
      accountAddress: takerAddress,
      startAmount: amountInToken,
      paymentTokenAddress,
      expirationTime,
      extraBountyBasisPoints,
      buyerAddress: NULL_ADDRESS,
      waitForHighestBid: true,
    })

    const buyOrder = await client._makeBuyOrder({
      asset: { tokenAddress, tokenId, schemaName: WyvernSchemaName.ERC1155 },
      quantity: 1,
      accountAddress,
      paymentTokenAddress,
      startAmount: amountInToken,
      expirationTime: 0,
      extraBountyBasisPoints: 0,
      sellOrder,
    })

    testFeesMakerOrder(buyOrder, asset.collection)
    assert.equal(sellOrder.taker, NULL_ADDRESS)
    assert.equal(buyOrder.taker, sellOrder.maker)
    assert.equal(buyOrder.makerRelayerFee.toNumber(), sellOrder.makerRelayerFee.toNumber())
    assert.equal(buyOrder.takerRelayerFee.toNumber(), sellOrder.takerRelayerFee.toNumber())
    assert.equal(buyOrder.makerProtocolFee.toNumber(), sellOrder.makerProtocolFee.toNumber())
    assert.equal(buyOrder.takerProtocolFee.toNumber(), sellOrder.takerProtocolFee.toNumber())

    await client._buyOrderValidationAndApprovals({ order: buyOrder, accountAddress })
    await client._sellOrderValidationAndApprovals({ order: sellOrder, accountAddress: takerAddress })
  })

  test("Matches a private sell order, doesn't for wrong taker", async () => {
    const accountAddress = TARAS_ADDRESS
    const takerAddress = TARAS_ADDRESS_2
    const amountInToken = 2
    const bountyPercent = 0

    const tokenId = BIG_BUCK_BUNNY_TOKEN.toString()
    const tokenAddress = TESTERC1155_TOKEN

    const asset = await client.api.getAsset({ tokenAddress, tokenId })

    const order = await client._makeSellOrder({
      asset: { tokenAddress, tokenId, schemaName: WyvernSchemaName.ERC1155 },
      quantity: 1,
      accountAddress,
      startAmount: amountInToken,
      extraBountyBasisPoints: bountyPercent * 100,
      buyerAddress: takerAddress,
      expirationTime: 0,
      paymentTokenAddress: NULL_ADDRESS,
      waitForHighestBid: false,
    })

    assert.equal(order.paymentToken, NULL_ADDRESS)
    assert.equal(order.basePrice.toNumber(), Math.pow(10, 18) * amountInToken)
    assert.equal(order.extra.toNumber(), 0)
    assert.equal(order.expirationTime.toNumber(), 0)
    testFeesMakerOrder(order, asset.collection, bountyPercent * 100)

    await client._sellOrderValidationAndApprovals({ order, accountAddress })
    // Make sure match is valid
    await testMatchingNewOrder(order, takerAddress)
    // Make sure no one else can take it
    try {
      await testMatchingNewOrder(order, DEVIN_ADDRESS)
    } catch (e) {
      // It works!
      return
    }
    assert.fail()
  })

  test('Matches a new dutch sell order of a small amount of ERC-20 item (DAI) for ETH', async () => {
    const accountAddress = TARAS_ADDRESS
    const takerAddress = TARAS_ADDRESS_2
    const amountInEth = 0.012

    const tokenId = null
    const tokenAddress = daiAddress
    const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24)

    const order = await client._makeSellOrder({
      asset: { tokenAddress, tokenId, schemaName: WyvernSchemaName.ERC20 },
      quantity: Math.pow(10, 18) * 0.01,
      accountAddress,
      startAmount: amountInEth,
      endAmount: 0,
      paymentTokenAddress: NULL_ADDRESS,
      extraBountyBasisPoints: 0,
      buyerAddress: NULL_ADDRESS,
      expirationTime, // one day from now,
      waitForHighestBid: false,
    })

    assert.equal(order.basePrice.toNumber(), Math.pow(10, 18) * amountInEth)
    assert.equal(order.extra.toNumber(), Math.pow(10, 18) * amountInEth)
    assert.equal(order.expirationTime.toNumber(), expirationTime)

    await client._sellOrderValidationAndApprovals({ order, accountAddress })
    // Make sure match is valid
    await testMatchingNewOrder(order, takerAddress)
  })

  test('Matches a new sell order of an 1155 item for ETH', async () => {
    const accountAddress = TARAS_ADDRESS
    const takerAddress = TARAS_ADDRESS_2
    const amountInEth = 2

    const tokenId = BIG_BUCK_BUNNY_TOKEN.toString()
    const tokenAddress = TESTERC1155_TOKEN

    const asset = await client.api.getAsset({ tokenAddress, tokenId })

    const order = await client._makeSellOrder({
      asset: { tokenAddress, tokenId, schemaName: WyvernSchemaName.ERC1155 },
      quantity: 1,
      accountAddress,
      startAmount: amountInEth,
      paymentTokenAddress: NULL_ADDRESS,
      extraBountyBasisPoints: 0,
      buyerAddress: NULL_ADDRESS,
      expirationTime: 0,
      waitForHighestBid: false,
    })

    assert.equal(order.basePrice.toNumber(), Math.pow(10, 18) * amountInEth)
    assert.equal(order.extra.toNumber(), 0)
    assert.equal(order.expirationTime.toNumber(), 0)
    testFeesMakerOrder(order, asset.collection)

    await client._sellOrderValidationAndApprovals({ order, accountAddress })
    // Make sure match is valid
    await testMatchingNewOrder(order, takerAddress)
  })

  test('Matches a buy order of an 1155 item for W-ETH', async () => {
    const accountAddress = TARAS_ADDRESS_2
    const takerAddress = TARAS_ADDRESS
    const paymentToken = WETH_TOKEN_ADDRESS
    const amountInToken = 0.01

    const tokenId = BIG_BUCK_BUNNY_TOKEN.toString()
    const tokenAddress = TESTERC1155_TOKEN

    const asset = await client.api.getAsset({ tokenAddress, tokenId })

    const order = await client._makeBuyOrder({
      asset: { tokenAddress, tokenId, schemaName: WyvernSchemaName.ERC1155 },
      quantity: 1,
      accountAddress,
      startAmount: amountInToken,
      paymentTokenAddress: paymentToken,
      expirationTime: 0,
      extraBountyBasisPoints: 0,
    })

    assert.equal(order.taker, NULL_ADDRESS)
    assert.equal(order.paymentToken, paymentToken)
    assert.equal(order.basePrice.toNumber(), Math.pow(10, 18) * amountInToken)
    assert.equal(order.extra.toNumber(), 0)
    assert.equal(order.expirationTime.toNumber(), 0)
    testFeesMakerOrder(order, asset.collection)

    await client._buyOrderValidationAndApprovals({ order, accountAddress })
    // Make sure match is valid
    await testMatchingNewOrder(order, takerAddress)
  })

  test('Matches a new bountied sell order for an ERC-20 token (MANA)', async () => {
    const accountAddress = TARAS_ADDRESS
    const takerAddress = TARAS_ADDRESS_2
    const paymentToken = (await client.api.getPaymentTokens({ symbol: 'MANA'})).tokens[0]
    const amountInToken = 5000
    const bountyPercent = 1

    const tokenId = BIG_BUCK_BUNNY_TOKEN.toString()
    const tokenAddress = TESTERC1155_TOKEN

    const asset = await client.api.getAsset({ tokenAddress, tokenId })

    const order = await client._makeSellOrder({
      asset: { tokenAddress, tokenId, schemaName: WyvernSchemaName.ERC1155 },
      quantity: 1,
      accountAddress,
      startAmount: amountInToken,
      paymentTokenAddress: paymentToken.address,
      extraBountyBasisPoints: bountyPercent * 100,
      buyerAddress: NULL_ADDRESS, // Check that null doesn't trigger private orders
      expirationTime: 0,
      waitForHighestBid: false,
    })

    assert.equal(order.paymentToken, paymentToken.address)
    assert.equal(order.basePrice.toNumber(), Math.pow(10, paymentToken.decimals) * amountInToken)
    assert.equal(order.extra.toNumber(), 0)
    assert.equal(order.expirationTime.toNumber(), 0)
    testFeesMakerOrder(order, asset.collection, bountyPercent * 100)

    await client._sellOrderValidationAndApprovals({ order, accountAddress })
    // Make sure match is valid
    await testMatchingNewOrder(order, takerAddress)
  })

  test('Matches a buy order with an ERC-20 token (DAI)', async () => {
    const accountAddress = TARAS_ADDRESS
    const takerAddress = TARAS_ADDRESS_2
    const paymentToken = (await client.api.getPaymentTokens({ symbol: 'DAI'})).tokens[0]
    const amountInToken = 3

    const tokenId = RUNNING_HORSE_TOKEN.toString()
    const tokenAddress = TESTERC1155_TOKEN

    const asset = await client.api.getAsset({ tokenAddress, tokenId })

    const order = await client._makeBuyOrder({
      asset: { tokenAddress, tokenId, schemaName: WyvernSchemaName.ERC1155 },
      quantity: 1,
      accountAddress,
      startAmount: amountInToken,
      paymentTokenAddress: paymentToken.address,
      expirationTime: 0,
      extraBountyBasisPoints: 0,
    })

    assert.equal(order.taker, NULL_ADDRESS)
    assert.equal(order.paymentToken, paymentToken.address)
    assert.equal(order.basePrice.toNumber(), Math.pow(10, paymentToken.decimals) * amountInToken)
    assert.equal(order.extra.toNumber(), 0)
    assert.equal(order.expirationTime.toNumber(), 0)
    testFeesMakerOrder(order, asset.collection)

    await client._buyOrderValidationAndApprovals({ order, accountAddress })
    // Make sure match is valid
    await testMatchingNewOrder(order, takerAddress)
  })
})


export async function testMatchingOrder(order: Order, accountAddress: string, testAtomicMatch = false, referrerAddress?: string) {
  // Test a separate recipient for sell orders
  const recipientAddress = order.side === OrderSide.Sell ?  TARAS_ADDRESS_2 : accountAddress
  const matchingOrder = client._makeMatchingOrder({
    order,
    accountAddress,
    recipientAddress
  })
  assert.equal(matchingOrder.hash, getOrderHash(matchingOrder))

  const { buy, sell } = assignOrdersToSides(order, matchingOrder)

  if (!order.waitingForBestCounterOrder) {
    const isValid = await client._validateMatch({ buy, sell, accountAddress })
    assert.isTrue(isValid)
  } else {
    console.info(`English Auction detected, skipping validation`)
  }

  if (testAtomicMatch && !order.waitingForBestCounterOrder) {
    const isValid = await client._validateOrder(order)
    assert.isTrue(isValid)
    const isFulfillable = await client.isOrderFulfillable({
      order,
      accountAddress,
      recipientAddress,
      referrerAddress
    })
    assert.isTrue(isFulfillable)
    const gasPrice = await client._computeGasPrice()
    console.info(`Gas price to use: ${client.web3.fromWei(gasPrice.toString(), 'gwei')} gwei`)
  }
}

export async function testMatchingNewOrder(unhashedOrder: UnhashedOrder, accountAddress: string, counterOrderListingTime?: number) {
  const order = {
    ...unhashedOrder,
    hash: getOrderHash(unhashedOrder)
  }

  const matchingOrder = client._makeMatchingOrder({
    order,
    accountAddress,
    recipientAddress: accountAddress
  })
  if (counterOrderListingTime != null) {
    matchingOrder.listingTime = makeBigNumber(counterOrderListingTime)
    matchingOrder.hash = getOrderHash(matchingOrder)
  }
  assert.equal(matchingOrder.hash, getOrderHash(matchingOrder))

  // Test fees
  assert.equal(matchingOrder.makerProtocolFee.toNumber(), 0)
  assert.equal(matchingOrder.takerProtocolFee.toNumber(), 0)
  if (order.waitingForBestCounterOrder) {
    assert.equal(matchingOrder.feeRecipient, OPENSEA_FEE_RECIPIENT)
  } else {
    assert.equal(matchingOrder.feeRecipient, NULL_ADDRESS)
  }
  assert.equal(matchingOrder.makerRelayerFee.toNumber(), order.makerRelayerFee.toNumber())
  assert.equal(matchingOrder.takerRelayerFee.toNumber(), order.takerRelayerFee.toNumber())
  assert.equal(matchingOrder.makerReferrerFee.toNumber(), order.makerReferrerFee.toNumber())

  const v = 27
  const r = ''
  const s = ''

  let buy: Order
  let sell: Order
  if (order.side == OrderSide.Buy) {
    buy = {
      ...order,
      v, r, s
    }
    sell = {
      ...matchingOrder,
      v, r, s
    }
  } else {
    sell = {
      ...order,
      v, r, s
    }
    buy = {
      ...matchingOrder,
      v, r, s
    }
  }

  const isValid = await client._validateMatch({ buy, sell, accountAddress })
  assert.isTrue(isValid)

  // Make sure assets are transferrable
  await Promise.all(getAssetsAndQuantities(order).map(async ({asset, quantity}) => {
    const fromAddress = sell.maker
    const toAddress =  buy.maker
    const useProxy = asset.tokenAddress === CK_ADDRESS || asset.schemaName === WyvernSchemaName.ERC20
    const isTransferrable = await client.isAssetTransferrable({
      asset,
      quantity,
      fromAddress,
      toAddress,
      useProxy,
    })
    assert.isTrue(isTransferrable, `Not transferrable: ${asset.tokenAddress} # ${asset.tokenId} schema ${asset.schemaName} quantity ${quantity} from ${fromAddress} to ${toAddress} using proxy: ${useProxy}`)
  }))
}

function getAssetsAndQuantities(
  order: Order | UnsignedOrder | UnhashedOrder
): Array<{ asset: Asset, quantity: BigNumber }> {

const wyAssets = 'bundle' in order.metadata
  ? order.metadata.bundle.assets
  : order.metadata.asset
    ? [ order.metadata.asset ]
    : []
const schemaNames = 'bundle' in order.metadata && 'schemas' in order.metadata.bundle
  ? order.metadata.bundle.schemas
  : 'schema' in order.metadata
    ? [order.metadata.schema]
    : []

assert.isNotEmpty(wyAssets)
assert.equal(wyAssets.length, schemaNames.length)

return wyAssets.map((wyAsset, i) => {
  const asset: Asset = {
    tokenId: 'id' in wyAsset && wyAsset.id != null ? wyAsset.id : null,
    tokenAddress: wyAsset.address,
    schemaName: schemaNames[i]
  }
  if ('quantity' in wyAsset) {
    return { asset, quantity: new BigNumber(wyAsset.quantity) }
  } else {
    return { asset, quantity: new BigNumber(1) }
  }
})
}