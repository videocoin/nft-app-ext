import React, { useState } from 'react';
import Modal from 'components/UI/Modal';
import * as S from './styles';
import { ReactComponent as CheckIcon } from 'icons/check.svg';
import Button from 'components/UI/Button';
import assetsApi from 'api/assets';
import { useNavigate } from 'react-router-dom';
import { makeInstantSaleOrder } from 'lib/opensea';
import { useStore } from 'store';
import View from 'components/UI/View';
import { EventType } from 'opensea-js';

const StatusModal = ({
  onClose,
  getValues,
  assetId,
}: {
  onClose: () => void;
  getValues: any;
  assetId?: number;
}) => {
  const { account, openSea } = useStore('metamaskStore');
  const data = getValues();
  const navigate = useNavigate();
  const [status, setStatus] = useState(0);
  const [item, setItem] = useState<any>(null);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      navigate(`/videos/${item.id}`);
    }, 300);
  };
  const createItem = async () => {
    setStatus(1);
    const asset = await assetsApi.createAsset({
      ...data,
      assetId,
    });
    setItem(asset);
    poll(asset.id);
  };

  const signOrder = async () => {
    if (!openSea) return;
    setStatus(3);
    openSea.addListener(EventType.CreateOrder, () => {
      setStatus(4);
    });
    await makeInstantSaleOrder(openSea, { account, item });
  };

  const fetchAsset = async (id: number) => {
    const res = await assetsApi.fetchAsset(id);
    if (res.status === 'PROCESSING') {
      poll(id);
    } else {
      setItem(res);
      setStatus(2);
    }
    return res;
  };
  const poll = (id: number) => {
    setTimeout(() => fetchAsset(id), 1000);
  };
  return (
    <Modal>
      <S.StatusModalTitle>New Video Item</S.StatusModalTitle>
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
          <div>Sign Sell Order</div>
          <div>Sign sell order using your wallet.</div>
        </S.StatusDesc>
      </S.StatusItem>
      {status <= 3 && (
        <View marginB={30} column>
          <Button onClick={signOrder} disabled={status !== 2}>
            {status > 3 ? 'Done' : 'Start Now'}
          </Button>
        </View>
      )}
      {status > 3 && (
        <S.OpenButton>
          <Button onClick={handleClose}>Open video</Button>
        </S.OpenButton>
      )}
    </Modal>
  );
};

export default StatusModal;
