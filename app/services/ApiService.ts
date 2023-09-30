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

export async function fetchTeams() {
  const response = await instance.get('/teams');
  return response;
}

export async function submitTeam(data: any) {
  const response = await instance.post('/teams', data);
  return response;
}

export async function fetchProject(id: string) {
  const response = await instance.get(`/projects/${id}`);
  return response;
}

export async function submitSprint(data: any) {
  const response = await instance.post('/sprint', data);
  return response;
}

export async function fetchTasks(projectId: number) {
  const response = await instance.get(`/projects/${projectId}/task`);
  return response;
}

export async function submitTask(projectId: number, data: any) {
  const response = await instance.post(`/projects/${projectId}/task`, data);
  return response;
}
