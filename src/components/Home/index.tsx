import React from 'react';
import LiveAuctions from '../LiveAuctions';
import Subscribe from './Subscribe';
import { Head, Title } from './styles';
import FeaturedVideos from 'components/FeaturedVideos';
import BecomeCreator from 'components/BecomeCreator';
import Creators from '../Creators';
import FeaturedVideo from 'components/FeaturedVideo';
import { useFeatured } from 'api/spotlight';

const Home = () => {
  const { data } = useFeatured();
  if (!data || data.length === 0) return null;
  return (
    <div>
      <Head>
        <Title>
          The first marketplace&nbsp;
          <span>dedicated to Video NFTs.</span>
        </Title>
        <FeaturedVideo asset={data[0]} />
      </Head>
      <Subscribe />
      <LiveAuctions />
      <FeaturedVideos />
      <Creators />
      <BecomeCreator />
    </div>
  );
};

export default Home;
