import { useCreators } from 'api/spotlight';
import CreatorCard from 'components/CreatorCard';
import BecomeCreator from 'components/Creators/BecomeCreator';
import View from 'components/UI/View';
import { map } from 'lodash/fp';
import React from 'react';
import { Creator } from 'types/creators';

import { List } from './styles';

const renderItem = (creator: Creator) => {
  return (
    <div key={creator.id}>
      <CreatorCard creator={creator} />
    </div>
  );
};

const Creators = () => {
  const { data } = useCreators();
  return (
    <View marginT={100}>
      <List>
        <BecomeCreator />
        {map(renderItem, data)}
      </List>
    </View>
  );
};

export default Creators;
