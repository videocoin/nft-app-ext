import BidCountdown from 'components/BidCountdown';
import { COIN } from 'const';
import getAuctionEndDate from 'helpers/getAuctionEndDate';
import { find, head } from 'lodash/fp';
import { observer } from 'mobx-react-lite';
import { Order } from 'opensea-js/lib/types';
import { useStore } from 'store';
import { Asset } from 'types/asset';

import { Box, Button, HStack, SimpleGrid, Text } from '@chakra-ui/react';

import { HistoryItem } from './History';
import * as S from './styles';

const OnSale = observer(
  ({ asset, isOwner }: { asset: Asset; isOwner: boolean }) => {
    const { openModal } = useStore('modalsStore');
    const { paymentTokens } = useStore('metamaskStore');

    const handleCheckout = () => openModal('checkout', { asset });

    const { instantSalePrice, onSale, auction, isAuction } = asset;
    if (!onSale || isAuction) return null;
    const { paymentTokenAddress } = auction;
    const token = find({ address: paymentTokenAddress }, paymentTokens);
    const symbol = token?.symbol || COIN;
    return (
      <>
        <Text fontSize="xl" fontWeight={500}>
          Instant Price
        </Text>
        <Text fontSize="4xl" fontWeight={700}>
          {instantSalePrice} {symbol}
        </Text>
        <Text color="gray.500" fontSize="xl">
          $10,021.77
        </Text>

        {!isOwner && (
          <HStack mt={4}>
            <Button flex={1} onClick={handleCheckout}>
              Purchase now
            </Button>
          </HStack>
        )}
      </>
    );
  }
);

const OnAuction = observer(
  ({
    asset,
    isOwner,
    order,
  }: {
    asset: Asset;
    isOwner: boolean;
    order?: Order;
  }) => {
    const { openModal } = useStore('modalsStore');
    const { paymentTokens } = useStore('metamaskStore');
    const { auction, isAuction } = asset;
    const { paymentTokenAddress } = auction;
    const token = find({ address: paymentTokenAddress }, paymentTokens);
    const symbol = isAuction || paymentTokenAddress ? token?.symbol : COIN;

    const handlePlaceBid = () => openModal('placeBid', { asset, token });

    return (
      <Box mb={8}>
        <SimpleGrid columns={2}>
          <div>
            <Text fontSize="xl" fontWeight={500}>
              Current Bid
            </Text>
            <Text fontSize="4xl" fontWeight={700}>
              {auction.currentBid} {symbol}
            </Text>
            <Text color="gray.500" fontSize="xl">
              $10,021.77
            </Text>
          </div>
          <div>
            <Text fontSize="xl" fontWeight={500}>
              Auction ending in
            </Text>
            <BidCountdown date={getAuctionEndDate(auction)} />
          </div>
        </SimpleGrid>
        {order && (
          <Box mt={2} pt={4} mb={8}>
            <HistoryItem item={order} />
          </Box>
        )}
        {!isOwner && (
          <HStack mt={4} mb={4}>
            <Button flex={1} onClick={handlePlaceBid}>
              Place a bid
            </Button>
          </HStack>
        )}
      </Box>
    );
  }
);

const AuctionEnded = observer(
  ({
    asset,
    isOwner,
    order,
  }: {
    asset: Asset;
    isOwner: boolean;
    order?: Order;
  }) => {
    const { openModal } = useStore('modalsStore');
    const { paymentTokens } = useStore('metamaskStore');
    const { auction, isAuction } = asset;
    const { paymentTokenAddress } = auction;
    const token = find({ address: paymentTokenAddress }, paymentTokens);
    const symbol = isAuction || paymentTokenAddress ? token?.symbol : COIN;
    const handleAccept = () => openModal('acceptBid', { asset, order });
    const handleViewAll = () => {
      return false;
    };

    return (
      <Box mb={8}>
        <SimpleGrid columns={2}>
          <div>
            <Text fontSize="xl" fontWeight={500}>
              Current Bid
            </Text>
            <Text fontSize="4xl" fontWeight={700}>
              {auction.currentBid} {symbol}
            </Text>
            <Text color="gray.500" fontSize="xl">
              $10,021.77
            </Text>
          </div>
          <div>
            <Text fontSize="xl" fontWeight={500}>
              Auction ended
            </Text>
          </div>
        </SimpleGrid>
        {order && (
          <Box mt={2} pt={4} mb={8}>
            <HistoryItem item={order} />
          </Box>
        )}
        {isOwner && order && (
          <HStack mt={4} spacing={8} mb={8}>
            <Button flex={1} onClick={handleAccept}>
              Accept
            </Button>
            <Button flex={1} variant="outline" onClick={handleViewAll}>
              View all
            </Button>
          </HStack>
        )}
      </Box>
    );
  }
);

const Bid = observer(
  ({
    asset,
    isOwner,
    orders,
  }: {
    asset: Asset;
    isOwner: boolean;
    orders: Order[];
  }) => {
    const { auction, isAuction } = asset;
    const { isOpen } = auction;
    const order = head(orders);

    return (
      <S.Bid>
        {isAuction ? (
          isOpen ? (
            <OnAuction asset={asset} isOwner={isOwner} order={order} />
          ) : (
            <AuctionEnded asset={asset} isOwner={isOwner} order={order} />
          )
        ) : (
          <OnSale asset={asset} isOwner={isOwner} />
        )}
      </S.Bid>
    );
  }
);

export default Bid;
