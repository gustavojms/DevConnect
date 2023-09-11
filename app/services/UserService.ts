import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default async function submitData(data: any) {
  const response = await instance.post('/users', data);
  return response;
}
