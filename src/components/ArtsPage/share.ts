export enum Tab {
  liveAuctions,
  reserve,
  sold,
}

export const tabs = [
  {
    id: Tab.liveAuctions,
    name: 'Live auctions',
  },
  {
    id: Tab.reserve,
    name: 'Reserve not met',
  },
  {
    id: Tab.sold,
    name: 'Sold',
  },
];
