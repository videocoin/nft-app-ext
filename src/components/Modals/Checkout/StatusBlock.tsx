import React from 'react';
import View from 'components/UI/View';
import Spinner from 'components/UI/Spinner';
import * as S from './styles';

export enum Status {
  init,
  start,
  matchOrders,
  transactionCreated,
  transactionConfirmed,
  transferred,
  error,
  complete,
}

const statuses: any = {
  [Status.start]: {
    title: 'Processing your purchase',
    description: 'Sending transaction using your wallet.',
  },

  [Status.matchOrders]: {
    title: 'Processing',
    description: 'Sending transaction using your wallet.',
  },
  [Status.transactionCreated]: {
    title: 'Proof of Ownership',
    description: 'Transfering...',
  },
  [Status.transactionConfirmed]: {
    title: 'Transfer Complete',
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
      <S.Title>Purchasing</S.Title>
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
