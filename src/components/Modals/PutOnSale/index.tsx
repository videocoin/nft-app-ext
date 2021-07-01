import React, { useRef, useState } from 'react';
import Modal from 'components/UI/Modal';
import View from 'components/UI/View';
import Button from 'components/UI/Button';
import { useStore } from 'store';
import { Asset } from 'types/asset';
import { useUnmount } from 'react-use';
import AssetDescription from './AssetDescription';
import { EventType } from 'opensea-js';
import { toFixedNoRound } from 'lib/utils';
import { formatToken } from 'lib/units';
import { makeInstantSaleOrder } from 'lib/opensea';
import StatusBlock, { Status } from './StatusBlock';
import assetsApi from 'api/assets';
import { useQueryClient } from 'react-query';

const PutOnSale = () => {
  const { ethBalance, account, openSea } = useStore('metamaskStore');
  const { modals, closeModal } = useStore('modalsStore');
  const [newSalePrice, setNewSalePrice] = useState('0');
  const [status, setStatus] = useState(Status.init);
  const onClose = () => closeModal('putOnSale');
  const asset = useRef<Asset>(modals.get('putOnSale')?.asset as Asset);
  const formattedVidBalance = toFixedNoRound(formatToken(ethBalance), 2);
  const queryClient = useQueryClient();
  const fetchAsset = async (id: number) => {
    const res = await assetsApi.fetchAsset(id);
    if (res.status === 'READY') {
      setStatus(Status.complete);
      queryClient.invalidateQueries('assets');
    } else {
      poll(id);
    }
    return res;
  };
  const poll = (id: number) => {
    setTimeout(() => fetchAsset(id), 1000);
  };
  const onPutOnSale = async () => {
    if (!openSea) return;
    setStatus(Status.start);

    openSea.addListener(EventType.ApproveAllAssets, () => {
      setStatus(Status.approveAllAssets);
    });

    openSea.addListener(EventType.ApproveAsset, () => {
      setStatus(Status.approveAsset);
    });

    openSea.addListener(EventType.ApproveCurrency, () => {
      setStatus(Status.approveCurrency);
    });

    openSea.addListener(EventType.CreateOrder, () => {
      setStatus(Status.createOrder);
    });

    openSea.addListener(EventType.OrderDenied, () => {
      setStatus(Status.error);
    });

    openSea.addListener(EventType.ApproveOrder, () => {
      setStatus(Status.approveOrder);
    });

    openSea.addListener(EventType.TransactionCreated, () => {
      setStatus(Status.transactionCreated);
    });
    openSea.addListener(
      EventType.TransactionConfirmed,
      ({ transactionHash }) => {
        setStatus(Status.transactionConfirmed);
      }
    );
    openSea.addListener(
      EventType.TransactionDenied,
      ({ transactionHash, event }) => {
        setStatus(Status.error);
      }
    );
    openSea.addListener(EventType.TransactionFailed, () => {
      setStatus(Status.error);
    });

    asset.current.instantSalePrice = newSalePrice;
    try {
      await makeInstantSaleOrder(openSea, {
        account,
        item: asset.current,
      });
      poll(asset.current.id);
    } catch {
      setStatus(Status.error);
    }
  };
  useUnmount(() => {
    if (openSea) {
      openSea.removeAllListeners();
    }
  });
  const isProcessing = Boolean(status);
  const isSuccess = Boolean(status === Status.complete);
  return (
    <Modal onClose={onClose}>
      {isProcessing ? (
        <StatusBlock status={status} />
      ) : (
        <>
          <AssetDescription
            asset={asset.current}
            balance={formattedVidBalance}
            price={newSalePrice}
            setPrice={setNewSalePrice}
          />
          <View marginT={30} column>
            <Button onClick={onPutOnSale}>Put on sale</Button>
          </View>
        </>
      )}
      <View marginT={10} column>
        <Button onClick={onClose} theme="secondary">
          {isSuccess ? 'Close' : 'Cancel'}
        </Button>
      </View>
    </Modal>
  );
};

export default PutOnSale;
