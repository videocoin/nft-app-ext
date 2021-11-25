import { EventType, OpenSeaPort } from 'opensea-js';
import { Asset } from 'types/asset';
import { isNaN } from 'lodash';

import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { OrderSide } from 'opensea-js/lib/types';

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
const INVERSE_BASIS_POINT = 10000;
const SECONDS_IN_24_HOURS = 60 * 60 * 24;
const AUCTION_EXPIRATION_TIME = SECONDS_IN_24_HOURS * 2;

export function makeSaleOrder(
  openSeaPort: OpenSeaPort,
  {
    account,
    asset,
    instantSalePrice,
    putOnSalePrice,
    tokenAddress,
  }: {
    account: string;
    asset: Asset;
    instantSalePrice?: number;
    putOnSalePrice?: number;
    tokenAddress?: string;
  }
) {
  if (isNaN(instantSalePrice) && (isNaN(putOnSalePrice) || !tokenAddress)) {
    throw Error('Invalid order');
  }
  if (putOnSalePrice) {
    const item = { ...asset, putOnSalePrice };
    makePutOnSaleOrder(openSeaPort, { account, item, tokenAddress });
  }
  if (instantSalePrice) {
    const item = { ...asset, instantSalePrice };
    makeInstantSaleOrder(openSeaPort, { account, item });
  }
}

export function makeInstantSaleOrder(
  openSeaPort: OpenSeaPort,
  { account, item }: any
) {
  const asset = {
    tokenAddress: item.assetContract.address,
    tokenId: item.tokenId,
    schemaName: item.assetContract.schemaName,
  };
  const price = Number(item.instantSalePrice);
  subscribeSeaportEvents(openSeaPort);
  return openSeaPort.createSellOrder({
    asset,
    accountAddress: account,
    startAmount: price,
    endAmount: price,
    expirationTime: 0,
  });
}

export async function fulfillInstantSaleOrder(
  openSeaPort: OpenSeaPort,
  { account, item }: any
) {
  const order = await openSeaPort.api.getOrder({
    asset_contract_address: item.assetContract.address,
    token_id: item.tokenId,
  });
  subscribeSeaportEvents(openSeaPort);
  return openSeaPort.fulfillOrder({
    order,
    accountAddress: account,
  });
}

export async function makePutOnSaleOrder(
  openSeaPort: OpenSeaPort,
  { account, item, tokenAddress }: any
) {
  const asset = {
    tokenAddress: item.assetContract.address,
    tokenId: item.tokenId,
    schemaName: item.assetContract.schemaName,
  };
  const price = Number(item.putOnSalePrice);
  const expirationTime =
    Math.round(Date.now() / 1000) + AUCTION_EXPIRATION_TIME;
  subscribeSeaportEvents(openSeaPort);
  return openSeaPort.createSellOrder({
    asset,
    accountAddress: account,
    startAmount: price,
    paymentTokenAddress: tokenAddress,
    expirationTime,
    waitForHighestBid: true,
  });
}

export async function makeBidOrder(
  openSeaPort: OpenSeaPort,
  { account, item, tokenAddress, bidPrice }: any
) {
  const asset = {
    tokenAddress: item.assetContract.address,
    tokenId: item.tokenId,
    schemaName: item.assetContract.schemaName,
  };
  const sellOrder = await openSeaPort.api.getOrder({
    asset_contract_address: item.assetContract.address,
    token_id: item.tokenId,
    side: OrderSide.Sell,
  });
  const expirationTime = sellOrder.expirationTime.toNumber();
  subscribeSeaportEvents(openSeaPort);
  return openSeaPort.createBuyOrder({
    asset,
    accountAddress: account,
    startAmount: bidPrice,
    paymentTokenAddress: tokenAddress,
    sellOrder,
    expirationTime,
  });
}

export async function acceptBidOrder(
  openSeaPort: OpenSeaPort,
  { account, order }: any
) {
  subscribeSeaportEvents(openSeaPort);
  return openSeaPort.fulfillOrder({
    order: order,
    accountAddress: account,
  });
}

