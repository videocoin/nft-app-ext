import React, { useState } from 'react';
import TabNav from '../UI/TabNav';
import { Tab, tabs } from './share';
import Container from '../UI/Container';
import { useInfiniteQuery } from 'react-query';
import { Creator } from '../../types/creators';
import creatorsApi from '../../api/creators';
import { flatten, path } from 'lodash/fp';
import List from './List';
import { Asset } from '../../types/asset';
import assetsApi from '../../api/assets';

const ListLoadLimit = 25;

const VideoArtsPage = () => {
  const [tab, setTab] = useState(Tab.liveAuctions);
  const { data, isFetching } = useInfiniteQuery<Asset[]>(
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
      <Container>
        <TabNav tabs={tabs} activeTab={tab} onChange={setTab} />
      </Container>
      <Container>
        <List data={flatData} />
      </Container>
    </div>
  );
};

export default VideoArtsPage;
