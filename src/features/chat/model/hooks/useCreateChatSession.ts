import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { chatApi } from '../api/chatApi';
import { CreateSessionRequest } from '../api/types';

export const useCreateChatSession = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateSessionRequest) => chatApi.createSession(data),
    onSuccess: () => {
      toast.success('채팅 세션이 시작되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message);
      router.push('/users');
    },
  });
};
