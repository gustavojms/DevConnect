import axios from 'axios';
import { getSession } from 'next-auth/react';
import { SessionInterface } from '../types/SessionType';
import { TaskType } from '../types/TaskType';

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

export async function fetchProjects(userId: number) {
  const response = await instance.get(`/projects/members/${userId}`);
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

export async function fetchTask(taskId: number) {
  const response = await instance.get(`/task/${taskId}`);
  return response;
}

export async function getUser() {
  const response = await instance.get('/user');
  return response;
}

export async function fetchUsersOfProject(projectId: number) {
  const response = await instance.get(`/projects/${projectId}/members`);
  return response;
}

export async function submitTask(projectId: number, data: Partial<TaskType>) {
  const response = await instance.post(`/projects/${projectId}/task`, data);
  return response;
}

export async function updateTaskStatus(taskId: number, status: string) {
  const response = await instance.patch(`/task/${taskId}`, {
    status,
  });
  return response;
}

export async function updateTask(taskId: number, data: any) {
  const response = await instance.patch(`/task/${taskId}`, data);
  return response;
}

export async function submitTeamMember(teamId: number, data: any) {
  const response = await instance.post(`/teams/${teamId}/members/`, data);
  return response;
}

export async function submitProject(data: any) {
  const response = await instance.post('/projects', data);
  return response;
}
