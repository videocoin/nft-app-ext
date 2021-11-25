import { setTokenHeader } from 'api';
import authApi from 'api/auth';
import jwtDecode from 'jwt-decode';
import { flow, makeAutoObservable, observable } from 'mobx';
import { Network, OpenSeaPort } from 'opensea-js';
import { FungibleToken } from 'opensea-js/lib/types';
import { TokenBalance } from 'types/balance';

import { BigNumberish } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';

declare global {
  interface Window {
    ethereum: any;
  }
}

class MetamaskStore {
  constructor() {
    makeAutoObservable(this, {
      tokens: observable.ref,
      paymentTokens: observable.ref,
      paymentTokenBalances: observable.ref,
    });
    this.checkMetaMask();
  }
  isMetamaskInstalled = false;
  vidBalance: BigNumberish = 0;
  ethBalance: BigNumberish = 0;
  tokens: Contract[] = [];
  account = '';
  openSea: OpenSeaPort | null = null;
  isAuth = false;
  isLoading = true;
  paymentTokens: FungibleToken[] = [];
  paymentTokenBalances: TokenBalance[] = [];

  setAuth = (isAuth: boolean) => (this.isAuth = isAuth);
  setLoading = (isLoading: boolean) => (this.isLoading = isLoading);

  setTokens = (tokens: Contract[]) => {
    this.tokens = tokens;
  };
  setAccount = (account: string) => {
    this.account = account;
  };
  setVidBalance = (balance: BigNumberish) => {
    this.vidBalance = balance;
  };
  setEthBalance = (balance: BigNumberish) => {
    this.ethBalance = balance;
  };
  setOpenSea = (openSea: OpenSeaPort) => (this.openSea = openSea);
  setPaymentTokens = (tokens: FungibleToken[]) => {
    this.paymentTokens = tokens;
  };
  setPaymentTokenBalances = (balances: TokenBalance[]) => {
    this.paymentTokenBalances = balances;
  };
  checkMetaMask = () => {
    if (typeof window.ethereum !== 'undefined') {
      this.isMetamaskInstalled = true;
    }
  };

  auth = flow(function* (this: MetamaskStore, library: any, cb?: () => void) {
    if (!this.account) {
      this.setLoading(false);
      return;
    }
    const authToken = localStorage.getItem('token');
    const storedAccount = localStorage.getItem('account');
    if (authToken && storedAccount === this.account) {
      const decoded = jwtDecode(authToken) as any;
      const isExp = decoded.exp * 1000 <= Date.now();
      this.setAuth(true);
      this.setLoading(false);
      if (!isExp) {
        this.updateOpenSea(library);
        this.setLoading(false);
        return;
      }
    }
    let res;
    try {
      res = yield authApi.getNonce(this.account);
    } catch {
      const epk = yield this.getEncryptionPublicKey(this.account);
      res = yield authApi.signup(this.account, epk);
      this.setLoading(false);
    }
    try {
      const signature = yield library
        .getSigner(this.account)
        .signMessage(res.nonce);
      const { token } = yield authApi.auth(this.account, signature);
      this.setAuth(true);
      localStorage.setItem('token', token);
      localStorage.setItem('account', this.account);
      setTokenHeader(token);
      this.updateOpenSea(library);
      cb && cb();
    } finally {
      this.setLoading(false);
    }
  }).bind(this);

  getEncryptionPublicKey = (account: string) =>
    window.ethereum.request({
      method: 'eth_getEncryptionPublicKey',
      params: [account],
    });

  updateOpenSea = async (library: any) => {
    const token = localStorage.getItem('token') || '';
    const openSeaPort = new OpenSeaPort(library.provider, {
      networkName: Network.Custom,
      authToken: token,
    } as any);

    try {
      const { tokens } = await openSeaPort.api.getPaymentTokens();
      this.setPaymentTokens(tokens);
    } catch (err) {
      console.log(err);
    }
    this.setOpenSea(openSeaPort);
  };
}

export default MetamaskStore;
