import assetsApi from 'api/assets';
import Button from 'components/UI/Button';
import { acceptBidOrder, computeBuyersFee } from 'lib/opensea';
import { formatToken } from 'lib/units';
import { toFixedNoRound } from 'lib/utils';
import { observer } from 'mobx-react-lite';
import { EventType } from 'opensea-js';
import { Order } from 'opensea-js/lib/types';
import { makeBigNumber } from 'opensea-js/lib/utils/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useUnmount } from 'react-use';
import { useStore } from 'store';
import { Asset } from 'types/asset';

import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  VStack,
} from '@chakra-ui/react';

import BidDescription from './BidDescription';
import StatusBlock, { Status } from './StatusBlock';
import * as S from './styles';
import Success from './Success';

const AcceptBid = () => {
  const { account, openSea, paymentTokens } = useStore('metamaskStore');
  const queryClient = useQueryClient();
  const { modals, closeModal } = useStore('modalsStore');
  const onClose = () => closeModal('acceptBid');
  const asset = useRef<Asset>(modals.get('acceptBid')?.asset as Asset).current;
  const order = useRef<Order>(modals.get('acceptBid')?.order as Order).current;
  const { id, auction } = asset;
  const token = paymentTokens.find(
    (value) => value.address == auction.paymentTokenAddress
  );
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

  const onAccept = async () => {
    if (!openSea || !order) return;
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
    openSea.addListener(EventType.TransactionDenied, () => {
      setStatus(Status.error);
    });
    openSea.addListener(EventType.TransactionFailed, () => {
      setStatus(Status.error);
    });
    try {
      await acceptBidOrder(openSea, {
        account,
        order,
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
      computeBuyersFee(openSea, { account, item: asset })
        .then((serviceFee) => {
          setFee(toFixedNoRound(formatToken(serviceFee), 4));
        })
        .catch((err) => {
          console.error(err);
          setStatus(Status.error);
        });
    }
  }, [fee, openSea, account]);
  useEffect(() => {
    if (fee !== '' && asset) {
      const total = makeBigNumber(auction.currentBid).sub(parseFloat(fee));
      setTotalPrice(total.toString());
    }
  }, [fee, asset]);
  const isProcessing = Boolean(status);
  const isSuccess = Boolean(status === Status.complete);
  return (
    <ModalContent>
      <ModalCloseButton />
      {!isProcessing && <ModalHeader>Accept bid</ModalHeader>}
      <ModalBody>
        {isProcessing ? (
          isSuccess ? (
            <Success asset={asset} transaction={transaction} />
          ) : (
            <StatusBlock status={status} />
          )
        ) : (
          <BidDescription
            asset={asset}
            fee={fee}
            total={totalPrice}
            order={order}
            token={token}
          />
        )}
        {isProcessing && !isSuccess && <S.ProgressBar status={status} />}
      </ModalBody>
      <ModalFooter>
        <VStack align="stretch" flex={1}>
          {!status && <Button onClick={onAccept}>Accept bid</Button>}
          {(isSuccess || status === Status.init || status === Status.error) && (
            <Button onClick={onClose} theme="secondary">
              {isSuccess || status === Status.error ? 'Close' : 'Cancel'}
            </Button>
          )}
        </VStack>
      </ModalFooter>
    </ModalContent>
  );
};

export default observer(AcceptBid);
