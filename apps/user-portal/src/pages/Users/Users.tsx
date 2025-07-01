import PageTitle from '@/components/page-title';
import { Button } from '@shared/components/ui/button';
import ConditionalElement from '@shared/components/ui/conditional-element';
import { ScrollArea } from '@shared/components/ui/scroll-area';
import { useLanguageTranslation } from '@/hooks/ui/useLanguageTranslation';
import { observer } from 'mobx-react-lite';
import { PleaseWaitLoadText } from '@/components/please-wait-load-text';
import { UsersUIState } from './UsersUIState';
import { UserCard } from './UsersCard';

export const Users = observer(function Users() {
  const { t } = useLanguageTranslation();
  // extract all the Ui State variables
  const {
    users,
    infiniteRef,
    loadingText,
    fetchingOrLoading,
    hasNextPage,
    isButtonDisabled,
    fetchNextPage,
  } = UsersUIState();

  const userCards = users?.pages.map(({ users, otherInfo }, i) =>
    users.map((u) => <UserCard key={i + otherInfo + u.email} u={u} />),
  );

  return (
    <div className="flex h-full max-h-[100%] w-full  flex-col gap-5">
      <PageTitle title={t('USERS.TITLE')} />
      <Button disabled={isButtonDisabled} onClick={() => fetchNextPage()}>
        {/* Example for conditional rendering of element having multiple condition and else */}
        <ConditionalElement>
          <ConditionalElement.When isTrue={fetchingOrLoading}>
            <PleaseWaitLoadText />
          </ConditionalElement.When>
          <ConditionalElement.When isTrue={hasNextPage}>
            {t('USERS.FETCH_NEXT_PAGE')}
          </ConditionalElement.When>
          <ConditionalElement.Else>
            {t('USERS.NO_MORE')}
          </ConditionalElement.Else>
        </ConditionalElement>
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
