import { apiClient } from '../../config/axios-config';

export interface User {
  id: number;
  email: string;
  role: string;
  createdAt: string;
  lastLogin: string | null;
}

export const createUserMethod = async (
  email: string,
  password: string,
  role: string = 'user'
) => {
  return await apiClient.post('users', { email, password, role });
};

export const getUsersMethod = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('users');
  return response.data;
};

export const deleteUserMethod = async (id: number) => {
  return await apiClient.delete(`users/${id}`);
};
