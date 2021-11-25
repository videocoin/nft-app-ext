import { useFeatured } from 'api/spotlight';
import AuctionCard from 'components/AuctionCard';
import Button from 'components/UI/Button';
import Container from 'components/UI/Container';
import View from 'components/UI/View';
import { find } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from 'store';
import { Asset } from 'types/asset';

import * as S from './styles';

const wideCardIdx = 3;

const renderItem = (asset: Asset, idx: number) => {
  return (
    <div key={asset.id}>
      <AuctionCard asset={asset} horizontal={!(idx % wideCardIdx)} />
    </div>
  );
};

const FeaturedArts = observer(() => {
  const { data } = useFeatured();
  const { paymentTokens } = useStore('metamaskStore');
  const dataWithToken = data?.map((item) => ({
    ...item,
    token: find({ address: item.auction.paymentTokenAddress }, paymentTokens),
  }));
  return (
    <View marginT={100}>
      <Container>
        <S.Title>Featured arts</S.Title>
        <S.List>{dataWithToken?.map(renderItem)}</S.List>
        <View row centerH marginT={40}>
          <Link to="/arts">
            <Button theme="secondary" size="md">
              View all arts
            </Button>
          </Link>
        </View>
      </Container>
    </View>
  );
});

export default FeaturedArts;
