import React from 'react';
import { Link } from 'react-router-dom';

import { Flex, Spacer } from '@chakra-ui/react';

import logo from './assets/logo.png';
import logo2x from './assets/logo@2x.png';
import NavBar from './NavBar';
import ProfileBlock from './ProfileBlock';

const Header = () => {
  return (
    <Flex bg="gray.50" align="center" py={6} px={12} pos="relative" mb={12}>
      <Link to="/">
        <img src={logo} srcSet={`${logo2x} 2x`} alt="VideoCoin NFT" />
      </Link>
      <Spacer />
      <NavBar />
      <ProfileBlock />
    </Flex>
  );
};

export default Header;
