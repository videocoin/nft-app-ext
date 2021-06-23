export interface Account {
  id: number;
  address: string;
  user: {
    username: string;
    name: string;
    customUrl: string;
    coverUrl: string;
    bio: string;
  };
  profileImgUrl: string;
}
