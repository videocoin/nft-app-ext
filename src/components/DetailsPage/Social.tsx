import ActionMenu from 'components/DetailsPage/ActionMenu';
import React from 'react';

import { HStack } from '@chakra-ui/react';

import { ReactComponent as Instagram } from './assets/instagram.svg';
import { ReactComponent as Share } from './assets/share.svg';
import { ReactComponent as Youtube } from './assets/youtube.svg';
import { SocialItem } from './styles';

const social = [
  {
    name: 'instagram',
    link: '',
    icon: <Instagram />,
  },
  {
    name: 'youtube',
    link: '',
    icon: <Youtube />,
  },
  {
    name: 'share',
    link: '',
    icon: <Share />,
  },
];

const renderItem = ({ name, link, icon }: any) => {
  return (
    <SocialItem key={name} href={link}>
      {icon}
    </SocialItem>
  );
};

const Social = () => {
  return (
    <HStack align="flex-start">
      {social.map(renderItem)}
      <ActionMenu />
    </HStack>
  );
};

export default Social;
