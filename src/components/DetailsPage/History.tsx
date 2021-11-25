import { map } from 'lodash/fp';
import { Order } from 'opensea-js/lib/types';
import React from 'react';

import { VStack } from '@chakra-ui/react';
import { formatUnits } from '@ethersproject/units';

import Avatar from '../Avatar';
import View from '../UI/View';

import * as S from './styles';
import { COIN } from 'const';

export const HistoryItem = ({
  item: { listingTime, basePrice, paymentTokenContract, makerAccount },
}: {
  item: Order;
}) => {
  const date = new Date(listingTime.toNumber() * 1000);
  const amount = formatUnits(
    basePrice.toString(),
    paymentTokenContract?.decimals
  );
  const symbol = paymentTokenContract?.symbol || COIN;
  return (
    <S.HistoryItem>
      <Avatar
        src={makerAccount?.profileImgUrl}
        name={makerAccount?.address || ''}
      />
      <View marginL={30}>
        <S.HistoryPlaced>
          Bid placed by
          <span>
            {` @${makerAccount?.user?.username || makerAccount?.address}`}
          </span>
        </S.HistoryPlaced>
        <S.HistoryDate>{date.toLocaleString()}</S.HistoryDate>
      </View>
      <View marginL="auto">
        <S.HistoryVid>{`${amount} ${symbol}`}</S.HistoryVid>
        <S.HistoryUsd>$483.49</S.HistoryUsd>
      </View>
    </S.HistoryItem>
  );
};

const renderItem = (item: Order) => <HistoryItem item={item} key={item.hash} />;

const History = ({ orders }: { orders: Order[] }) => {
  return (
    <div>
      <S.SectionTitle>History</S.SectionTitle>
      <VStack align="stretch">{map(renderItem, orders)}</VStack>
    </div>
  );
};

export default History;
