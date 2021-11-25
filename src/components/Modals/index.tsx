import Checkout from 'components/Modals/Checkout';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from 'store';

import { Modal, ModalOverlay } from '@chakra-ui/react';

import AcceptBid from './AcceptBid';
import ConnectWallet from './ConnectWallet';
import PlaceBid from './PlaceBid';
import PutOnSale from './PutOnSale';

const Modals = () => {
  const { modals, closeModal } = useStore('modalsStore');
  const closeConnectWallet = () => {
    closeModal('connectWallet');
  };
  const closePlaceBid = () => {
    closeModal('placeBid');
  };
  const closeCheckout = () => {
    closeModal('checkout');
  };
  const closePutOnSale = () => {
    closeModal('putOnSale');
  };
  const closeAcceptBid = () => {
    closeModal('acceptBid');
  };
  return (
    <div>
      <Modal onClose={closeConnectWallet} isOpen={modals.has('connectWallet')}>
        <ModalOverlay />
        <ConnectWallet />
      </Modal>
      <Modal size="lg" onClose={closePlaceBid} isOpen={modals.has('placeBid')}>
        <ModalOverlay />
        <PlaceBid />
      </Modal>
      <Modal onClose={closeCheckout} isOpen={modals.has('checkout')}>
        <ModalOverlay />
        <Checkout />
      </Modal>
      <Modal
        size="lg"
        onClose={closePutOnSale}
        isOpen={modals.has('putOnSale')}
      >
        <ModalOverlay />
        <PutOnSale />
      </Modal>
      <Modal onClose={closeAcceptBid} isOpen={modals.has('acceptBid')}>
        <ModalOverlay />
        <AcceptBid />
      </Modal>
    </div>
  );
};

export default observer(Modals);
