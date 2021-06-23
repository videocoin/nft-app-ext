import React from 'react';
import View from '../UI/View';
import Avatar from '../Avatar';
import { ReactComponent as Badge1 } from './assets/badge1.svg';
import { ReactComponent as Badge2 } from './assets/badge2.svg';
import { AuthorName } from './styles';
import { Creator } from 'types/creators';

const Author = ({ owner }: { owner: Creator }) => {
  const { profileImgUrl, user } = owner;
  return (
    <div>
      <View row centerV marginB={30}>
        <Avatar
          src={profileImgUrl || 'https://i.pravatar.cc/160?img=7'}
          size="md"
          name={user?.name}
        />
        <View marginL={20} marginR={10}>
          <Badge1 />
        </View>
        <Badge2 />
      </View>
      <AuthorName>@{user?.name || 'jerremyirons'}</AuthorName>
    </div>
  );
};

export default Author;
