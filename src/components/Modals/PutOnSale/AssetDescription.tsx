import React, { useState } from 'react';
import * as S from 'components/Modals/PutOnSale/styles';
import View from 'components/UI/View';
import Avatar from 'components/Avatar';
import { Asset } from 'types/asset';

const AssetDescription = ({
  asset,
  balance,
  price,
  setPrice,
}: {
  asset: Asset;
  balance: string;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <S.Title>Put on sale</S.Title>
      <S.AssetPreview>
        <View row centerV>
          <img
            width={134}
            height={76}
            src={asset.thumbnailUrl}
            alt={asset.name}
          />
          <View marginL={20}>
            <View row centerV marginB={16}>
              <Avatar name={asset.owner.user.name} size="xxs" />
              <View marginL={10}>
                <S.Username>{`@${asset.owner.user.username}`}</S.Username>
              </View>
            </View>
            <S.AssetName>{asset.name}</S.AssetName>
          </View>
        </View>
      </S.AssetPreview>
      <S.BidBlock>
        <S.MinBidTitle>Previous sale price was</S.MinBidTitle>
        <S.MinBid>{asset.instantSalePrice} VID</S.MinBid>
        <S.InputWrapper>
          <S.BidInput
            type="number"
            placeholder="0"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <S.VIDBadge>VID</S.VIDBadge>
        </S.InputWrapper>
      </S.BidBlock>
      <S.MinBidTitle>We will charge 2.5%.</S.MinBidTitle>
      <S.USDValue>$0.00</S.USDValue>
      <S.Balance>
        <div>Your balance</div>
        <div>{balance} VID</div>
      </S.Balance>
    </>
  );
};

export default AssetDescription;
