import { useWeb3React } from '@web3-react/core';
import { connectorName, connectorsByName } from 'lib/connectors';

function useConnectWallet() {
  const { activate } = useWeb3React();
  return () => activate(connectorsByName[connectorName]);
}

export default useConnectWallet;
