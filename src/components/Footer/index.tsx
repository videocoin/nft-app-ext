import Container from 'components/UI/Container';
import { map } from 'lodash/fp';
import React from 'react';
import { Link } from 'react-router-dom';

import View from '../UI/View';

import logo from './logo.png';
import * as S from './styles';

const menu = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/art',
    name: 'Art',
  },
  {
    path: '/valuables',
    name: 'Valuables',
  },
  {
    path: '/creators',
    name: 'Creators',
  },
];

const menu2 = [
  {
    path: '/terms',
    name: 'Terms of Service',
  },
  {
    path: '/privacy',
    name: 'Privacy',
  },
  {
    path: '/help',
    name: 'Help',
  },
];

const Footer = () => {
  const renderLink = ({ path, name }: { path: string; name: string }) => {
    return (
      <li key={path}>
        <Link to={path}>{name}</Link>
      </li>
    );
  };
  return (
    <S.Footer>
      <Container>
        <S.Inner>
          <div>
            <View marginB={50}>
              <img src={logo} width={36} height={40} alt="VideCoin" />
            </View>
            <S.Copyright>
              © 2021, VideoCoinNFT. <br />
              All Right Reserved
            </S.Copyright>
          </div>
          <div>
            <S.Title>
              We collaborate with creative people; let’s build something great
              together.
            </S.Title>
            <S.Menu>
              <ul>{map(renderLink, menu)}</ul>
              <ul>{map(renderLink, menu2)}</ul>
            </S.Menu>
          </div>
        </S.Inner>
      </Container>
    </S.Footer>
  );
};

export default Footer;
