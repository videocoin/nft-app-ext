import React from 'react';
import { Asset } from 'types/asset';

import * as S from './styles';

const Success = ({ asset }: { asset: Asset }) => {
  const { name, creator } = asset;

  return (
    <>
      <S.Title>Success! 🎉 </S.Title>
      <S.Row>
        <S.Label>
          <strong>Bid for {name}</strong>
        </S.Label>
        <S.Value>by @{creator.user.username}</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Status</S.Label>
        <S.Value>Submitted</S.Value>
      </S.Row>
    </>
  );
};

export default Success;
