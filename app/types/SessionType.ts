import { Session } from 'next-auth';

export interface SessionInterface extends Session {
  access_token: string;
  payload: {
    sub: number;
    username: string;
  };
}
