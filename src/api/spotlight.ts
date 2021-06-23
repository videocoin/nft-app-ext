import api from './index';
import { useQuery } from 'react-query';
import { Asset } from '../types/asset';
import { Creator } from 'types/creators';

const routes = {
  get baseUrl() {
    return '/spotlight';
  },
  get featuredPath() {
    return [this.baseUrl, 'assets', 'featured'].join('/');
  },
  get livePath() {
    return [this.baseUrl, 'assets', 'live'].join('/');
  },
  get creatorsPath() {
    return [this.baseUrl, 'creators', 'featured'].join('/');
  },
};

const spotlightApi = {
  async fetchFeatured() {
    const { data } = await api.get<{ items: Asset[] }>(routes.featuredPath);
    return data.items;
  },
  async fetchLive() {
    const { data } = await api.get<{ items: Asset[] }>(routes.livePath);
    return data.items;
  },
  async fetchCreators() {
    const { data } = await api.get<{ items: Creator[] }>(routes.creatorsPath);
    return data.items;
  },
};

export const useFeatured = () =>
  useQuery(['spotlight', 'featured'], spotlightApi.fetchFeatured);
export const useLive = () =>
  useQuery(['spotlight', 'live'], spotlightApi.fetchLive);
export const useCreators = () =>
  useQuery(['spotlight', 'creators'], spotlightApi.fetchCreators);
