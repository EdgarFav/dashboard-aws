import { apiClient } from '../../config/axios-config';

export const loginMethod = async (email: string, password: string) =>
  await apiClient.post('auth/login', { email, password });
