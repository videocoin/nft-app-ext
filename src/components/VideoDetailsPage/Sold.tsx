import React from 'react';
import { Asset } from 'types/asset';
import View from 'components/UI/View';
import Avatar from 'components/Avatar';
import Button from '../UI/Button';
import { useStore } from 'store';
import { useProfile } from 'api/account';
import * as S from './styles';

const Sold = ({ asset }: { asset: Asset }) => {
  const { data } = useProfile();
  const { instantSalePrice, owner } = asset;
  const { openModal } = useStore('modalsStore');
  const handlePutOnSale = () => openModal('putOnSale', { asset });
  const isOwner = data?.id === asset.owner.id;
  return (
    <S.Bid>
      <S.BidInfo>
        <div>
          <S.BidLabel>Sold for</S.BidLabel>
          <S.BidValue>{instantSalePrice} VID</S.BidValue>
          <S.BidPrice>$10,021.77</S.BidPrice>
        </div>
        <div>
          <S.BidLabel>Owned by</S.BidLabel>
          <View row centerV>
            <Avatar name={owner.address} src={owner.profileImgUrl} />
            <S.OwnerName>@{owner.user.username}</S.OwnerName>
          </View>
        </div>
      </S.BidInfo>
      {isOwner && (
        <S.BidBtns>
          <Button size="lg" onClick={handlePutOnSale}>
            Put on sale
          </Button>
        </S.BidBtns>
      )}
    </S.Bid>
  );
};

export default Sold;
