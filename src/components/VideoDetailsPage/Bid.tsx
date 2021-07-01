import React from 'react';
import * as S from './styles';
import Button from '../UI/Button';
import BidCountdown from 'components/BidCountdown';
import { useStore } from 'store';
import { Asset } from 'types/asset';
import { useProfile } from 'api/account';

const Bid = ({ asset }: { asset: Asset }) => {
  const { data } = useProfile();
  const { openModal } = useStore('modalsStore');
  const handlePlaceBid = () => openModal('placeBid', { asset });
  const handleCheckout = () => openModal('checkout', { asset });
  const isOwner = data?.id === asset.owner.id;
  return (
    <S.Bid>
      <S.BidInfo>
        <div>
          <S.BidLabel>Current Bid</S.BidLabel>
          <S.BidValue>{asset.instantSalePrice} VID</S.BidValue>
          <S.BidPrice>$10,021.77</S.BidPrice>
        </div>
        {/*<div>*/}
        {/*  <S.BidLabel>Auction ending in</S.BidLabel>*/}
        {/*  <BidCountdown />*/}
        {/*</div>*/}
      </S.BidInfo>
      {!isOwner && (
        <S.BidBtns>
          {/*<Button size="lg" onClick={handlePlaceBid}>*/}
          {/*  Place a bid*/}
          {/*</Button>*/}
          <Button size="lg" theme="secondary" onClick={handleCheckout}>
            Purchase now
          </Button>
        </S.BidBtns>
      )}
    </S.Bid>
  );
};

export default Bid;
