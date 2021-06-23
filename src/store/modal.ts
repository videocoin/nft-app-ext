import { makeAutoObservable, observable } from 'mobx';

class ModalStore {
  constructor() {
    makeAutoObservable(this);
  }

  modals = observable.map<string, Record<string, unknown>>({}, { deep: false });

  openModal = (type: string, modalProps: Record<string, unknown> = {}) => {
    this.modals.set(type, modalProps);
  };

  closeModal = (type: string) => {
    this.modals.delete(type);
  };
}

export default ModalStore;
