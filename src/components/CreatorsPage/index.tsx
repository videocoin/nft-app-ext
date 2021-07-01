import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import creatorsApi from 'api/creators';
import { Creator } from 'types/creators';
import { flatten, path } from 'lodash/fp';
import List from 'components/CreatorsPage/List';
import SearchBar from 'components/CreatorsPage/SearchBar';
import { Wrapper } from './styles';

const ListLoadLimit = 25;

const CreatorsPage = () => {
  const [q, setQ] = useState('');
  const { data, isFetching } = useInfiniteQuery<Creator[]>(
    ['creators', { q }],
    creatorsApi.fetchCreators,
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
    <Wrapper>
      <SearchBar onSearch={setQ} isFetching={isFetching} />
      <List data={flatData} />
    </Wrapper>
  );
};

export default CreatorsPage;
