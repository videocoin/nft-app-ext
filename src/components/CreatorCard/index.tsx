import Avatar from 'components/Avatar';
import React from 'react';
import * as S from './styles';
import { Creator } from 'types/creators';

const CreatorCard = ({ creator }: { creator: Creator }) => {
  const { id, user, profileImgUrl, address } = creator;
  const { name, username } = user;
  return (
    <S.Card to={`/creators/${id}`}>
      <S.Bg>
        <img src="http://placehold.co/300x300" alt="" />
      </S.Bg>
      <S.Content>
        <Avatar size="lg" name={address} src={profileImgUrl} />
        <S.Name>{name}</S.Name>
        <S.Nickname>@{username}</S.Nickname>
      </S.Content>
    </S.Card>
  );
};

export default CreatorCard;
