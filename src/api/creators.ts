import { QueryFunctionContext, useQuery } from 'react-query';
import api from 'api/index';
import { Creator } from 'types/creators';
import { decamelizeKeys } from 'humps';

const routes = {
  get basePath() {
    return '/creators';
  },
  creatorPath(id: string) {
    return [this.basePath, id].join('/');
  },
};

const creatorsApi = {
  async fetchCreators({ pageParam, queryKey }: QueryFunctionContext) {
    const [, params] = queryKey;
    const { data } = await api.get<{ items: Creator[] }>(routes.basePath, {
      params: decamelizeKeys({
        ...(params as Record<string, unknown>),
      }),
    });
    return data.items;
  },
  async fetchCreator(id: string) {
    const { data } = await api.get<Creator>(routes.creatorPath(id));
    return data;
  },
};

export const useCreator = (id: string) =>
  useQuery(['creators', id], () => creatorsApi.fetchCreator(id));

export default creatorsApi;
