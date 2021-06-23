import React from 'react';
import Player from './Player';
import Author from './Author';
import View from '../UI/View';
import Social from './Social';
import { Container, Title, WrongToken } from './styles';
import Bid from './Bid';
import Description from './Description';
import EditionOf from './EditionOf';
import Certificate from './Certificate';
import History from './History';
import Spinner from 'components/UI/Spinner';
import { useParams } from 'react-router-dom';
import { useAsset } from 'api/assets';
import Sold from 'components/VideoDetailsPage/Sold';

const VideoDetailsPage = () => {
  const params = useParams();
  const { data, isLoading, isError } = useAsset(+params.uid);

  if (isLoading)
    return (
      <View marginV={300}>
        <Spinner />
      </View>
    );

  if (isError) {
    return <WrongToken>Wrong token</WrongToken>;
  }

  return (
    <div>
      <Player url={data.url} />
      <Container>
        <View marginT={-40} marginB={30} row spread>
          <Author owner={data.creator} />
          <Social />
        </View>
        <Title>{data.name}</Title>
        <View marginB={100}>
          {data.sold ? <Sold asset={data} /> : <Bid asset={data} />}
        </View>
        <View marginB={100}>
          <Description text={data.description} />
        </View>
        <View marginB={100}>
          <EditionOf />
        </View>
        <View marginB={100}>
          <Certificate data={data} />
        </View>
        <View marginB={100}>
          <History />
        </View>
      </Container>
    </div>
  );
};

export default VideoDetailsPage;
