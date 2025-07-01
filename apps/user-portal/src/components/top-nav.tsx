import { useLanguageTranslation } from '@/hooks/ui/useLanguageTranslation';
import { NavButtonLink } from '@shared/components/ui/nav';
import { TopNavbar } from '@shared/components/ui/top-navbar';
import { LayoutDashboard, Settings, UsersRound } from 'lucide-react';
import { useMemo } from 'react';
export const TopNav = () => {
  const { t } = useLanguageTranslation();
  const navLinks: NavButtonLink[] = useMemo(
    () => [
      {
        title: t('TOP_NAVBAR.DASHBOARD'),
        href: '/dashboard',
        variant: 'ghost',
        icon: LayoutDashboard,
      },
      {
        title: t('TOP_NAVBAR.USERS'),
        href: '/users',
        variant: 'ghost',
        icon: UsersRound,
      },
      {
        title: t('TOP_NAVBAR.SETTINGS'),
        href: '/settings',
        variant: 'ghost',
        icon: Settings,
      },
    ],
    [t],
  );

  return <TopNavbar links={navLinks} />;
};
