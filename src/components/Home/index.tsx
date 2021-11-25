import { useFeatured } from 'api/spotlight';
import BecomeCreator from 'components/BecomeCreator';
import FeaturedArt from 'components/FeaturedArt';
import FeaturedArts from 'components/FeaturedArts';
import React from 'react';

import { Center, Spinner } from '@chakra-ui/react';

import Creators from '../Creators';
import LiveAuctions from '../LiveAuctions';

import { Head, Title } from './styles';
import Subscribe from './Subscribe';

const Home = () => {
  const { data, isLoading } = useFeatured();
  return (
    <div>
      <Head>
        <Title>
          The first marketplace&nbsp;
          <span>dedicated to Video NFTs.</span>
        </Title>
        {data && Boolean(data.length) && <FeaturedArt asset={data[0]} />}
        {isLoading && (
          <Center>
            <Spinner size="xl" color="purple.500" />
          </Center>
        )}
      </Head>
      <Subscribe />
      <LiveAuctions />
      <FeaturedArts />
      <Creators />
      <BecomeCreator />
    </div>
  );
};

export default Home;
