import React from 'react';
import View from 'components/UI/View';
import Spinner from 'components/UI/Spinner';
import * as S from './styles';

export enum Status {
  init,
  start,
  approveAllAssets,
  approveAsset,
  approveCurrency,
  createOrder,
  orderDenied,
  approveOrder,
  transactionCreated,
  transactionConfirmed,
  transferred,
  error,
  complete,
}

const statuses: any = {
  [Status.start]: {
    title: 'Processing your request',
    description: 'Connecting to your wallet.',
  },

  [Status.approveAllAssets]: {
    title: 'Processing your request',
    description: 'Aproving assets.',
  },
  [Status.approveAsset]: {
    title: 'Processing your request',
    description: 'Aproving asset.',
  },
  [Status.approveCurrency]: {
    title: 'Processing your request',
    description: 'Aproving currency.',
  },
  [Status.createOrder]: {
    title: 'Processing your request',
    description: 'Creating order.',
  },
  [Status.approveOrder]: {
    title: 'Processing your request',
    description: 'Sending order.',
  },
  [Status.transactionCreated]: {
    title: 'Processing your request',
    description: 'Transaction created',
  },
  [Status.transactionConfirmed]: {
    title: 'Processing your request',
    description: 'Transaction confirmed',
  },
  [Status.complete]: {
    title: 'Processing your request',
    description: 'Done',
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
      <S.Title>Puting on sale</S.Title>
      <View row centerV>
        {status !== Status.error && status !== Status.complete && (
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
