import { useMutation } from '@tanstack/react-query';
import { wait, doNothing } from 'shared';

export const useSetPassword = () => {
  const mutation = useMutation({
    mutationFn: async ({
      token,
      password,
    }: {
      token: string;
      password: string;
    }) => {
      await wait(2000);
      doNothing(token, password);
    },
  });

  return mutation;
};
