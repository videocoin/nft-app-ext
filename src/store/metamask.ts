import { makeAutoObservable } from 'mobx';
import { BigNumberish } from '@ethersproject/bignumber';
import authApi from 'api/auth';
import { OpenSeaPort } from 'opensea-js';

declare global {
  interface Window {
    ethereum: any;
  }
}

class MetamaskStore {
  constructor() {
    makeAutoObservable(this);
    this.checkMetaMask();
  }
  isMetamaskInstalled = false;
  vidBalance: BigNumberish = 0;
  ethBalance: BigNumberish = 0;
  token: any = null;
  account = '';
  openSea: OpenSeaPort | null = null;

  setToken = (token: any) => {
    this.token = token;
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
  checkMetaMask = () => {
    if (typeof window.ethereum !== 'undefined') {
      this.isMetamaskInstalled = true;
    }
  };
  reset = () => {
    this.account = '';
    this.token = null;
    this.openSea = null;
    this.vidBalance = 0;
    this.ethBalance = 0;
  };
}

export default MetamaskStore;
