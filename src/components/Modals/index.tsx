import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';
import FadeModal from 'components/UI/FadeModal';
import ConnectWallet from './ConnectWallet';
import PlaceBid from './PlaceBid';
import Checkout from 'components/Modals/Checkout';

const Modals = () => {
  const { modals } = useStore('modalsStore');
  return (
    <div>
      <FadeModal isOpen={modals.has('connectWallet')}>
        <ConnectWallet />
      </FadeModal>
      <FadeModal isOpen={modals.has('placeBid')}>
        <PlaceBid />
      </FadeModal>
      <FadeModal isOpen={modals.has('checkout')}>
        <Checkout />
      </FadeModal>
    </div>
  );
};

export default observer(Modals);
