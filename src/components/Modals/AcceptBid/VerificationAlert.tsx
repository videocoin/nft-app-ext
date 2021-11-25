import Avatar from 'components/Avatar';
import { OpenSeaAccount } from 'opensea-js/lib/types';
import React from 'react';

import * as S from './styles';

const VerificationAlert = ({ buyer }: { buyer: OpenSeaAccount }) => {
  const { profileImgUrl, address } = buyer;
  return (
    <S.VerificationAlert>
      <div>
        <div>This buyer is not yet verified</div>
      </div>
      <Avatar name={address} src={profileImgUrl} />
    </S.VerificationAlert>
  );
};

export default VerificationAlert;
