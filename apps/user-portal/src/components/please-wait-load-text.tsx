import { useLanguageTranslation } from '@/hooks/ui/useLanguageTranslation';
import { ReloadIcon } from '@radix-ui/react-icons';

export function PleaseWaitLoadText() {
  const { t } = useLanguageTranslation();
  return (
    <>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{' '}
      <>{t('COMMON.LOADING.PLEASE_WAIT')}</>
    </>
  );
}
