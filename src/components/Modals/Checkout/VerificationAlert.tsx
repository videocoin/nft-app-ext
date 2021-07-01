import React from 'react';
import { Creator } from 'types/creators';
import * as S from './styles';
import Avatar from 'components/Avatar';

const VerificationAlert = ({ owner }: { owner: Creator }) => {
  const { profileImgUrl, user, address } = owner;
  return (
    <S.VerificationAlert>
      <div>
        <div>This creator is not yet verified</div>
        <div>Purchase this video at your own risk.</div>
      </div>
      <Avatar name={address} src={profileImgUrl} />
    </S.VerificationAlert>
  );
};

export default VerificationAlert;
