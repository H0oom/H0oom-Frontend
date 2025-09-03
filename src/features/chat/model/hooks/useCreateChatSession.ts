import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { chatApi } from '../api/chatApi';
import { CreateSessionRequest, CreateSessionResponse } from '../api/types';

export const useCreateChatSession = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<CreateSessionResponse, Error, CreateSessionRequest>({
    mutationFn: (data: CreateSessionRequest) => chatApi.createSession(data),
    onSuccess: async (data) => {
      try {
        await queryClient.prefetchQuery({
          queryKey: ['chat', data.room_id, 'messages'],
          queryFn: () => chatApi.getMessages(data.room_id),
        });
        if (!toast.isActive('chat-session-start')) {
          toast.success(
            '채팅 세션이 시작되었습니다. 기존 메시지를 불러왔어요.',
            {
              toastId: 'chat-session-start',
            },
          );
        }
      } catch (e) {
        toast.error('기존 채팅 데이터를 불러오지 못했어요.');
      }
    },

    onError: (error: Error) => {
      toast.error(error.message);
      router.push('/users');
    },
  });
};
