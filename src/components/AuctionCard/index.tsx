import BidCountdown from 'components/BidCountdown';
import { COIN } from 'const';
import getAuctionEndDate from 'helpers/getAuctionEndDate';
import audioBg from 'img/audio_bg.jpg';
import defaultThumb from 'img/developersNFT.png';
import { find } from 'lodash/fp';
import { Link } from 'react-router-dom';
import { Asset } from 'types/asset';

import {
  Heading,
  Image,
  Link as BaseLink,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

import Avatar from '../Avatar';

import * as S from './styles';

const AuctionCard = ({
  horizontal = false,
  asset,
}: {
  horizontal?: boolean;
  asset: Asset;
}) => {
  const { name, owner, media, auction, isAuction, instantSalePrice, token } =
    asset;
  const { currentBid, paymentTokenAddress, isOpen } = auction;
  const { user, profileImgUrl, id: ownerId, address } = owner;
  const { username } = user;
  const featuredMedia = find({ featured: true }, media);
  const renderPreview = () => {
    if (!featuredMedia) return;
    const { thumbnailUrl, mediaType, name } = featuredMedia;
    const isAudio = mediaType === 'audio';
    const posterUrl = mediaType === 'application' ? defaultThumb : thumbnailUrl;
    const previewUrl = isAudio ? audioBg : posterUrl;
    return (
      <Image
        objectFit={isAudio ? 'cover' : 'contain'}
        boxSize="100%"
        src={previewUrl}
        alt={name}
      />
    );
  };
  const symbol = isAuction || paymentTokenAddress ? token?.symbol : COIN;
  return (
    <LinkBox as={S.Card} horizontal={horizontal}>
      <S.Thumb>{renderPreview()}</S.Thumb>
      <div>
        <BaseLink as={Link} display="block" to={`/creators/${ownerId}`}>
          <S.Author>
            <Avatar src={profileImgUrl} name={address} />
            <Text fontWeight={700} fontSize="2xl" ml={4}>
              @{username}
            </Text>
          </S.Author>
        </BaseLink>
        <Heading
          _hover={{ color: 'purple.500' }}
          transition=".15s ease-in-out"
          size="lg"
          mb={5}
        >
          <LinkOverlay as={Link} to={`/arts/${asset.id}`}>
            {name}
          </LinkOverlay>
        </Heading>
        <SimpleGrid
          bg="#f8fafc"
          border="1px solid #EDF0F4"
          px={7}
          py={6}
          borderRadius="xl"
          columns={2}
        >
          {isAuction ? (
            <div>
              <Text fontSize="xl" color="gray.500">
                Current Bid
              </Text>
              <Text fontSize="xl" fontWeight={700}>
                {currentBid} {symbol}
              </Text>
            </div>
          ) : (
            <div>
              <Text fontSize="xl" color="gray.500">
                Instant Price
              </Text>
              <Text fontSize="xl" fontWeight={700}>
                {instantSalePrice} {symbol}
              </Text>
            </div>
          )}
          {isAuction ? (
            isOpen ? (
              <div>
                <Text fontSize="xl" color="gray.500">
                  Ending in
                </Text>
                <BidCountdown size="sm" date={getAuctionEndDate(auction)} />
              </div>
            ) : (
              <Text fontSize="xl" color="gray.500">
                Ended
              </Text>
            )
          ) : null}
        </SimpleGrid>
      </div>
    </LinkBox>
  );
};

export default AuctionCard;
