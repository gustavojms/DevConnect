import axios from 'axios';
import { getSession } from 'next-auth/react';
import { SessionInterface } from '../types/SessionType';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(async (config) => {
  const session = (await getSession()) as SessionInterface;
  if (session && session.access_token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

export async function submitData(data: any) {
  const response = await instance.post('/auth/register', data);
  return response;
}

export async function fetchProjects() {
  const response = await instance.get('/projects');
  return response;
}
