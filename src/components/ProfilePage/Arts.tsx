import { useCreatorAssets } from 'api/creators';
import AuctionCard from 'components/AuctionCard';
import Container from 'components/UI/Container';
import Spinner from 'components/UI/Spinner';
import View from 'components/UI/View';
import { find, map } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';
import { Asset } from 'types/asset';

import { Box, SimpleGrid } from '@chakra-ui/react';
const Arts = observer(({ userId }: { userId: number }) => {
  const { data } = useCreatorAssets(userId);
  const { paymentTokens } = useStore('metamaskStore');
  const renderItem = (item: Asset) => {
    return <AuctionCard key={item.id} asset={item} />;
  };
  if (!data)
    return (
      <View margin={50}>
        <Spinner />
      </View>
    );
  const dataWithToken = data.items.map((item) => ({
    ...item,
    token: find({ address: item.auction.paymentTokenAddress }, paymentTokens),
  }));
  return (
    <Box bg="gray.50" py={24}>
      <Container>
        <SimpleGrid columns={2} spacing={12}>
          {map(renderItem, dataWithToken)}
        </SimpleGrid>
      </Container>
    </Box>
  );
});

export default Arts;
