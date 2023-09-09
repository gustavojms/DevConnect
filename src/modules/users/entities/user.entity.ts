import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  username: string;
  email: string;
  password: string;
  photoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
