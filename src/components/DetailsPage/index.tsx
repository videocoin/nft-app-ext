import { useAsset } from 'api/assets';
import Sold from 'components/DetailsPage/Sold';
import Spinner from 'components/UI/Spinner';
import useUserProfile from 'hooks/useUserProfile';
import { observer } from 'mobx-react-lite';
import { OrderQuery, OrderSide } from 'opensea-js/lib/types';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'store';

import View from '../UI/View';

import Author from './Author';
import Bid from './Bid';
import Certificate from './Certificate';
import ContentReader from './ContentReader';
import Description from './Description';
import EditionOf from './EditionOf';
import History from './History';
import Social from './Social';
import { AuthorBar, Container, Title, WrongToken } from './styles';

const DetailsPage = observer(() => {
  const params = useParams();
  const { openSea } = useStore('metamaskStore');
  const { data, isLoading, isError } = useAsset(+params.uid);
  const profileData = useUserProfile();
  const [orders, setOrders] = useState<any>([]);

  const getOrders = useCallback(async () => {
    if (!openSea || !data) return;
    try {
      const { orders } = await openSea.api.getOrders({
        token_id: data.tokenId,
        side: OrderSide.Buy,
        order_direction: 'desc',
      } as OrderQuery);
      setOrders(orders);
    } catch (err) {
      console.log(err);
      setOrders([]);
    }
  }, [data, openSea]);

  useEffect(() => {
    if (openSea && data) {
      getOrders();
    }
  }, [openSea, data, getOrders]);

  if (isLoading || !data)
    return (
      <View marginV={300}>
        <Spinner />
      </View>
    );

  const isOwner = profileData?.id === data.owner.id;

  if (isError) {
    return <WrongToken>Wrong token</WrongToken>;
  }

  const { media, drmKey, creator, name, sold, description, locked } = data;

  return (
    <div>
      <ContentReader
        drmKey={drmKey}
        media={media}
        locked={locked}
        shouldDecrypt={locked && isOwner}
      />
      <Container>
        <AuthorBar>
          <View marginT={-40} marginB={30} row spread>
            <Author owner={creator} />
            <Social />
          </View>
        </AuthorBar>
        <Title>{name}</Title>
        <View marginB={100}>
          {sold ? (
            <Sold asset={data} isOwner={isOwner} />
          ) : (
            <Bid asset={data} isOwner={isOwner} orders={orders} />
          )}
        </View>
        <View marginB={100}>
          <Description text={description} />
        </View>
        <View marginB={100}>
          <EditionOf />
        </View>
        <View marginB={100}>
          <Certificate data={data} />
        </View>
        <View marginB={100}>
          <History orders={orders} />
        </View>
      </Container>
    </div>
  );
});

export default DetailsPage;
