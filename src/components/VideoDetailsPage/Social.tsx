import React from 'react';
import { SocialItem } from './styles';
import { ReactComponent as Instagram } from './assets/instagram.svg';
import { ReactComponent as Share } from './assets/share.svg';
import { ReactComponent as Youtube } from './assets/youtube.svg';
import View from '../UI/View';

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
  return <View row>{social.map(renderItem)}</View>;
};

export default Social;
