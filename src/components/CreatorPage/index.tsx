import { useCreator } from 'api/creators';
import Avatar from 'components/Avatar';
import Arts from 'components/CreatorPage/Arts';
import Button from 'components/UI/Button';
import Container from 'components/UI/Container';
import IconButton from 'components/UI/IconButton';
import Spinner from 'components/UI/Spinner';
import View from 'components/UI/View';
import cutString from 'helpers/cutString';
import { ReactComponent as CopyIcon } from 'icons/copy.svg';
import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { ReactNode, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCopyToClipboard } from 'react-use';

import { Box, Heading, Text, useToast } from '@chakra-ui/react';

import TabNav from '../UI/TabNav';

import bg from './assets/bg.jpg';
import { Tab } from './share';
import * as S from './styles';

const tabNav = [
  {
    id: Tab.art,
    name: 'Art',
  },
];

const tabs: Record<Tab, ReactNode> = {
  [Tab.art]: <Arts />,
  [Tab.valuables]: <Arts />,
};

const CreatorPage = () => {
  const toast = useToast();
  const { id } = useParams();
  const { data } = useCreator(+id);
  const [tab, setTab] = useState(Tab.art);
  const [, copyToClipboard] = useCopyToClipboard();
  if (!data) return <Spinner />;
  const { profileImgUrl, address, user } = data;
  const shortAddress = cutString(address, 6, 5);
  const { name, username, coverUrl } = user;
  // const handleSwitchTab = (e: SyntheticEvent<HTMLButtonElement>) => {
  //   setTab(+(e.currentTarget.dataset.tab as any));
  // };
  const handleCopy = () => {
    copyToClipboard(address);
    toast({ title: 'Copied', status: 'success' });
  };
  return (
    <div>
      <S.Header>
        <img src={coverUrl || bg} alt="" />
      </S.Header>
      <Box bg="white">
        <Container>
          <View row centerV marginB={50}>
            <Avatar size="xl" src={profileImgUrl} name={address} />
            <View marginL="auto" row centerV>
              <Button size="md" theme="secondary">
                Follow
              </Button>
              <View marginL={30}>
                <IconButton onClick={() => false}>
                  <ShareIcon />
                </IconButton>
              </View>
            </View>
          </View>
          <Heading size="3xl">{name}</Heading>
          <S.Username>@{username}</S.Username>
          <View>
            <S.Address>
              <div>
                <div>#29710</div>
                <Text color="purple.500" fontWeight="500" mt={4}>
                  {shortAddress}
                </Text>
              </div>
              <IconButton onClick={handleCopy}>
                <CopyIcon />
              </IconButton>
            </S.Address>
          </View>
          <TabNav tabs={tabNav} activeTab={tab} onChange={setTab} />
        </Container>
        {tabs[tab]}
      </Box>
    </div>
  );
};

export default CreatorPage;
