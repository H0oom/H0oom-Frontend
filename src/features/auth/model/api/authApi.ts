import axiosClient from '@/shared/api/axiosClient';
import { AuthResponse, SigninRequest, SignupRequest } from './types';


export const authApi = {
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },

  signin: async (data: SigninRequest): Promise<AuthResponse> => {
    const response = await axiosClient.post<AuthResponse>('/auth/signin', data);
    return response.data;
  },
};
