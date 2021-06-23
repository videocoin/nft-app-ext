import React from 'react';
import { Creator } from 'types/creators';
import * as S from './styles';
import Avatar from 'components/Avatar';

const VerificationAlert = ({ owner }: { owner: Creator }) => {
  const { profileImgUrl, user } = owner;
  return (
    <S.VerificationAlert>
      <div>
        <div>This creator is not yet verified</div>
        <div>Purchase this video at your own risk.</div>
      </div>
      <Avatar name={user.name} src={profileImgUrl} />
    </S.VerificationAlert>
  );
};

export default VerificationAlert;
