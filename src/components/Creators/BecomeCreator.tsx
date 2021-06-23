import React from 'react';
import * as S from './styles';
import Button from 'components/UI/Button';

const BecomeCreator = () => {
  return (
    <S.BecomeCard>
      <S.Subttl>Creators of the day</S.Subttl>
      <S.Title>
        Become a Part <br />
        of Something Great
      </S.Title>
      <Button theme="secondary">View all creators</Button>
    </S.BecomeCard>
  );
};

export default BecomeCreator;
