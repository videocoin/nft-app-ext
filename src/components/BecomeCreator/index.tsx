import Button from 'components/UI/Button';
import Container from 'components/UI/Container';
import View from 'components/UI/View';
import React from 'react';
import { Link } from 'react-router-dom';

import bg from './bg.jpg';
import bg2x from './bg@2x.jpg';
import * as S from './styles';

const BecomeCreator = () => {
  return (
    <View paddingV={100}>
      <Container>
        <S.Title>Welcome to the future of creative economy.</S.Title>
        <S.Description>
          We’re bringin digital video creators, crypto natives, and collectors
          together to move culture forward.
        </S.Description>
        <View row centerH>
          <Link to="/upload">
            <Button size="md" theme="gradient">
              <span>Become a creator</span>
            </Button>
          </Link>
        </View>
      </Container>
      <S.Bg>
        <img src={bg} srcSet={`${bg2x} 2x`} alt="" />
      </S.Bg>
    </View>
  );
};

export default BecomeCreator;
