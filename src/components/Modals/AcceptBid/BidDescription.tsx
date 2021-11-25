import Avatar from 'components/Avatar';
import { COIN } from 'const';
import { Link } from 'react-router-dom';
import { Asset } from 'types/asset';

import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { FungibleToken, Order } from 'opensea-js/lib/types';

const BidDescription = ({
  asset,
  fee,
  total,
  order,
  token,
}: {
  asset: Asset;
  fee: string;
  total: string;
  order: Order;
  token?: FungibleToken;
}) => {
  const { auction } = asset;
  const { makerAccount, maker } = order;
  const symbol = token?.symbol || COIN;
  return (
    <>
      <Text fontSize="xl">
        <strong>
          {auction.currentBid} {symbol}
        </strong>{' '}
        for <strong>{asset.name}</strong>
      </Text>
      <Divider my={2} />
      <Flex justify="space-between" mb={2}>
        <Text fontSize="xl" color="gray.500">
          Service fee
        </Text>
        <Text fontSize="xl">
          {fee} {symbol}
        </Text>
      </Flex>
      <Flex justify="space-between">
        <Text fontSize="xl" color="gray.500">
          Total bid amount
        </Text>
        <Text fontSize="xl">
          {total} {symbol}
        </Text>
      </Flex>
      <Flex mt={4} align="center" borderRadius="3xl" bg="gray.100" p={5}>
        <Box>
          <Avatar
            name={makerAccount?.address || ''}
            src={makerAccount?.profileImgUrl}
          />
        </Box>
        <Text fontWeight="700" ml={3}>
          You are about to accept a bid from{' '}
          <Link to={`/creators/${makerAccount?.address}`}>
            <Text color="purple.500" as="span">
              @{makerAccount?.user?.username || maker}
            </Text>
          </Link>
        </Text>
      </Flex>
    </>
  );
};

export default BidDescription;
