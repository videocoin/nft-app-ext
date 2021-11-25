import Avatar from 'components/Avatar';
import React from 'react';
import { Creator } from 'types/creators';

import * as S from './styles';

const VerificationAlert = ({ owner }: { owner: Creator }) => {
  const { profileImgUrl, address } = owner;
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
