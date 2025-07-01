import PageTitle from '@/components/page-title';
import { Button } from '@shared/components/ui/button';
import { Card, CardContent } from '@shared/components/ui/card';
import { ScrollArea } from '@shared/components/ui/scroll-area';
import { useGetUsersInfinite } from '@/hooks/rq/queries/useGetUsersInfinite';
import { useLanguageTranslation } from '@/hooks/ui/useLanguageTranslation';
import { useInView } from 'react-intersection-observer';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { Avatar, AvatarImage } from '@shared/components/ui/avatar';
import { FakeUser } from '@/type';
import { PleaseWaitLoadText } from '@/components/please-wait-load-text';

function UserCard(props: { u: FakeUser }) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Card className="w-full p-5 sm:w-[350px] md:w-[500px]">
        <CardContent>
          <Avatar className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 object-cover">
            <AvatarImage
              className="h-full w-full rounded-full border-none object-cover"
              src={props.u?.picture.medium}
              alt={'avatar'}
            />
          </Avatar>

          <div className="mt-2">
            <p className="text-l font-bold">
              {props.u?.name.first} {props.u?.name.last}
            </p>
            <p className="text-md text-gray-400">{props.u?.email} </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const Users = observer(function Users() {
  const { t } = useLanguageTranslation();

  const {
    data: users,
    isLoading,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useGetUsersInfinite({
    refetchOnMount: true, // refetchOnMount: true, This will fetch all the loaded pages again on mount. 😀
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // TODO: Add search bar with debounce
  const { ref: infiniteRef, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const userCards = useMemo(
    () =>
      users?.pages.map(({ users, otherInfo }, i) =>
        users.map((u) => (
          <UserCard key={i + otherInfo + u.email} u={u}></UserCard>
        )),
      ),
    [users],
  );

  const loadingText = isLoading
    ? 'Loading...'
    : isFetchingNextPage || isFetching
      ? 'Loading more...'
      : '';

  const fetchingOrLoading = isFetching || isLoading;

  return (
    <div className="flex h-full max-h-[100%] w-full  flex-col gap-5">
      <PageTitle title={t('USERS.TITLE')} />
      <Button
        disabled={fetchingOrLoading || !hasNextPage}
        onClick={() => fetchNextPage()}>
        {isFetching || isLoading ? (
          <PleaseWaitLoadText />
        ) : hasNextPage ? (
          t('USERS.FETCH_NEXT_PAGE')
        ) : (
          t('USERS.NO_MORE')
        )}
      </Button>

      <ScrollArea className="flex w-full flex-1 overflow-y-auto">
        <div className="max-h-100 flex h-full w-full flex-col items-center justify-center gap-5 ">
          {userCards}
          <span ref={infiniteRef}>{loadingText}</span>
        </div>
      </ScrollArea>
    </div>
  );
});
