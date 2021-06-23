import { Creator } from 'types/creators';

interface Collection {
  createdDate: string;
  devBuyerFeeBasisPoints: string;
  devSellerFeeBasisPoints: string;
  openseaBuyerFeeBasisPoints: string;
  openseaSellerFeeBasisPoints: string;
}

export interface Asset {
  id: number;
  name: string;
  description: string;
  owner: Creator;
  creator: Creator;
  contentType: string;
  thumbnailUrl: string;
  previewUrl: string;
  status: string;
  tokenId: string;
  url: string;
  ytVideoId: string;
  drmKey: string;
  encryptedUrl: string;
  ipfsEncryptedUrl: string;
  ipfsThumbnailUrl: string;
  ipfsUrl: string;
  collection: Collection;
  instantSalePrice: string;
  sold: boolean;
}
