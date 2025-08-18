import axiosClient from '@/shared/api/axiosClient';
import { User } from '../../types';

export const userApi = {
  getUser: async (): Promise<User[]> => {
    const response = await axiosClient.get('/users');
    return response.data;
  },
};
