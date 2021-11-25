import Spinner from 'components/UI/Spinner';
import View from 'components/UI/View';
import React from 'react';

import * as S from './styles';

export enum Status {
  init,
  start,
  orderCreated,
  orderApproving,
  orderSubmitted,
  error,
  complete,
}

const statuses: any = {
  [Status.start]: {
    title: 'Creating your order',
    description: 'Verifying transaction details.',
  },
  [Status.orderCreated]: {
    title: 'Sign your bid',
    description: 'Sign bid using your wallet.',
  },
  [Status.orderSubmitted]: {
    title: 'Submiting your order',
    description: 'Almost done...',
  },
  [Status.error]: {
    title: 'Error',
    description: 'Try again',
  },
};

const StatusBlock = ({ status }: { status: Status }) => {
  const currentStatus = statuses[status];
  return (
    <>
      <S.Title>Placing your bid</S.Title>
      <View row centerV>
        {status !== Status.error && (
          <View marginR={20}>
            <Spinner />
          </View>
        )}
        <View>
          <S.StatusTitle>{currentStatus.title}</S.StatusTitle>
          <S.StatusDescription>{currentStatus.description}</S.StatusDescription>
        </View>
      </View>
    </>
  );
};

export default StatusBlock;
