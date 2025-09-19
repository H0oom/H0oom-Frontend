import axiosClient from '@/shared/api/axiosClient';
import { CreateSessionRequest, CreateSessionResponse } from './types';
import { ServerMessage } from '../messagesSlice';

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
  getMessages: async (roomId: number): Promise<ServerMessage[]> => {
    const response = await axiosClient.get<ServerMessage[]>(
      `/chat/${roomId}/messages`,
    );
    return response.data;
  },
};
