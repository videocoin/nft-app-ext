import Button from 'components/UI/Button';
import React from 'react';

import * as S from './styles';

const BecomeCreator = () => {
  return (
    <S.BecomeCard>
      <S.Subttl>Creators of the day</S.Subttl>
      <S.Title>
        Become a Part <br />
        of Something Great
      </S.Title>
      <S.Link to="/creators">
        <Button theme="secondary">View all creators</Button>
      </S.Link>
    </S.BecomeCard>
  );
};

export default BecomeCreator;
