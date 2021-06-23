import { makeAutoObservable, observable } from 'mobx';
import { Asset } from 'types/asset';
import { createContext, useContext } from 'react';

class UploadStore {
  constructor() {
    makeAutoObservable(this, {
      asset: observable.ref,
    });
  }

  asset: Asset | null = null;
  name: string = '';

  setAsset = (asset: Asset) => {
    this.asset = asset;
  };
  setName = (name: string) => (this.name = name);
}

export default UploadStore;

export const StoreContext = createContext<UploadStore>({} as UploadStore);
export const useStore = (): UploadStore => useContext(StoreContext);
