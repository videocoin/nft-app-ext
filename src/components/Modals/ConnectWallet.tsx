import Button from 'components/UI/Button';
import View from 'components/UI/View';
import useConnectWallet from 'hooks/useConnectWallet';
import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import { useQueryClient } from 'react-query';
import { useStore } from 'store';

import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';

import * as S from './styles';

const ConnectWallet = observer(() => {
  const { closeModal, modals } = useStore('modalsStore');
  const { account, library } = useWeb3React();
  const { auth } = useStore('metamaskStore');
  const onClose = () => closeModal('connectWallet');
  const connectWallet = useConnectWallet();
  const client = useQueryClient();
  const modal = useRef(modals.get('connectWallet') as any);
  const refetch = () => {
    client.invalidateQueries('profile');
    onClose();
    modal.current.cb();
  };
  const handleAuth = () => auth(library, refetch);
  const handleConnect = async () => {
    await connectWallet();
    await handleAuth();
  };
  return (
    <ModalContent>
      <ModalHeader>
        <S.Title>Connect wallet</S.Title>
      </ModalHeader>
      <ModalBody>
        <S.Description>
          You need to connect your wallet first to sign messages and send
          transaction to Videocoin network.
        </S.Description>
        <View marginT={30} column>
          {account ? (
            <Button onClick={handleAuth}>Sign in</Button>
          ) : (
            <Button onClick={handleConnect}>Connect Wallet</Button>
          )}
        </View>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} theme="secondary">
          Cancel
        </Button>
      </ModalFooter>
    </ModalContent>
  );
});

export default ConnectWallet;
