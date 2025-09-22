import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { chatApi, CreateSessionRequest, CreateSessionResponse } from '../api';
import { setRoomId } from '../chatSlice';

import { setMessages } from '../messagesSlice';

export const useCreateChatSession = () => {
  const dispatch = useDispatch();

  return useMutation<CreateSessionResponse, Error, CreateSessionRequest>({
    mutationFn: (data: CreateSessionRequest) => chatApi.createSession(data),
    onSuccess: async (data) => {
      dispatch(setRoomId(data.room_id));

      try {
        const serverMessages = await chatApi.getMessages(data.room_id);
        dispatch(setMessages(serverMessages));
      } catch {
        toast.error('기존 채팅 데이터를 불러오지 못했습니다.');
      }
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
