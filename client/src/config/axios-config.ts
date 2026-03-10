import axios from 'axios';

export const apiClient = axios.create({
  timeout: 10000,
  baseURL: import.meta.env.VITE_API_BACKEND,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Solo setear Content-Type si no es FormData (para uploads)
    if (!config.data || !(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
