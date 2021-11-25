import { useProfile } from 'api/account';
import Avatar from 'components/Avatar';
import Arts from 'components/ProfilePage/Arts';
import Button from 'components/UI/Button';
import Container from 'components/UI/Container';
import IconButton from 'components/UI/IconButton';
import Spinner from 'components/UI/Spinner';
import View from 'components/UI/View';
import cutString from 'helpers/cutString';
import { ReactComponent as CopyIcon } from 'icons/copy.svg';
import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCopyToClipboard } from 'react-use';
import routes from 'routes';

import { useToast } from '@chakra-ui/react';

import TabNav from '../UI/TabNav';

import bg from './assets/bg.jpg';
import { Tab } from './share';
import * as S from './styles';

const tabs = [
  {
    id: Tab.art,
    name: 'Art',
  },
];

const ProfilePage = observer(() => {
  const { data } = useProfile();
  const [tab, setTab] = useState(Tab.art);
  if (!data) return <Spinner />;
  const { profileImgUrl, address, user } = data;
  const shortAddress = cutString(address, 6, 5);
  const { name, username } = user;
  // const handleSwitchTab = (e: SyntheticEvent<HTMLButtonElement>) => {
  //   setTab(+(e.currentTarget.dataset.tab as any));
  // };
  const toast = useToast();
  const [, copyToClipboard] = useCopyToClipboard();
  const handleCopy = () => {
    copyToClipboard(address);
    toast({ title: 'Copied', status: 'success' });
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
                <IconButton onClick={() => false}>
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
              <IconButton onClick={handleCopy}>
                <CopyIcon />
              </IconButton>
            </S.Address>
          </View>
          <TabNav tabs={tabs} activeTab={tab} onChange={setTab} />
        </Container>
        <Arts userId={data.id} />
      </S.Profile>
    </div>
  );
});

export default ProfilePage;
