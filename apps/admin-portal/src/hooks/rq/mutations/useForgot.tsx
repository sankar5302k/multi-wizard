import { useMutation } from '@tanstack/react-query';
import { wait, doNothing } from 'shared';

export const useForgot = () => {
  const mutation = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      await wait(2000);
      doNothing(email);
    },
  });

  return mutation;
};
