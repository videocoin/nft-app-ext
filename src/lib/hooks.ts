import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';
import { injected } from './connectors';

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate]);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React();
  const handleConnect = useCallback(() => {
    activate(injected);
  }, [activate]);
  const handleChainChanged = useCallback(() => {
    activate(injected);
  }, [activate]);
  const handleAccountsChanged = useCallback(
    (accounts: string[]) => {
      if (accounts.length > 0) {
        activate(injected);
      }
    },
    [activate]
  );
  const handleNetworkChanged = useCallback(() => {
    activate(injected);
  }, [activate]);
  useEffect((): any => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
  }, [
    active,
    error,
    suppress,
    activate,
    handleConnect,
    handleChainChanged,
    handleAccountsChanged,
    handleNetworkChanged,
  ]);
}
