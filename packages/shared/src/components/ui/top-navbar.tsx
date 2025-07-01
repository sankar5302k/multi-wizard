import { MenuIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { Button } from './button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './sheet';
import { NavButtonLink, TopNav, TopNavClassName, TopNavProps } from './top-nav';

/**
 * Renders the top navigation menu based on the given parameters.
 *
 * @param {boolean} isMobileView - Indicates if the view is on a mobile device
 * @param {boolean} lockToCollapse - Indicates if the menu should be locked in the collapsed state
 * @param {(link: NavButtonLink) => void} [onLinkClicked] - Optional callback for when a navigation link is clicked
 * @return {JSX.Element} The rendered top navigation menu
 */
const TopNavMenu = ({
  isMobileView,
  lockToCollapse,
  onLinkClicked,
  links,
  logo,
  className,
}: {
  isMobileView: boolean;
  lockToCollapse: boolean;
  onLinkClicked?: (link: NavButtonLink) => void;
  links: NavButtonLink[];
  logo?: string;
  className?: TopNavClassName;
}) => {
  const linkClassName = {
    mainContainer:
      className?.mainContainer ||
      'flex text-center font-medium overflow-y-hidden',
    linkDefault:
      className?.linkDefault ||
      'inline-block rounded-t-lg border-b-2 border-transparent p-4 text-[15px] text-foreground hover:border-hover hover:text-hover dark:hover:text-hover',
    linkSelected:
      className?.linkSelected ||
      'active inline-block rounded-t-lg border-b-2 text-[15px] border-primary p-4 text-primary dark:border-primary dark:text-primary',
    logoStyle: className?.logoStyle || ' h-15 w-15 mr-4 p-2 ',
  };
  return (
    <TopNav
      className={linkClassName}
      isMobileView={lockToCollapse ? true : isMobileView}
      onLinkClicked={onLinkClicked}
      links={links}
      logo={logo}
    />
  );
};

/**
 * Function component for rendering a navigation sheet.
 *
 * @return {JSX.Element} The navigation sheet component
 */

const NavSheet: React.FC<TopNavProps> = (props: TopNavProps) => {
  const [isSheetOpen, setSheetOpen] = useState(false);

  const handleClose = useCallback(() => {
    setSheetOpen(false);
  }, []);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="fixed left-3 top-3 h-8 w-8 border-0 p-1"
          onClick={handleClose}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-0">
        <TopNavMenu
          isMobileView
          lockToCollapse={false}
          onLinkClicked={handleClose}
          logo={props.logo}
          className={props.className}
          links={props.links}
        />
      </SheetContent>
      <SheetClose />
    </Sheet>
  );
};

/**
 * Generates the content for the top navigation bar based on screen width.
 *
 * @return {JSX.Element} The appropriate navigation component based on screen size.
 */

interface TopNavBarProps {
  links: NavButtonLink[];
  onLinkClicked?: (link: NavButtonLink) => void;
  logo?: string | undefined;
  className?: TopNavClassName;
}
const TopNavbar: React.FC<TopNavBarProps> = (props: TopNavBarProps) => {
  const { width: windowWidth = 0 } = useWindowSize();
  const smallScreen = windowWidth < 450;

  const MobileNav = () => (
    <NavSheet
      logo={props.logo}
      isMobileView={false}
      lockToCollapse={smallScreen}
      links={props.links}
      className={props.className}
    />
  );
  const DesktopNav = () => (
    <div className="border-b-2">
      <TopNavMenu
        logo={props.logo}
        isMobileView={false}
        lockToCollapse={smallScreen}
        links={props.links}
        className={props.className}
      />
    </div>
  );

  const NavComponent =
    smallScreen || windowWidth < 450 ? MobileNav : DesktopNav;

  return <NavComponent />;
};

export { TopNavbar };
