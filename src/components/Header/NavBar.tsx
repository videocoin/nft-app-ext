import { map } from 'lodash/fp';
import React from 'react';
import { NavLink } from 'react-router-dom';

import * as S from './styles';

interface Link {
  path: string;
  name: string;
  end?: boolean;
}

const menu: Link[] = [
  {
    path: '/',
    name: 'Home',
    end: true,
  },
  {
    path: '/arts',
    name: 'Art',
  },
  {
    path: '/creators',
    name: 'Creators',
  },
];

const NavBar = () => {
  const renderLink = ({ end = false, name, path }: Link) => {
    return (
      <NavLink end={end} to={path} key={name}>
        {name}
      </NavLink>
    );
  };
  return <S.NavBar>{map(renderLink, menu)}</S.NavBar>;
};

export default NavBar;
