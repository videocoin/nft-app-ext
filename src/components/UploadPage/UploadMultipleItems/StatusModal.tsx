import assetsApi from 'api/assets';
import Button from 'components/UI/Button';
import View from 'components/UI/View';
import { ReactComponent as CheckIcon } from 'icons/check.svg';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import { makeInstantSaleOrder, makePutOnSaleOrder } from 'lib/opensea';
import { compose, concat, map, omit } from 'lodash/fp';
import { EventType } from 'opensea-js';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'store';

import {
  Box,
  IconButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useToast,
} from '@chakra-ui/react';

import * as S from './styles';

const StatusModal = ({
  onClose,
  getValues,
}: {
  onClose: () => void;
  getValues: any;
}) => {
  const toast = useToast();
  const { account, openSea } = useStore('metamaskStore');
  const { tokenAddress, putOnSale, instantSale, ...data } = getValues();
  const navigate = useNavigate();
  const [status, setStatus] = useState(0);
  const [item, setItem] = useState<any>(null);
  console.log(data);

  const openVideo = () => {
    onClose();
    setTimeout(() => {
      navigate(`/arts/${item.id}`);
    }, 300);
  };
  const createItem = async () => {
    setStatus(1);
    const {
      previewItems,
      putOnSalePrice,
      instantSalePrice,
      contentItems,
      ...rest
    } = data;
    try {
      const asset = await assetsApi.createAsset({
        ...rest,
        putOnSalePrice: putOnSale ? putOnSalePrice : 0,
        instantSalePrice: instantSale ? instantSalePrice : 0,
        media: compose(
          map(omit(['file', 'extra', 'itemId'])),
          map(({ itemId, ...rest }) => ({ ...rest, id: itemId })),
          concat(previewItems)
        )(contentItems),
      });
      setItem(asset);
      poll(asset.id);
    } catch {
      toast({
        title: 'Something went wrong, please try again',
        status: 'error',
      });
      setStatus(0);
    }
  };

  const signInstantSaleOrder = async () => {
    if (!openSea) return;
    setStatus(3);
    openSea.addListener(EventType.CreateOrder, () => {
      setStatus(4);
    });
    await makeInstantSaleOrder(openSea, { account, item });
  };

  const signSaleOrder = async () => {
    if (!openSea) return;
    setStatus(3);
    openSea.addListener(EventType.CreateOrder, () => {
      setStatus(4);
    });
    await makePutOnSaleOrder(openSea, {
      account,
      item,
      tokenAddress,
    });
  };

  const fetchAsset = async (id: number) => {
    const res = await assetsApi.fetchAsset(id);
    if (res.status === 'PROCESSING') {
      poll(id);
    } else if (res.status === 'FAILED') {
      toast({ title: 'Something went wrong', status: 'error' });
      setStatus(0);
    } else {
      setItem(res);
      setStatus(2);
    }
    return res;
  };
  const poll = (id: number) => {
    setTimeout(() => fetchAsset(id), 2000);
  };
  const handleClose = () => {
    if (status) return;
    onClose();
  };
  return (
    <ModalContent>
      <Box pos="absolute" right={2} top={2}>
        {!status && (
          <IconButton
            size="sm"
            variant="outline"
            onClick={handleClose}
            aria-label="close"
            icon={<CloseIcon fill="#000" />}
          />
        )}
      </Box>
      <ModalHeader>
        <S.StatusModalTitle>New Video Item</S.StatusModalTitle>
      </ModalHeader>
      <ModalBody>
        <S.StatusItem>
          {status === 1 ? (
            <S.StatusSpinner />
          ) : (
            <S.StatusStep active={status > 1}>
              {status > 1 ? <CheckIcon /> : '1'}
            </S.StatusStep>
          )}
          <S.StatusDesc>
            <div>Upload Files & Mint Token</div>
            <div>Call contract method.</div>
          </S.StatusDesc>
        </S.StatusItem>
        <View marginB={30} column>
          <Button onClick={createItem} disabled={status >= 1}>
            {status > 1 ? 'Done' : 'Start Now'}
          </Button>
        </View>
        <S.StatusItem>
          {status === 3 ? (
            <S.StatusSpinner />
          ) : (
            <S.StatusStep active={status > 2}>
              {status > 3 ? <CheckIcon /> : '2'}
            </S.StatusStep>
          )}
          <S.StatusDesc>
            {instantSale && <div>Sign Instant Sell Order</div>}
            {putOnSale && <div>Sign Sell Order</div>}
            <div>Sign sell order using your wallet.</div>
          </S.StatusDesc>
        </S.StatusItem>
        {status <= 3 && (
          <View marginB={30} column>
            {instantSale && (
              <Button onClick={signInstantSaleOrder} disabled={status !== 2}>
                {status > 3 ? 'Done' : 'Start Now'}
              </Button>
            )}
            {putOnSale && (
              <Button onClick={signSaleOrder} disabled={status !== 2}>
                {status > 3 ? 'Done' : 'Start Now'}
              </Button>
            )}
          </View>
        )}
      </ModalBody>
      <ModalFooter>
        {status > 3 && (
          <S.OpenButton>
            <Button onClick={openVideo}>Open item</Button>
          </S.OpenButton>
        )}
      </ModalFooter>
    </ModalContent>
  );
};

export default observer(StatusModal);
