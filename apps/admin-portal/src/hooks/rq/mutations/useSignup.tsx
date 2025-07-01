import { useMutation } from '@tanstack/react-query';
import { appState } from '@/state';
import { api } from '@/common/api';

export const useSignup = () => {
  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data: tokens } = await api.authApi.adminSignIn({
        email,
        password,
      });

      appState.setLoginInfo(tokens);
    },
  });

  return mutation;
};
