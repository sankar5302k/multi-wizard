import { Nav, NavButtonLink } from '@shared/components/ui/nav';

import {
  LayoutDashboard,
  UsersRound,
  LayoutTemplate,
  Settings,
  ChevronRight,
  ChevronLeft,
  MenuIcon,
} from 'lucide-react';
import { Button } from '@shared/components/ui/button';
import { useWindowSize } from 'usehooks-ts';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from '@shared/components/ui/sheet';
import { useCallback, useEffect, useState } from 'react';
import { useLanguageTranslation } from '@/hooks/ui/useLanguageTranslation';

interface SideNavbarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapse: boolean) => void;
}

const NavMenu = ({
  isCollapsed,
  lockToCollapse,
  onLinkClicked,
}: {
  isCollapsed: boolean;
  lockToCollapse: boolean;
  onLinkClicked?: (link: NavButtonLink) => void;
}) => {
  const { t } = useLanguageTranslation();
  return (
    <Nav
      isCollapsed={lockToCollapse ? true : isCollapsed}
      onLinkClicked={onLinkClicked}
      links={[
        {
          title: t('NAVBAR.DASHBOARD'),
          href: '/dashboard',
          icon: LayoutDashboard,
          variant: 'ghost',
        },
        {
          title: t('NAVBAR.USERS'),
          href: '/users',
          icon: UsersRound,
          variant: 'ghost',
        },
        {
          title: t('NAVBAR.TEMPLATES'),
          href: '/templates',
          icon: LayoutTemplate,
          variant: 'ghost',
        },
        {
          title: t('NAVBAR.SETTINGS'),
          href: '/settings',
          icon: Settings,
          variant: 'ghost',
        },
      ]}
    />
  );
};

const NavSheet = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    () => {
      setSheetOpen(false);
    };
  }, []);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="fixed left-3 top-3 h-8 w-8 border-0 p-1">
          <MenuIcon></MenuIcon>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className=" px-0 py-20">
        <NavMenu
          isCollapsed={false}
          lockToCollapse={false}
          onLinkClicked={useCallback(() => setSheetOpen(false), [])}
        />
      </SheetContent>
      <SheetClose />
    </Sheet>
  );
};

export default function SideNavbar({
  isCollapsed,
  setIsCollapsed,
}: SideNavbarProps) {
  const { width: windowWidth = 0 } = useWindowSize();
  const smallScreen = windowWidth < 768;
  const mobileWidth = windowWidth < 450;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  if (mobileWidth) {
    return <NavSheet />;
  }

  return (
    <div
      className={cn(
        'relative border-r px-3  pb-10 pt-24',
        isCollapsed && 'min-w-[70px]',
      )}>
      {!smallScreen && (
        <div className="absolute right-[-17px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="outline"
            className="h-8 w-8 rounded-full p-1.5">
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
      )}
      <NavMenu isCollapsed={isCollapsed} lockToCollapse={smallScreen} />
    </div>
  );
}
