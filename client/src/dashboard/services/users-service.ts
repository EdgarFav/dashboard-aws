import { apiClient } from '../../config/axios-config';

export const createUserMethod = async (email: string, password: string) => {
  return await apiClient.post('users', { email, password });
};

export const getUsersMethod = async () => {
  return await apiClient.get('users');
};
