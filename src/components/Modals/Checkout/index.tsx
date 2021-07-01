import React, { useEffect, useRef, useState } from 'react';
import * as S from './styles';
import { useStore } from 'store';
import { Asset } from 'types/asset';
import { toFixedNoRound } from 'lib/utils';
import { formatToken } from 'lib/units';
import Modal from 'components/UI/Modal';
import Button from 'components/UI/Button';
import View from 'components/UI/View';
import { computeBuyersFee, fulfillInstantSaleOrder } from 'lib/opensea';
import { EventType } from 'opensea-js';
import AssetDescription from 'components/Modals/Checkout/AssetDescription';
import StatusBlock, { Status } from './StatusBlock';
import { useUnmount } from 'react-use';
import assetsApi from 'api/assets';
import Success from 'components/Modals/Checkout/Success';
import { useQueryClient } from 'react-query';

const Checkout = () => {
  const { ethBalance, account, openSea } = useStore('metamaskStore');
  const queryClient = useQueryClient();
  const { modals, closeModal } = useStore('modalsStore');
  const onClose = () => closeModal('checkout');
  const asset = useRef<Asset>(modals.get('checkout')?.asset as Asset);
  const { owner, id } = asset.current;
  const formattedVidBalance = toFixedNoRound(formatToken(ethBalance), 2);
  const [status, setStatus] = useState(Status.init);
  const [transaction, setTransaction] = useState('');
  const [fee, setFee] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const fetchAsset = async (id: number) => {
    const res = await assetsApi.fetchAsset(id);
    if (res.status === 'TRANSFERRED') {
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

  const onCheckout = async () => {
    if (!openSea) return;
    setStatus(Status.start);

    openSea.addListener(EventType.MatchOrders, () => {
      setStatus(Status.matchOrders);
    });
    openSea.addListener(EventType.TransactionCreated, () => {
      setStatus(Status.transactionCreated);
    });
    openSea.addListener(
      EventType.TransactionConfirmed,
      ({ transactionHash }) => {
        setStatus(Status.transactionConfirmed);
        if (transactionHash) {
          setTransaction(transactionHash);
        }
        poll(id);
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
    try {
      await fulfillInstantSaleOrder(openSea, {
        account,
        item: asset.current,
      });
    } catch {
      setStatus(Status.error);
    }
  };
  useUnmount(() => {
    if (openSea) {
      openSea.removeAllListeners();
    }
  });
  useEffect(() => {
    if (openSea && fee === '') {
      computeBuyersFee(openSea, { account, item: asset.current })
        .then((buyersFee) => {
          setFee(toFixedNoRound(formatToken(buyersFee), 4));
        })
        .catch((err) => {
          console.error(err);
          setStatus(Status.error);
        });
    }
  }, [fee, openSea, account]);
  useEffect(() => {
    if (fee !== '' && asset) {
      const total =
        parseFloat(asset.current.instantSalePrice) + parseFloat(fee);
      setTotalPrice(total.toPrecision());
    }
  }, [fee, asset]);
  const isProcessing = Boolean(status);
  const isSuccess = Boolean(status === Status.complete);
  return (
    <Modal>
      {isProcessing ? (
        isSuccess ? (
          <Success asset={asset.current} transaction={transaction} />
        ) : (
          <StatusBlock status={status} />
        )
      ) : (
        <AssetDescription
          asset={asset.current}
          balance={formattedVidBalance}
          fee={fee}
          total={totalPrice}
        />
      )}
      {isProcessing && !isSuccess && <S.ProgressBar status={status} />}
      {!status && (
        <View marginT={30} column>
          <Button onClick={onCheckout}>
            {!owner.isVerified ? 'I understand, continue' : 'Continue'}
          </Button>
        </View>
      )}
      <View marginT={10} column>
        {(isSuccess || status === Status.init || status === Status.error) && (
          <Button onClick={onClose} theme="secondary">
            {isSuccess || status === Status.error ? 'Close' : 'Cancel'}
          </Button>
        )}
      </View>
    </Modal>
  );
};

export default Checkout;
