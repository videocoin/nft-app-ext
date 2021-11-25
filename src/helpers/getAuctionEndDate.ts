import { Auction } from 'types/asset';

function getAuctionEndDate(auction: Auction): number {
  return new Date(auction.startedAt).getTime() + auction.duration * 1000;
}

export default getAuctionEndDate;
