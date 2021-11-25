import api from 'api/index';
import { decamelizeKeys } from 'humps';
import { QueryFunctionContext, useQuery } from 'react-query';
import { Asset } from 'types/asset';
import { Creator } from 'types/creators';

const routes = {
  get basePath() {
    return '/creators';
  },
  creatorPath(id: number) {
    return [this.basePath, id].join('/');
  },
  assetsPath(id: number) {
    return [this.creatorPath(id), 'assets'].join('/');
  },
};

const creatorsApi = {
  async fetchCreators({ queryKey }: QueryFunctionContext) {
    const [, params] = queryKey;
    const { data } = await api.get<{ items: Creator[] }>(routes.basePath, {
      params: decamelizeKeys({
        ...(params as Record<string, unknown>),
      }),
    });
    return data.items;
  },
  async fetchCreator(id: number) {
    const { data } = await api.get<Creator>(routes.creatorPath(id));
    return data;
  },
  async fetchAssets(id: number) {
    const { data } = await api.get<{ items: Asset[] }>(routes.assetsPath(id));
    return data;
  },
};

export const useCreator = (id: number) =>
  useQuery(['creators', id], () => creatorsApi.fetchCreator(id));

export const useCreatorAssets = (id: number) =>
  useQuery(['creators', id, 'assets'], () => creatorsApi.fetchAssets(id));

export default creatorsApi;
