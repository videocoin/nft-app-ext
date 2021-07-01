import React, { useState } from 'react';
import TabNav from '../UI/TabNav';
import { Tab, tabs } from './share';
import Container from '../UI/Container';
import { useInfiniteQuery } from 'react-query';
import { flatten, path } from 'lodash/fp';
import List from './List';
import { Asset } from '../../types/asset';
import assetsApi from '../../api/assets';
import * as S from './styles';

const ListLoadLimit = 25;

const VideoArtsPage = () => {
  const [tab, setTab] = useState(Tab.liveAuctions);
  const { data } = useInfiniteQuery<Asset[]>(
    ['video-arts'],
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
  const flatData = flatten(data?.pages);
  return (
    <div>
      <S.Header>
        <Container>
          <TabNav tabs={tabs} activeTab={tab} onChange={setTab} />
        </Container>
      </S.Header>

      <Container>
        <List data={flatData} />
      </Container>
    </div>
  );
};

export default VideoArtsPage;