export async function computeBuyersFee(
  openSeaPort: OpenSeaPort,
  { account, item }: any
): Promise<BigNumberish> {
  const order = await openSeaPort.api.getOrder({
    asset_contract_address: item.assetContract.address,
    token_id: item.tokenId,
  });
  const matchingOrder = await openSeaPort._makeMatchingOrder({
    order,
    accountAddress: account,
    recipientAddress: account,
  });

  const price = await openSeaPort.getCurrentPrice(order);
  if (order.feeRecipient && order.feeRecipient !== NULL_ADDRESS) {
    if (order.feeMethod === 1) {
      const relayerFee = matchingOrder.takerRelayerFee
        .mul(price)
        .div(INVERSE_BASIS_POINT);
      const protocolFee = matchingOrder.takerProtocolFee
        .mul(price)
        .div(INVERSE_BASIS_POINT);
      const feeTotal = relayerFee.add(protocolFee);
      return BigNumber.from(feeTotal.toString());
    } else {
      throw new Error('unexpected fee method');
    }
  }
  return '0';
}

function subscribeSeaportEvents(openSeaPort: OpenSeaPort) {
  openSeaPort.addListener(
    EventType.TransactionCreated,
    ({ transactionHash, event }) => {
      console.info('transaction created', { transactionHash, event });
    }
  );
  openSeaPort.addListener(
    EventType.TransactionConfirmed,
    ({ transactionHash, event }) => {
      console.info('transaction confirmed', { transactionHash, event });
      // Only reset your exchange UI if we're finishing an order fulfillment or cancellation
      if (event === EventType.MatchOrders || event === EventType.CancelOrder) {
        openSeaPort.removeAllListeners();
      }
    }
  );
  openSeaPort.addListener(
    EventType.TransactionDenied,
    ({ transactionHash, event }) => {
      console.info('transaction denied', { transactionHash, event });
    }
  );
  openSeaPort.addListener(
    EventType.TransactionFailed,
    ({ transactionHash, event }) => {
      console.info('transaction failed', { transactionHash, event });
    }
  );
  openSeaPort.addListener(EventType.InitializeAccount, ({ accountAddress }) => {
    console.info('initialize account', { accountAddress });
  });
  openSeaPort.addListener(EventType.InitializeAccount, ({ accountAddress }) => {
    console.info({ type: 'InitializeAccount', accountAddress });
  });
  openSeaPort.addListener(
    EventType.ApproveCurrency,
    ({ accountAddress, contractAddress }) => {
      console.info('approve currency', { accountAddress, contractAddress });
    }
  );
  openSeaPort.addListener(
    EventType.ApproveAllAssets,
    ({ accountAddress, proxyAddress, contractAddress }) => {
      console.info('approve all assets', {
        accountAddress,
        proxyAddress,
        contractAddress,
      });
    }
  );
  openSeaPort.addListener(
    EventType.ApproveAsset,
    ({ accountAddress, proxyAddress, contractAddress, asset }) => {
      console.info('approve asset', {
        accountAddress,
        proxyAddress,
        contractAddress,
        asset,
      });
    }
  );
  openSeaPort.addListener(
    EventType.CreateOrder,
    ({ order, accountAddress }) => {
      console.log('create order', { order, accountAddress });
    }
  );
  openSeaPort.addListener(
    EventType.OrderDenied,
    ({ order, accountAddress }) => {
      console.log('order denied', { order, accountAddress });
    }
  );
  openSeaPort.addListener(
    EventType.MatchOrders,
    ({ buy, sell, accountAddress }) => {
      console.info('match orders', { buy, sell, accountAddress });
    }
  );
  openSeaPort.addListener(
    EventType.CancelOrder,
    ({ order, accountAddress }) => {
      console.info('cancel order', { order, accountAddress });
    }
  );
}
