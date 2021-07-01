import React from 'react';
import { Creator } from 'types/creators';
import CreatorCard from 'components/CreatorCard';
import * as S from './styles';

const List = ({ data }: { data: Creator[] }) => {
  const renderItem = (creator: Creator) => {
    return (
      <li key={creator.id}>
        <CreatorCard creator={creator} />
      </li>
    );
  };
  return <S.Grid>{data.map(renderItem)}</S.Grid>;
};

export default List;
