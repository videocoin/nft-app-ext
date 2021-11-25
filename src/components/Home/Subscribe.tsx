import React from 'react';

import Container from '../UI/Container';

import * as S from './styles';

const Subscribe = () => {
  return (
    <S.Wrapper>
      <Container>
        <S.SubscribeTitle>Never miss a drop 🔥</S.SubscribeTitle>
        <S.SubscribeDesc>
          Subscribe to our ultra-exclusive drop list and be the first to know
          about upcoming Video NFT drops.
        </S.SubscribeDesc>
      </Container>
    </S.Wrapper>
  );
};

export default Subscribe;
