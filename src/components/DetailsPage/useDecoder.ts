import { useCallback } from 'react';
import { useStore } from 'store';

const useDecoder = (drmKey: string) => {
  const { account } = useStore('metamaskStore');

  return useCallback(
    () =>
      window.ethereum.request({
        method: 'eth_decrypt',
        params: [drmKey, account],
      }),
    [account, drmKey]
  );
};

export default useDecoder;
