import { User } from '@prisma/client';

export interface ILoginResponse {
  accessToken: string;
  isNewUser: boolean;
  user: User;
}
