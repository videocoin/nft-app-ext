import Avatar from 'components/Avatar';
import View from 'components/UI/View';
import React from 'react';
import { Creator } from 'types/creators';

import bg from './assets/bg.jpg';
import * as S from './styles';

const CreatorCard = ({ creator }: { creator: Creator }) => {
  const { id, user, profileImgUrl, address } = creator;
  const { name, username, coverUrl } = user;
  return (
    <S.Card to={`/creators/${id}`}>
      <S.Bg>
        <img src={coverUrl || bg} alt="" />
      </S.Bg>
      <S.Content>
        <View marginL={-10}>
          <Avatar size="lg" name={address} src={profileImgUrl} />
        </View>
        <S.Name>{name}</S.Name>
        <S.Nickname>@{username}</S.Nickname>
      </S.Content>
    </S.Card>
  );
};

export default CreatorCard;
