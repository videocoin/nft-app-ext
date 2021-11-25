import { FungibleToken } from 'opensea-js/lib/types';
import { Creator } from 'types/creators';
import { Media } from 'types/media';

interface Collection {
  createdDate: string;
  devBuyerFeeBasisPoints: string;
  devSellerFeeBasisPoints: string;
  openseaBuyerFeeBasisPoints: string;
  openseaSellerFeeBasisPoints: string;
}

interface AssetContract {
  address: string;
  assetContractType: string;
  buyerFeeBasisPoints: number;
  description: string;
  devBuyerFeeBasisPoints: number;
  devSellerFeeBasisPoints: number;
  name: string;
  openseaBuyerFeeBasisPoints: number;
  openseaSellerFeeBasisPoints: number;
  schema_name: string;
  sellerFeeBasisPoints: number;
  symbol: string;
}

export interface Asset {
  assetContract: AssetContract;
  collection: Collection;
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
  tokenUrl: string;
  url: string;
  ytVideoId: string;
  drmKey: string;
  encryptedUrl: string;
  ipfsEncryptedUrl: string;
  ipfsThumbnailUrl: string;
  ipfsUrl: string;
  instantSalePrice: number;
  putOnSalePrice: number;
  sold: boolean;
  onSale: boolean;
  media: Media[];
  locked: boolean;
  auction: Auction;
  isAuction: boolean;
  token?: FungibleToken;
}

export interface Auction {
  isOpen: boolean;
  currentBid: number;
  duration: number;
  startedAt: string;
  paymentTokenAddress: string;
}
