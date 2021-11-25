import { useProfile } from 'api/account';
import Avatar from 'components/Avatar';
import ProfilePopup from 'components/Header/ProfileBlock/ProfilePopup';
import Button from 'components/UI/Button';
import Spinner from 'components/UI/Spinner';
import View from 'components/UI/View';
import contractToken from 'contract/token.json';
import cutString from 'helpers/cutString';
import useConnectWallet from 'hooks/useConnectWallet';
import contract from 'lib/contract';
import { toFixedNoRound } from 'lib/utils';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { useInterval, useToggle } from 'react-use';
import { useStore } from 'store';
import { Account } from 'types/account';
import { TokenBalance } from 'types/balance';

import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';

import * as S from './styles';
import { COIN } from 'const';

import { BigNumberish } from '@ethersproject/bignumber';
import { FungibleToken } from 'opensea-js/lib/types';
import { map } from 'lodash/fp';

const BALANCE_FETCH_INTERVAL = 3000;

const ProfileBlock = () => {
  const {
    ethBalance,
    tokens,
    setEthBalance,
    setAccount,
    setTokens,
    setPaymentTokenBalances,
    isMetamaskInstalled,
    auth,
    setLoading,
    paymentTokens,
    paymentTokenBalances,
  } = useStore('metamaskStore');
  const [isOpen, toggle] = useToggle(false);
  const {
    data: profile,
    isFetching,
    isFetchedAfterMount,
    refetch,
  } = useProfile();

  const connectWallet = useConnectWallet();
  const { account, library, chainId } = useWeb3React();
  const cutAddress = cutString(account, 5, 4);
  const getTokenBalances = useCallback(async () => {
    try {
      const balances: TokenBalance[] = [];
      for (const token of tokens) {
        const balance: BigNumberish = await token.balanceOf(account);
        const symbol: string = await token.symbol();
        balances.push({ symbol, balance });
      }
      setPaymentTokenBalances(balances);
    } catch (e) {
      setPaymentTokenBalances([]);
    }
  }, [account, setPaymentTokenBalances, tokens]);

  const getEthBalance = useCallback(async () => {
    try {
      const newBalance = await library.getBalance(account);
      setEthBalance(newBalance);
    } catch (e) {
      setEthBalance(0);
    }
  }, [account, library, setEthBalance]);
  const getBalance = useCallback(async () => {
    if (!account || !library || !tokens || !chainId) return;
    getTokenBalances();
    getEthBalance();
  }, [account, chainId, getEthBalance, getTokenBalances, library, tokens]);

  const handleAuth = useCallback(
    () => auth(library, refetch),
    [auth, library, refetch]
  );

  useEffect(() => {
    if (!library || !chainId) {
      setLoading(false);
      return;
    }
    const { abi } = contractToken;
    const tokens = paymentTokens.map((token: FungibleToken) =>
      contract(token.address, abi, library)
    );
    setTokens(tokens);
    setAccount(account as string);
    handleAuth();
  }, [account, chainId, handleAuth, library, setAccount, setLoading]);
  useEffect(() => {
    getBalance();
  }, [getBalance]);

  useInterval(getBalance, BALANCE_FETCH_INTERVAL);
  const formattedEthBalance = toFixedNoRound(formatEther(ethBalance), 2);

  const renderMetaMaskData = () => {
    if (isFetching && !isFetchedAfterMount) {
      return (
        <div>
          <Spinner size="sm" />
        </div>
      );
    }
    if (!isMetamaskInstalled) {
      return <div>Not installed</div>;
    }
    if (account && profile) {
      const data: {
        balance: string;
        address: string;
        tokens: any;
      } & Account = {
        balance: formattedEthBalance,
        tokens: map(({ balance, symbol }) => {
          return {
            symbol: symbol,
            balance: toFixedNoRound(formatEther(balance), 2),
          };
        }, paymentTokenBalances),
        ...profile,
      };
      return (
        <S.ProfileBlock>
          <View row onClick={toggle}>
            <Avatar name={profile?.address} src={profile?.profileImgUrl} />
            <View marginL={10} marginR={50}>
              <S.Balance>
                {formattedEthBalance} {COIN}
              </S.Balance>
              <div>{cutAddress}</div>
            </View>
          </View>
          <S.UploadBtn to="/upload">+</S.UploadBtn>
          <ProfilePopup isOpen={isOpen} onClose={toggle} data={data} />
        </S.ProfileBlock>
      );
    }
    if (account) {
      return <Button onClick={handleAuth}>Sign in</Button>;
    }
    return <Button onClick={connectWallet}>Connect Wallet</Button>;
  };
  return renderMetaMaskData();
};

export default observer(ProfileBlock);
