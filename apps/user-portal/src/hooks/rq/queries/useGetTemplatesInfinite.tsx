import { ReactQueryKey } from '@/common/constant';
import { FakeUser } from '@/type';
import { SlideType } from '@shared/components/ui/EmblaCarousel';
import { useInfiniteQuery } from '@tanstack/react-query';
import { wait } from 'shared';

export type GetTemplatesInfiniteResult =
  | {
      pages: {
        templates: FakeUser[];
        otherInfo: {
          slideImages: SlideType[];
        };
      }[];
      pageParams: number[];
    }
  | undefined;

/**
 * Fetches templates from a remote API based on the specified page number.
 *
 * @param {number} pageParam - The page number to fetch templates from (default is 1).
 * @return {FakeUser[]} An array of fake user templates fetched from the API.
 */
const fetchTemplates = async (pageParam = 1) => {
  const response = await fetch(
    'https://randomuser.me/api?results=20&page=' + pageParam,
  );
  await wait(1000);
  const data = await response.json();
  return data.results as FakeUser[];
};

/**
 * Custom hook to fetch templates using infinite query
 *
 * @param {Object} options - Options object for configuring the behavior of the query
 * @param {boolean} options.refetchOnMount - Whether to refetch the query when the component mounts
 * @param {boolean} options.refetchOnWindowFocus - Whether to refetch the query when the window regains focus
 * @param {boolean} options.refetchOnReconnect - Whether to refetch the query when the network reconnects
 * @return {InfiniteQueryResult} The result object of the infinite query
 */
export const useGetTemplatesInfinite = (
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
    queryKey: [ReactQueryKey.Templates],
    // staleTime: 10 * 1000,
    initialPageParam: 1,
    refetchOnMount: !!refetchOnMount,
    refetchOnWindowFocus: !!refetchOnWindowFocus,
    refetchOnReconnect: !!refetchOnReconnect,
    queryFn: ({ pageParam = 1 }) => {
      return fetchTemplates(pageParam);
    },
    getNextPageParam: (_lastPage, allPages) => {
      return allPages.length < 5 ? allPages.length + 1 : undefined;
    },
    select(data) {
      //TODO: once the api starts sending the images we can get rid of this
      const slideImages: SlideType[] = [
        { imgUrl: 'https://picsum.photos/600/350?v=0' },
        { imgUrl: 'https://picsum.photos/600/350?v=1' },
        { imgUrl: 'https://picsum.photos/600/350?v=2' },
        { imgUrl: 'https://picsum.photos/600/350?v=3' },
        { imgUrl: 'https://picsum.photos/600/350?v=4' },
      ];
      return {
        // Use this to map data to your custom domain
        pages: data.pages.map((page) => ({
          templates: page,
          otherInfo: { slideImages: slideImages },
        })),
        pageParams: data.pageParams,
      };
    },
  });
};
