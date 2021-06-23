import { OpenSeaPort, EventType } from 'opensea-js';

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
