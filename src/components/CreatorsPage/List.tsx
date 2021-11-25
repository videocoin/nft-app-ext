import CreatorCard from 'components/CreatorCard';
import React from 'react';
import { Creator } from 'types/creators';

import { Container, SimpleGrid } from '@chakra-ui/react';

const renderItem = (creator: Creator) => (
  <div key={creator.id}>
    <CreatorCard creator={creator} />
  </div>
);

const List = ({ data }: { data: Creator[] }) => {
  return (
    <Container maxW="container.xxl">
      <SimpleGrid columns={4} spacing={12}>
        {data.map(renderItem)}
      </SimpleGrid>
    </Container>
  );
};

export default List;
