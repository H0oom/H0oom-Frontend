import axios from 'axios';
import { getAccessToken } from './tokenService';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  const url = config.url || '';
  const isAuthPath = url.includes('/auth') || url.startsWith('/auth');

  if (token && !isAuthPath) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
