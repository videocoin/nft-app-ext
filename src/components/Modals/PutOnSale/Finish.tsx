import assetsApi from 'api/assets';
import StatusBlock, { Status } from 'components/Modals/PutOnSale/StatusBlock';
import { observer } from 'mobx-react-lite';
import { makeSaleOrder } from 'lib/opensea';
import { EventType } from 'opensea-js';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useUnmount } from 'react-use';
import { useStore } from 'store';
import { Asset } from 'types/asset';

import {
  Box,
  Center,
  Flex,
  ModalBody,
  ModalHeader,
  Text,
  Button,
} from '@chakra-ui/react';

import Success from './Success';
import * as S from './styles';

const Finish = ({ asset }: { asset: Asset }) => {
  const { getValues } = useFormContext();
  const { account, openSea } = useStore('metamaskStore');
  const { closeModal } = useStore('modalsStore');
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(Status.init);
  const onClose = () => closeModal('putOnSale');
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
  const { instantSalePrice, putOnSalePrice, tokenAddress } = getValues();
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

    openSea.addListener(EventType.TransactionDenied, () => {
      setStatus(Status.error);
    });

    openSea.addListener(EventType.TransactionFailed, () => {
      setStatus(Status.error);
    });

    try {
      await makeSaleOrder(openSea, {
        account,
        asset,
        instantSalePrice,
        putOnSalePrice,
        tokenAddress,
      });
      poll(asset.id);
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
    <>
      <ModalHeader>Item for sale</ModalHeader>
      <ModalBody>
        {isProcessing && isSuccess ? (
          <Success asset={asset} />
        ) : (
          <StatusBlock status={status} />
        )}
        {isProcessing && !isSuccess && <S.ProgressBar status={status} />}
        {!status && (
          <>
            <Flex mb={4}>
              <Center
                boxSize="60px"
                background="gray.100"
                border="1px solid #EDF0F4"
                borderRadius="xl"
              >
                <Text fontWeight={700}>1</Text>
              </Center>
              <Box ml={4}>
                <Text fontSize="xl" fontWeight={700}>
                  Sign Sell Order
                </Text>
                <Text fontSize="xl">Sign sell order using your wallet.</Text>
              </Box>
            </Flex>

            <Button size="md" onClick={onPutOnSale} isFullWidth>
              Start Now
            </Button>
          </>
        )}
        {status > 0 &&
          (isSuccess || status === Status.init || status === Status.error) && (
            <Button size="md" onClick={onClose} isFullWidth>
              {isSuccess || status === Status.error ? 'Close' : 'Cancel'}
            </Button>
          )}
      </ModalBody>
    </>
  );
};

export default observer(Finish);
