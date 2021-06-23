import api from './index';

const routes = {
  signupPath() {
    return 'accounts';
  },
  noncePath(address: string) {
    return [this.signupPath(), address, 'nonce'].join('/');
  },
  authPath() {
    return 'auth';
  },
};

const authApi = {
  async getNonce(address: string) {
    const { data } = await api.get(routes.noncePath(address));
    return data;
  },
  async signup(address: string) {
    const { data } = await api.post(routes.signupPath(), { address });
    return data;
  },
  async auth(address: string, signature: string) {
    const { data } = await api.post('/auth', { address, signature });
    return data;
  },
};

export default authApi;
