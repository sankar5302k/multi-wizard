import SideNavbar from '@/components/side-navbar';
import { TopNav } from '@/components/top-nav';
import { appState } from '@/state';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';

export const PrivateRoute = observer(() => {
  return (
    <div className="flex max-h-full min-h-screen w-full max-w-full">
      <SideNavbar
        isCollapsed={!appState.preferSidebarOpen}
        setIsCollapsed={useCallback(
          (collapse) => appState.savePreferSidebarOpen(!collapse),
          [],
        )}
      />
      {/* main page */}
      <div className="w-full max-w-full  overflow-y-scroll p-8 pt-16">
        <TopNav />
        <Outlet />
      </div>
    </div>
  );
});
