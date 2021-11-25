import assetsApi from 'api/assets';
import { find, flatten, path } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useStore } from 'store';
import { Asset } from 'types/asset';

import { Center, Spinner } from '@chakra-ui/react';

import Container from '../UI/Container';
import TabNav from '../UI/TabNav';

import List from './List';
import { Tab, tabs } from './share';
import * as S from './styles';

const ListLoadLimit = 25;

const ArtsPage = observer(() => {
  const { paymentTokens } = useStore('metamaskStore');
  const [tab, setTab] = useState(Tab.liveAuctions);
  const { data, isLoading } = useInfiniteQuery<Asset[]>(
    ['arts'],
    assetsApi.fetchAssets,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.length < ListLoadLimit) return null;
        return path('pagination.nextPageCursor', lastPage);
      },
      staleTime: Infinity,
      keepPreviousData: true,
    }
  );
  const flatData = flatten(data?.pages).map((item) => ({
    ...item,
    token: find({ address: item.auction.paymentTokenAddress }, paymentTokens),
  }));
  return (
    <div>
      <S.Header>
        <Container>
          <TabNav tabs={tabs} activeTab={tab} onChange={setTab} />
        </Container>
      </S.Header>
      <Container>
        {isLoading ? (
          <Center mb={12}>
            <Spinner size="xl" color="purple.500" />
          </Center>
        ) : (
          <List data={flatData} />
        )}
      </Container>
    </div>
  );
});

export default ArtsPage;
