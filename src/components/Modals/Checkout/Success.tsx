import React from 'react';
import * as S from './styles';
import { Asset } from 'types/asset';
import cutString from 'helpers/cutString';

const Success = ({
  asset,
  transaction,
}: {
  asset: Asset;
  transaction: string;
}) => {
  const { name, creator } = asset;
  const hash = cutString(transaction, 10, 6);

  return (
    <>
      <S.Title>Success! 🎉 </S.Title>
      <S.Row>
        <S.Label>
          <strong>{name}</strong>
        </S.Label>
        <S.Value>by @{creator.user.username}</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Status</S.Label>
        <S.Value>Transferred</S.Value>
      </S.Row>
      <S.Row>
        <S.Label>Transaction ID</S.Label>
        <S.Value>
          <a
            href={`https://rinkeby.etherscan.io/tx/${transaction}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {hash}
          </a>
        </S.Value>
      </S.Row>
    </>
  );
};

export default Success;
