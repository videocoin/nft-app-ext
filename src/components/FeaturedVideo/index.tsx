import React from 'react';
import * as S from './styles';
import View from 'components/UI/View';
import Avatar from 'components/Avatar';
import { ReactComponent as ShareIcon } from 'icons/share.svg';
import BidCountdown from 'components/BidCountdown';
import Button from 'components/UI/Button';
import { Asset } from 'types/asset';
import playIcon from 'icons/play.png';
import IconButton from 'components/UI/IconButton';
import { Link } from 'react-router-dom';
import { useStore } from 'store';
import { useWeb3React } from '@web3-react/core';
const FeaturedVideo = ({ asset }: { asset: Asset }) => {
  const { account } = useWeb3React();
  const { openModal } = useStore('modalsStore');
  if (!asset) return null;
  const { id, name, owner } = asset;
  const handlePlaceBid = () => {
    if (!account) {
      openModal('connectWallet');
      return;
    }
    openModal('placeBid', { asset });
  };
  return (
    <S.Root>
      <S.Video>
        <video src={asset.previewUrl} poster={asset.thumbnailUrl} />
        <S.FeaturedBadge>Featured video</S.FeaturedBadge>
        <S.PlayBtn>
          <img src={playIcon} alt="Play" />
        </S.PlayBtn>
      </S.Video>
      <S.Content>
        <View row centerV marginB={46}>
          <Avatar src={owner.profileImgUrl} size="md" name={owner.user.name} />
          <S.Nickname>@{owner.user.username}</S.Nickname>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </View>
        <S.Title>{name}</S.Title>
        <S.Bid>
          <S.BidInfo>
            <div>
              <S.BidLabel>Current Bid</S.BidLabel>
              <S.BidValue>{asset.instantSalePrice} VID</S.BidValue>
              <S.BidPrice>$10,021.77</S.BidPrice>
            </div>
            <div>
              <S.BidLabel>Auction ending in</S.BidLabel>
              <BidCountdown />
            </div>
          </S.BidInfo>
          <S.BidBtns>
            <Button size="lg" onClick={handlePlaceBid}>
              Place a bid
            </Button>
            <Link to={`/videos/${id}`}>
              <Button size="lg" theme="secondary">
                View video
              </Button>
            </Link>
          </S.BidBtns>
        </S.Bid>
      </S.Content>
    </S.Root>
  );
};

export default FeaturedVideo;
