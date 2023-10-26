import { getSession } from 'next-auth/react';
import { SessionInterface } from '../types/SessionType';

/**
 * @class UserUtil
 * @description A class that contains the user's token
 */

class UserUtil {
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}

async function getUserToken(): Promise<UserUtil> {
  try {
    const session = (await getSession()) as SessionInterface;

    if (session && session.access_token) {
      return new UserUtil(session.access_token as string);
    }

    throw new Error('Invalid session or missing access token');
  } catch (error: unknown | any) {
    throw new Error(error.message);
  }
}

export default getUserToken;
