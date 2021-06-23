import React from 'react';
import { map } from 'lodash/fp';
import * as S from './styles';
import Avatar from '../Avatar';
import View from '../UI/View';

interface HistoryItemProps {
  id: number;
  avatar: string;
  name: string;
  placedBy: string;
  date: string;
  amountVid: string;
  amountUsd: string;
}

const HistoryItem = ({
  item: { avatar, name, date, amountVid, amountUsd, placedBy },
}: {
  item: HistoryItemProps;
}) => {
  return (
    <S.HistoryItem>
      <Avatar src={avatar} name={name} />
      <View marginL={30}>
        <S.HistoryPlaced>
          Bid placed by <span>{placedBy}</span>
        </S.HistoryPlaced>
        <S.HistoryDate>{date}</S.HistoryDate>
      </View>
      <View marginL="auto">
        <S.HistoryVid>{amountVid}</S.HistoryVid>
        <S.HistoryUsd>{amountUsd}</S.HistoryUsd>
      </View>
    </S.HistoryItem>
  );
};

const data: HistoryItemProps[] = [
  {
    id: 1,
    name: 'gloria',
    avatar: 'https://i.pravatar.cc/160?img=5',
    placedBy: '@gloria_queen',
    date: 'March 12, 2021 at 1:25am',
    amountVid: '978.50 VID',
    amountUsd: '$483.49',
  },
  {
    id: 2,
    name: 'gloria',
    avatar: 'https://i.pravatar.cc/160?img=8',
    placedBy: '0xD4a0...F6bD',
    date: 'March 12, 2021 at 1:25am',
    amountVid: '654.50 VID',
    amountUsd: '$321.55',
  },
  {
    id: 3,
    name: 'gloria',
    avatar: 'https://i.pravatar.cc/160?img=1',
    placedBy: '@diana_prince',
    date: 'March 12, 2021 at 1:25am',
    amountVid: '347.50 VID',
    amountUsd: '$209.11',
  },
];

const renderItem = (item: HistoryItemProps) => (
  <HistoryItem item={item} key={item.id} />
);

const History = () => {
  return (
    <div>
      <S.SectionTitle>History</S.SectionTitle>
      <div>{map(renderItem, data)}</div>
    </div>
  );
};

export default History;
