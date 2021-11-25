import { Creator } from 'types/creators';

export type MediaType = 'image' | 'video' | 'audio' | 'application';

export interface Media {
  id: string;
  creator: Creator;
  featured: boolean;
  contentType: string;
  mediaType: MediaType;
  url: string;
  itemId: string;
  status: string;
  thumbnailUrl: string;
  name: string;
  size: number;
  duration: number;
}
