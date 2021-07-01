import React from 'react';
import * as S from './styles';
import AuctionCard from '../AuctionCard';
import { Asset } from '../../types/asset';

const List = ({ data }: { data: Asset[] }) => {
  const renderItem = (asset: Asset) => {
    return (
      <li key={asset.id}>
        <AuctionCard asset={asset} />
      </li>
    );
  };
  return <S.Grid>{data.map(renderItem)}</S.Grid>;
};

export default List;
