export interface User {
  name: string;
  username: string;
}

export interface Creator {
  id: number;
  address: string;
  profileImgUrl: string;
  user: User;
  isVerified: boolean;
}
