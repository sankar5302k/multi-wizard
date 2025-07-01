import { NavigationRoutes } from '@/common/constant';
import { Button } from '@shared/components/ui/button';
import { appState } from '@/state';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import PageTitle from '@/components/page-title';
import { useGetProfile } from '@/hooks/rq/queries/useGetProfile';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@shared/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/components/ui/card';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from '@shared/components/ui/alert-dialog';
import { Skeleton } from '@shared/components/ui/skeleton';
import { useLanguageTranslation } from '@/hooks/ui/useLanguageTranslation';

const DeleteAccountButtonAlert = ({ onSuccess }: { onSuccess: () => void }) => {
  const { t } = useLanguageTranslation();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'link'} className="my-3 pl-0 underline" size={'sm'}>
          {t('DIALOG.ACCOUNT_DELETE.PARENT_TRIGGER_BUTTON')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('DIALOG.ACCOUNT_DELETE.TITLE')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('DIALOG.ACCOUNT_DELETE.DESCRIPTION')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t('DIALOG.ACCOUNT_DELETE.CANCEL_ACTION')}
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={() => {
                onSuccess?.();
              }}>
              {t('DIALOG.ACCOUNT_DELETE.DELETE_ACTION')}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const LogoutButtonAlert = ({ onSuccess }: { onSuccess: () => void }) => {
  const { t } = useLanguageTranslation();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>{t('DIALOG.LOGOUT.PARENT_TRIGGER_BUTTON')}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('DIALOG.LOGOUT.TITLE')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('DIALOG.LOGOUT.DESCRIPTION')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5 justify-center sm:justify-center">
          <AlertDialogCancel>
            {t('DIALOG.LOGOUT.CANCEL_ACTION')}
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={() => {
                onSuccess?.();
              }}>
              {t('DIALOG.LOGOUT.LOGOUT_ACTION')}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const Settings = observer(function Settings() {
  const {
    data: profile,
    isLoading,
    // error,
    // refetch,
    // isFetching,
  } = useGetProfile();

  const navigate = useNavigate();
  const { t } = useLanguageTranslation();

  const logout = () => {
    appState.logout();
    toast.success(t('DIALOG.LOGOUT.TOAST.SUCCESS'));
    navigate(NavigationRoutes.Landing);
  };

  const deleteAccount = () => {
    toast.success(t('DIALOG.ACCOUNT_DELETE.TOAST.SUCCESS'));
    logout();
  };

  const initials =
    (profile?.name.first[0] || '') + (profile?.name.last[0] || '');

  return (
    <div className="flex w-full flex-col  gap-5">
      <PageTitle title={t('SETTINGS.TITLE')} />

      <div className="flex w-full flex-col items-start gap-5">
        <Card className="px-5 py-2">
          <CardHeader>
            <CardTitle className="text-2xl">{t('SETTINGS.PROFILE')}</CardTitle>
          </CardHeader>

          <CardContent className="w-[300px]">
            <Avatar className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 object-cover">
              <AvatarImage
                className="h-full w-full rounded-full border-none object-cover"
                src={profile?.picture.medium}
                alt={'avatar'}
              />
              <AvatarFallback delayMs={1000} className="rounded-full text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="mt-2">
              <p className="text-l font-bold">
                {profile?.name.first} {profile?.name.last}
              </p>
              <p className="text-md text-gray-400">{profile?.email} </p>

              {isLoading ? (
                <>
                  <Skeleton className="mt-4 h-4 w-[200px]" />
                  <Skeleton className="mt-2 h-4 w-[250px]" />{' '}
                </>
              ) : null}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-start">
            <DeleteAccountButtonAlert onSuccess={deleteAccount} />
            <LogoutButtonAlert onSuccess={logout} />
            {/* FIXME TODO add loaders, skeletons and error handling*/}
            {/* {isLoading && 'Loading...'}
{isFetching && 'Fetching...'} */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
});
