import React from 'react';
import Modal from 'components/UI/Modal';
import * as S from './styles';
import { useStore } from 'store';
import Button from 'components/UI/Button';
import View from 'components/UI/View';
import useConnectWallet from 'hooks/useConnectWallet';

const ConnectWallet = () => {
  const { closeModal } = useStore('modalsStore');
  const onClose = () => closeModal('connectWallet');
  const connectWallet = useConnectWallet();
  return (
    <Modal onClose={onClose}>
      <S.Title>Connect wallet</S.Title>
      <S.Description>
        You need to connect your wallet first to sign messages and send
        transaction to Videocoin network.
      </S.Description>
      <View marginT={30} column>
        <Button onClick={connectWallet}>Connect</Button>
      </View>
      <View marginT={10} column>
        <Button onClick={onClose} theme="secondary">
          Cancel
        </Button>
      </View>
    </Modal>
  );
};

export default ConnectWallet;
