import Avatar from 'components/Avatar';
import BidCountdown from 'components/BidCountdown';
import Preview from 'components/FeaturedArt/Preview';
import IconButton from 'components/UI/IconButton';
import { COIN } from 'const';
import getAuctionEndDate from 'helpers/getAuctionEndDate';
import useUserProfile from 'hooks/useUserProfile';
import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { find } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { useStore } from 'store';
import { Asset } from 'types/asset';

import {
  Button,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';

import * as S from './styles';

const FeaturedArt = observer(({ asset }: { asset: Asset }) => {
  const { account } = useWeb3React();
  const { openModal } = useStore('modalsStore');
  const profile = useUserProfile();
  const { isAuth, paymentTokens } = useStore('metamaskStore');
  if (!asset) return null;
  const {
    id,
    name,
    owner,
    media,
    thumbnailUrl: assetThumb,
    auction,
    instantSalePrice,
    onSale,
    isAuction,
  } = asset;
  const { isOpen, currentBid } = auction;
  const isOwner = profile?.id === owner.id;
  const featuredMedia = find({ featured: true }, media);
  const token = find({ address: auction.paymentTokenAddress }, paymentTokens);
  const handleOpenBidModal = () => openModal('placeBid', { asset, token });
  const handleOpenCheckoutModal = () => openModal('checkout', { asset });
  const handlePlaceBid = () => {
    if (!account || !isAuth) {
      openModal('connectWallet', { cb: handleOpenBidModal });
      return;
    }
    handleOpenBidModal();
  };
  const handlePurchaseNow = () => {
    if (!account || !isAuth) {
      openModal('connectWallet', { cb: handleOpenCheckoutModal });
      return;
    }
    handleOpenCheckoutModal();
  };
  const symbol = token?.symbol || COIN;
  return (
    <Flex justify="center" px={20}>
      <Preview media={featuredMedia} assetThumb={assetThumb} />
      <S.Content>
        <Flex align="center" mb={4}>
          <Avatar src={owner.profileImgUrl} size="md" name={owner.address} />
          <Text fontWeight={700} fontSize="2xl" ml={5}>
            @{owner.user.username}
          </Text>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Flex>
        <Heading size="3xl" mb={4}>
          {name}
        </Heading>

        {isAuction && isOpen && (
          <SimpleGrid columns={2} mb={9}>
            <div>
              <Text fontWeight={500} fontSize="xl">
                Current Bid
              </Text>
              <Text fontWeight={700} fontSize="4xl" mb={2}>
                {currentBid} {symbol}
              </Text>
              <Text color="gray.500" fontSize="xl">
                $10,021.77
              </Text>
            </div>
            <div>
              <Text fontWeight={500} fontSize="xl">
                Auction ending in
              </Text>
              <BidCountdown date={getAuctionEndDate(auction)} />
            </div>
          </SimpleGrid>
        )}
        {onSale && !isAuction && (
          <SimpleGrid columns={2} mb={9}>
            <div>
              <Text fontWeight={500} fontSize="xl">
                Instant Price
              </Text>
              <Text fontWeight={700} fontSize="4xl" mb={2}>
                {instantSalePrice} {symbol}
              </Text>
              <Text color="gray.500" fontSize="xl">
                $10,021.77
              </Text>
            </div>
          </SimpleGrid>
        )}
        <HStack mt="auto" spacing={8}>
          {isOpen && !isOwner && (
            <Button flex={1} onClick={handlePlaceBid}>
              Place a bid
            </Button>
          )}
          {onSale && !isAuction && !isOwner && (
            <Button flex={1} onClick={handlePurchaseNow}>
              Purchase now
            </Button>
          )}
          <Button flex={1} variant="outline" as={Link} to={`/arts/${id}`}>
            View art
          </Button>
        </HStack>
      </S.Content>
    </Flex>
  );
});

export default FeaturedArt;
