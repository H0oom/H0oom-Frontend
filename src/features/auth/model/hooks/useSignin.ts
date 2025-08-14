import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { authApi } from '../api/authApi';
import { SigninRequest } from '../api/types';
import { setAccessToken } from '../../../../shared/api/tokenService';

export const useSignin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SigninRequest) => authApi.signin(data),
    onSuccess: (response) => {
      setAccessToken(response.token);
      toast.success('로그인이 완료되었습니다.');
      router.push('/');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
