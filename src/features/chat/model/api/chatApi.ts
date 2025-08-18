import axiosClient from '@/shared/api/axiosClient';
import { CreateSessionRequest, CreateSessionResponse } from './types';

export const chatApi = {
  createSession: async (
    data: CreateSessionRequest,
  ): Promise<CreateSessionResponse> => {
    const response = await axiosClient.post<CreateSessionResponse>(
      '/chat/session',
      data,
    );
    return response.data;
  },
  getMessages: async (roomId: number): Promise<unknown[]> => {
    const response = await axiosClient.get<unknown[]>(
      `/chat/${roomId}/messages`,
    );
    return response.data;
  },
};
