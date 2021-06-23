import React, { ChangeEvent, useCallback, useState } from 'react';
import { useDebounce } from 'react-use';
import * as S from './styles';
import { ReactComponent as SearchIcon } from 'icons/search.svg';
import Spinner from 'components/UI/Spinner';

const SearchBar = ({
  onSearch,
  isFetching,
}: {
  onSearch: (q: string) => void;
  isFetching: boolean;
}) => {
  const [q, setQ] = useState('');

  useDebounce(
    () => {
      onSearch(q);
    },
    500,
    [q]
  );
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value),
    []
  );
  return (
    <S.SearchBar>
      <S.SearchIcon>
        <SearchIcon />
      </S.SearchIcon>
      <input type="text" value={q} onChange={onChange} placeholder="Search" />
      <S.Loader>{isFetching && <Spinner />}</S.Loader>
    </S.SearchBar>
  );
};

export default SearchBar;
