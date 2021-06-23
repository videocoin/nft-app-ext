import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import View from 'components/UI/View';
import Avatar from 'components/Avatar';
import Spinner from 'components/UI/Spinner';
import Container from 'components/UI/Container';
import bg from './assets/bg.jpg';
import * as S from './styles';
import IconButton from 'components/UI/IconButton';
import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { ReactComponent as CopyIcon } from 'icons/copy.svg';
import Button from 'components/UI/Button';
import cutString from 'helpers/cutString';
import { Tab } from './share';
import TabNav from '../UI/TabNav';
import { useProfile } from 'api/account';
import routes from 'routes';

const tabs = [
  {
    id: Tab.videoArt,
    name: 'Video Art',
  },
  {
    id: Tab.valuables,
    name: 'Valuables',
  },
];

const ProfilePage = () => {
  const { data } = useProfile();
  const [tab, setTab] = useState(Tab.videoArt);
  if (!data) return <Spinner />;
  const { profileImgUrl, address, user } = data;
  const shortAddress = cutString(address, 6, 5);
  const { name, username } = user;
  const handleSwitchTab = (e: SyntheticEvent<HTMLButtonElement>) => {
    setTab(+(e.currentTarget.dataset.tab as any));
  };
  return (
    <div>
      <S.Header>
        <img src={user.coverUrl || bg} alt="" />
      </S.Header>
      <S.Profile>
        <Container>
          <View row centerV marginB={50}>
            <Avatar size="xl" src={profileImgUrl} name={user.name || address} />
            <View marginL="auto" row centerV>
              <Link to={routes.editProfile}>
                <Button size="md" theme="secondary">
                  Edit Profile
                </Button>
              </Link>
              <View marginL={30}>
                <IconButton>
                  <ShareIcon />
                </IconButton>
              </View>
            </View>
          </View>
          <S.Title>{name}</S.Title>
          <S.Username>@{username}</S.Username>
          <View>
            <S.Address>
              <div>
                <div>#29710</div>
                <S.AddressVal>{shortAddress}</S.AddressVal>
              </div>
              <IconButton>
                <CopyIcon />
              </IconButton>
            </S.Address>
          </View>
          <TabNav tabs={tabs} activeTab={tab} onChange={setTab} />
        </Container>
      </S.Profile>
    </div>
  );
};

export default ProfilePage;
