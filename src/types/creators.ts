export interface User {
  name: string;
  username: string;
  bio: string;
  coverUrl: string;
  customUrl: string;
  ytUsername: string;
}

export interface Creator {
  id: number;
  address: string;
  profileImgUrl: string;
  user: User;
  isVerified: boolean;
}
