import { ReactQueryKey } from '@/common/constant';
import { FakeUser } from '@/type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { wait } from 'shared';

const fetchUsers = async (pageParam = 1) => {
  const response = await fetch(
    'https://randomuser.me/api?results=20&page=' + pageParam,
  );
  await wait(1000);
  const data = await response.json();
  return data.results as FakeUser[];
};

export const useGetUsersInfinite = (
  {
    refetchOnMount,
    refetchOnWindowFocus,
    refetchOnReconnect,
  }: {
    refetchOnMount?: boolean;
    refetchOnWindowFocus?: boolean;
    refetchOnReconnect?: boolean;
  } = {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
) => {
  return useInfiniteQuery({
    queryKey: [ReactQueryKey.Users],
    // staleTime: 10 * 1000,
    initialPageParam: 1,
    refetchOnMount: !!refetchOnMount,
    refetchOnWindowFocus: !!refetchOnWindowFocus,
    refetchOnReconnect: !!refetchOnReconnect,
    queryFn: ({ pageParam = 1 }) => {
      return fetchUsers(pageParam);
    },
    getNextPageParam: (_lastPage, allPages) => {
      return allPages.length < 5 ? allPages.length + 1 : undefined;
    },
    select(data) {
      return {
        // Use this to map data to your custom domain
        pages: data.pages.map((page) => ({
          users: page,
          otherInfo: 'otherInfo',
        })),
        pageParams: data.pageParams,
      };
    },
  });
};
