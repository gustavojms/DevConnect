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

export async function deleteTeam(teamId: number) {
  return fetchData<any>({
    method: 'DELETE',
    url: `/teams/${teamId}`,
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

export async function fetchOneUser(userId: number) {
  return fetchData<any>({
    method: 'GET',
    url: `/user/${userId}`,
  });
}

export async function updateUser(data: any) {
  return fetchData<any>({
    method: 'PATCH',
    url: `/user/${data.userId}`,
    data,
  });
}

export async function deleteUser(userId: number) {
  return fetchData<any>({
    method: 'DELETE',
    url: `/user/${userId}`,
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
    url: `/task/${taskId}`,
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

export async function fetchTeamMembers(teamId: number) {
  return fetchData<any>({
    method: 'GET',
    url: `/teams/${teamId}/members`,
  });
}

export async function updateTeamMembers(teamId: number, data: any) {
  return fetchData<any>({
    method: 'POST',
    url: `/teams/${teamId}/members/update`,
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

export async function getAllProjectsPublic() {
  return fetchData<any>({
    method: 'GET',
    url: '/projects/public',
  });
}

export async function updateTeam(teamId: number, data: any) {
  return fetchData<any>({
    method: 'PATCH',
    url: `/teams/${teamId}`,
    data,
  });
}

export async function findAllTeams() {
  return fetchData<any>({
    method: 'GET',
    url: '/teams',
  });
}

export async function getAllPosts() {
  return fetchData<any>({
    method: 'GET',
    url: '/posts',
  });
}

export async function criaPost(data: any) {
  return fetchData<any>({
    method: 'POST',
    url: '/posts',
    data,
  });
}

export default function getPostById(postId: number) {
  return fetchData<any>({
    method: 'GET',
    url: `/posts/${postId}`,
  });
}

export async function getAllTaskByUser(userId: number) {
  return fetchData<any>({
    method: 'GET',
    url: `/task/user/${userId}`,
  });
}

export async function createPostComment(data: any) {
  return fetchData<any>({
    method: 'POST',
    url: `/posts/${data.postId}/comments`,
    data,
  });
}

export async function getPostComment(postId: number) {
  return fetchData<any>({
    method: 'GET',
    url: `/posts/${postId}/comments`,
  });
}

export async function deletePostComment(postId: number, commentId: number) {
  return fetchData<any>({
    method: 'DELETE',
    url: `/posts/${postId}/comments/${commentId}`,
  });
}

export async function addLike(postId: number) {
  return fetchData<any>({
    method: 'POST',
    url: `/posts/${postId}/likes`,
  });
}

export async function findFinalizedTaskByProject(projectId: number) {
  return fetchData<any>({
    method: 'GET',
    url: `/task/project/${projectId}`,
  });
}
