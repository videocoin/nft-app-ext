import * as S from 'components/Modals/Checkout/styles';
import { COIN } from 'const';
import React from 'react';
import { Asset } from 'types/asset';

const AssetDescription = ({
  asset,
  balance,
  fee,
  total,
}: {
  asset: Asset;
  balance: string;
  fee: string;
  total: string;
}) => {
  return (
    <>
      <S.Head>
        <div>{asset.name}</div>
        <div>
          {asset.instantSalePrice} {COIN}
        </div>
      </S.Head>
      <S.Row>
        <S.Label>Your balance</S.Label>
        <S.Value>
          {balance} {COIN}
        </S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Service fee</S.Label>
        <S.Value>
          {fee} {COIN}
        </S.Value>
      </S.Row>
      <S.Row>
        <S.Label>You will pay</S.Label>
        <S.Value>
          {total} {COIN}
        </S.Value>
      </S.Row>
    </>
  );
};

export default AssetDescription;
