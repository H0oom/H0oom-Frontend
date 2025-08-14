import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { authApi } from '../api/authApi';
import { SignupRequest } from '../api/types';

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
    onSuccess: (response) => {
      toast.success('회원가입이 완료되었습니다.');
      router.push('/auth');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
