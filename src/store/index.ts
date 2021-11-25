import { createContext, useContext } from 'react';
import MetamaskStore from 'store/metamask';
import ModalStore from 'store/modal';

export class RootStore {
  modalsStore: ModalStore;
  metamaskStore: MetamaskStore;

  constructor() {
    this.modalsStore = new ModalStore();
    this.metamaskStore = new MetamaskStore();
  }
}

export const StoreContext = createContext<RootStore>({} as RootStore);
export const useStores = (): RootStore => useContext(StoreContext);
export const useStore = <T extends keyof RootStore>(store: T): RootStore[T] =>
  useContext(StoreContext)[store];
