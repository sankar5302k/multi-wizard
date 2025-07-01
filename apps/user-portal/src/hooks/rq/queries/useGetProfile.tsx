import { ReactQueryKey } from '@/common/constant';
import { FakeUser } from '@/type';
import { useQuery } from '@tanstack/react-query';

export const useGetProfile = () => {
  return useQuery({
    queryKey: [ReactQueryKey.User, 1], // NOTE: 1 is the user id . Key is unique
    queryFn: async () => {
      // NOTE: in Prod it will be through swagger
      // const { data: tokens } = await appState.api.userApi.getProfile({
      // });
      // return tokens;

      const response = await fetch('https://randomuser.me/api');
      const data = await response.json();
      return data.results[0] as FakeUser;
    },
  });
};
