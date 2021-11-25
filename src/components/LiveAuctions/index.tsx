import { useLive } from 'api/spotlight';
import AuctionCard from 'components/AuctionCard';
import Button from 'components/UI/Button';
import Container from 'components/UI/Container';
import { find, map } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from 'store';
import { Asset } from 'types/asset';

import * as S from './styles';

const renderItem = (asset: Asset) => {
  return (
    <div key={asset.id}>
      <AuctionCard asset={asset} />
    </div>
  );
};

const LiveAuctions = observer(() => {
  const { data } = useLive();
  const { paymentTokens } = useStore('metamaskStore');
  const dataWithToken = data?.map((item) => ({
    ...item,
    token: find({ address: item.auction.paymentTokenAddress }, paymentTokens),
  }));
  return (
    <>
      <Container>
        <S.Header>
          <S.Title>Live auctions</S.Title>
          <Link to="/arts">
            <Button theme="secondary">View all live auctions</Button>
          </Link>
        </S.Header>
      </Container>
      <S.List>{map(renderItem, dataWithToken)}</S.List>
    </>
  );
});

export default LiveAuctions;
