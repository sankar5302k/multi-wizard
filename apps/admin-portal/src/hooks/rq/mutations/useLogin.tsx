import { useMutation } from '@tanstack/react-query';
import { appState } from '@/state';
import { wait, doNothing } from 'shared';

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      // const { data: tokens } = await api.authApi.adminSignIn({
      //   email,
      //   password,
      // });

      await wait(2000);

      doNothing(email, password);

      const tokens = {
        userId: 'userId',
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };

      appState.setLoginInfo(tokens);
    },
  });

  return mutation;
};
