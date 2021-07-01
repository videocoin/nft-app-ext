import api from './index';
import { AxiosRequestConfig } from 'axios';
import { Asset } from '../types/asset';
import { QueryFunctionContext, useQuery } from 'react-query';
import { decamelizeKeys } from 'humps';

const routes = {
  get basePath() {
    return '/assets';
  },
  get uploadPath() {
    return [this.basePath, 'upload'].join('/');
  },
  assetPath(assetId: number) {
    return [this.basePath, assetId].join('/');
  },
};

const assetsApi = {
  async fetchAssets({ queryKey }: QueryFunctionContext) {
    const [, params] = queryKey;
    const { data } = await api.get<{ items: Asset[] }>(routes.basePath, {
      params: decamelizeKeys({
        ...(params as Record<string, unknown>),
      }),
    });
    return data.items;
  },
  async upload(file: FormData, config: AxiosRequestConfig) {
    const { data } = await api.post<any>(routes.uploadPath, file, config);
    return data;
  },
  async createAsset(body: any) {
    const { data } = await api.post(routes.basePath, body);
    return data;
  },
  async fetchAsset(assetId: number) {
    const { data } = await api.get(routes.assetPath(assetId));
    return data;
  },
};

export const useAsset = (assetId: number) =>
  useQuery(['assets', assetId], () => assetsApi.fetchAsset(assetId));

export default assetsApi;
