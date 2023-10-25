import axios, { AxiosRequestConfig } from 'axios';
import { TaskType } from '../types/TaskType';
import getUserToken from '../utils/SessionUtil';
import { RequestMethod } from '../types/RequestMethod';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

async function fetchData<T>(
  params: RequestMethod,
  includeAuth: boolean = true,
): Promise<T> {
  const axiosConfig: AxiosRequestConfig = {
    method: params.method,
    url: params.url,
    data: params.data,
  };

  if (includeAuth) {
    const session = await getUserToken();
    axiosConfig.headers = {
      Authorization: `Bearer ${session.token}`,
    };
  }

  const response = await instance.request<T>(axiosConfig);

  return response.data;
}

export async function submitData(data: any) {
  return fetchData<any>(
    {
      method: 'POST',
      url: '/auth/register',
      data,
    },
    false,
  );
}

export async function fetchProjects(userId: number) {
  return fetchData<any>({
    method: 'GET',
    url: `/projects/members/${userId}`,
  });
}

export async function fetchTeams() {
  return fetchData<any>({
    method: 'GET',
    url: '/teams',
  });
}

export async function submitTeam(data: any) {
  return fetchData<any>({
    method: 'POST',
    url: '/teams',
    data,
  });
}

export async function fetchProject(id: string) {
  return fetchData<any>({
    method: 'GET',
    url: `/projects/${id}`,
  });
}

export async function submitSprint(data: any) {
  return fetchData<any>({
    method: 'POST',
    url: '/sprint',
    data,
  });
}

export async function fetchTask(taskId: number) {
  return fetchData<TaskType>({
    method: 'GET',
    url: `/task/${taskId}`,
  });
}

export async function fetchTasks(projectId: number) {
  return fetchData<any>({
    method: 'GET',
    url: `/projects/${projectId}/task`,
  });
}

export async function getUser() {
  return fetchData<any>({
    method: 'GET',
    url: '/user',
  });
}

export async function fetchUsersOfProject(projectId: number) {
  return fetchData<any>({
    method: 'GET',
    url: `/projects/${projectId}/members`,
  });
}

export async function submitTask(projectId: number, data: Partial<TaskType>) {
  return fetchData<any>({
    method: 'POST',
    url: `/projects/${projectId}/task`,
    data,
  });
}

export async function updateTaskStatus(taskId: number, status: string) {
  return fetchData<any>({
    method: 'PATCH',
    url: `/task/${taskId}/status`,
    data: {
      status,
    },
  });
}

export async function updateTask(taskId: number, data: any) {
  return fetchData<any>({
    method: 'PATCH',
    url: `/task/${taskId}`,
    data,
  });
}

export async function submitTeamMember(teamId: number, data: any) {
  return fetchData<any>({
    method: 'POST',
    url: `/teams/${teamId}/members`,
    data,
  });
}

export async function submitProject(data: any) {
  return fetchData<any>({
    method: 'POST',
    url: '/projects',
    data,
  });
}

export async function fetchRoles() {
  return fetchData<any>({
    method: 'GET',
    url: '/roles',
  });
}

export async function submitRole(data: any) {
  return fetchData<any>({
    method: 'POST',
    url: '/roles',
    data,
  });
}

export async function getAllProjects() {
  return fetchData<any>({
    method: 'GET',
    url: '/projects',
  });
}
