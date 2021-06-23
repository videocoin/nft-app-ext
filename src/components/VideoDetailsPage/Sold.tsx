import React from 'react';
import { Asset } from 'types/asset';
import View from 'components/UI/View';
import Avatar from 'components/Avatar';
import * as S from './styles';

const Sold = ({ asset }: { asset: Asset }) => {
  const { instantSalePrice, owner } = asset;
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
            <Avatar name={owner.user.name} src={owner.profileImgUrl} />
            <S.OwnerName>@{owner.user.name}</S.OwnerName>
          </View>
        </div>
      </S.BidInfo>
    </S.Bid>
  );
};

export default Sold;
