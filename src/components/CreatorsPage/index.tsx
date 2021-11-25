import creatorsApi from 'api/creators';
import List from 'components/CreatorsPage/List';
import SearchBar from 'components/CreatorsPage/SearchBar';
import { flatten, path } from 'lodash/fp';
import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Creator } from 'types/creators';

import { Center, Spinner } from '@chakra-ui/react';

import { Wrapper } from './styles';

const ListLoadLimit = 25;

const CreatorsPage = () => {
  const [q, setQ] = useState('');
  const { data, isFetching, isLoading } = useInfiniteQuery<Creator[]>(
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
      {isLoading ? (
        <Center>
          <Spinner size="xl" color="purple.500" />
        </Center>
      ) : (
        <List data={flatData} />
      )}
    </Wrapper>
  );
};

export default CreatorsPage;
