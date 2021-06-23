import api from 'api/index';
import { Account } from 'types/account';
import { useQuery } from 'react-query';

const routes = {
  get basePath() {
    return '/account';
  },
};

const accountApi = {
  async fetchAccount() {
    const { data } = await api.get<Account>(routes.basePath);
    return data;
  },
  async updateAccount(
    body: Partial<{
      bio: string;
      name: string;
      imageData: string;
      coverData: string;
    }>
  ) {
    const { data } = await api.put<Account>(routes.basePath, body);
    return data;
  },
};

export const useProfile = () =>
  useQuery('profile', accountApi.fetchAccount, {
    staleTime: Infinity,
    retry: 0,
  });

export default accountApi;
