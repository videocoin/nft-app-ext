import React from 'react';

import { SimpleGrid } from '@chakra-ui/react';

import { Asset } from '../../types/asset';
import AuctionCard from '../AuctionCard';

const List = ({ data }: { data: Asset[] }) => {
  const renderItem = (asset: Asset) => {
    return (
      <div key={asset.id}>
        <AuctionCard asset={asset} />
      </div>
    );
  };
  return (
    <SimpleGrid columns={2} spacing={12}>
      {data.map(renderItem)}
    </SimpleGrid>
  );
};

export default List;
