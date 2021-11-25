import { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';
import { Media } from 'types/media';

import api from './index';

const routes = {
  get basePath() {
    return '/media';
  },
  get uploadPath() {
    return [this.basePath, 'upload'].join('/');
  },
  mediaPath(mediaId: number) {
    return [this.basePath, mediaId].join('/');
  },
};

const mediaApi = {
  async upload(file: FormData, config: AxiosRequestConfig) {
    const { data } = await api.post<any>(routes.uploadPath, file, config);
    return data;
  },
  async fetchMedia(mediaId: number) {
    const { data } = await api.get<Media>(routes.mediaPath(mediaId));
    return data;
  },
};

export const useMedia = (mediaId: number) =>
  useQuery(['media', mediaId], () => mediaApi.fetchMedia(mediaId));

export default mediaApi;
