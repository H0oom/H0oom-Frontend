import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { chatApi, CreateSessionRequest, CreateSessionResponse } from '../api';
import { setRoomId } from '../chatSlice';
import { initSocket } from '../initSocket';

export const useCreateChatSession = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<CreateSessionResponse, Error, CreateSessionRequest>({
    mutationFn: (data: CreateSessionRequest) => chatApi.createSession(data),
    onSuccess: async (data) => {
      dispatch(setRoomId(data.room_id));

      initSocket(data.room_id);

      try {
        await queryClient.prefetchQuery({
          queryKey: ['chat', data.room_id, 'messages'],
          queryFn: () => chatApi.getMessages(data.room_id),
        });

        toast.success('채팅 세션 시작, 기존 메시지 불러왔습니다.', {
          toastId: 'chat-session-start',
        });
      } catch {
        toast.error('기존 채팅 데이터를 불러오지 못했습니다.');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
