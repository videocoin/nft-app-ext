import React from 'react';
import Identicon from 'react-identicons';

import { AvatarProps, HashSize } from './share';
import * as S from './styles';

const Avatar = ({ name, src, size = 'sm' }: AvatarProps) => {
  return (
    <S.Avatar size={size}>
      {src ? (
        <img src={src} alt={name} />
      ) : (
        <Identicon string={name} size={HashSize[size]} />
      )}
    </S.Avatar>
  );
};

export default Avatar;
