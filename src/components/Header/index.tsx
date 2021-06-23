import React from 'react';
import NavBar from './NavBar';
import * as S from './styles';
import logo from './assets/logo.png';
import logo2x from './assets/logo@2x.png';
import { Link } from 'react-router-dom';
import ProfileBlock from './ProfileBlock';

const Header = () => {
  return (
    <S.Root>
      <Link to="/">
        <S.Logo>
          <img src={logo} srcSet={`${logo2x} 2x`} alt="VideoCoin NFT" />
        </S.Logo>
      </Link>
      <NavBar />
      <ProfileBlock />
    </S.Root>
  );
};

export default Header;
