import React, { SyntheticEvent } from 'react';
import * as S from './styles';
import Avatar from '../Avatar';
import playIcon from 'icons/play.png';
import { useNavigate } from 'react-router-dom';
import { Asset } from 'types/asset';

const AuctionCard = ({
  horizontal = false,
  asset,
}: {
  horizontal?: boolean;
  asset: Asset;
}) => {
  const navigate = useNavigate();
  const { name, owner } = asset;
  const { user, profileImgUrl, id: ownerId, address } = owner;
  const { username } = user;
  const handleOpenVideo = () => navigate(`/videos/${asset.id}`);
  const handleOpenProfile = (e: SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/creators/${ownerId}`);
  };
  return (
    <S.Card horizontal={horizontal} onClick={handleOpenVideo}>
      <S.Thumb>
        <S.Poster src={asset.thumbnailUrl} alt={name} />
        <S.PlayIcon src={playIcon} alt="Play" />
      </S.Thumb>
      <div>
        <S.Author onClick={handleOpenProfile}>
          <Avatar src={profileImgUrl} name={address} />
          <S.Name>@{username}</S.Name>
        </S.Author>
        <S.Title>{name}</S.Title>
        <S.Info>
          <div>
            <S.InfoTitle>Current Bid</S.InfoTitle>
            <div>42.11 VID</div>
          </div>
          <div>
            <S.InfoTitle>Ending in</S.InfoTitle>
            <div>58 sec</div>
          </div>
        </S.Info>
      </div>
    </S.Card>
  );
};

export default AuctionCard;
