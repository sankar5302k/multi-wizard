import { Link, useLocation } from 'react-router-dom';

import { buttonVariants } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { ScrollArea, ScrollBar } from './scroll-area';

export interface TopNavClassName {
  mainContainer?: string;
  linkDefault?: string;
  linkSelected?: string;
  linkDisabled?: string;
  logoStyle?: string;
}

export interface NavButtonLink {
  title: string;
  href: string;
  variant: 'default' | 'ghost';
  isDisabled?: boolean;
}

export interface TopNavProps {
  isMobileView?: boolean;
  links: NavButtonLink[];
  className?: TopNavClassName;
  onLinkClicked?: (link: NavButtonLink) => void;
  logo?: string;
  lockToCollapse?: boolean;
}

/**
 * A function that renders the tabs navigation bar.
 *
 * @param {TopNavClassName} className - optional class name for the top navigation bar
 * @param {NavButtonLink[]} links - array of navigation button links
 * @param {string} pathName - the current path name
 * @param {(link: NavButtonLink) => void} onLinkClicked - optional callback function when a link is clicked
 * @return {JSX.Element} the rendered tabs navigation bar component
 */
const TabsNavBar = ({
  className,
  pathName,
  links,
  onLinkClicked,
  logo,
}: {
  className?: TopNavClassName;
  links: NavButtonLink[];
  pathName: string;
  onLinkClicked?: (link: NavButtonLink) => void;
  logo?: string;
}) => {
  const classNames = {
    linkDefault:
      className?.linkDefault ||
      'inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300',
    linkSelected:
      className?.linkSelected ||
      'active inline-block rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500',
    linkDisabled:
      className?.linkDisabled ||
      'inline-block cursor-not-allowed rounded-t-lg p-4 text-gray-400 dark:text-gray-500',
    mainContainer:
      className?.mainContainer ||
      'border-b flex border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400',
    logoStyle: className?.logoStyle || ' h-30 w-20 mr-4 p-2 ',
  };

  /**
   * A function that renders a link based on the provided NavButtonLink and index.
   *
   * @param {NavButtonLink} link - the NavButtonLink object to render
   * @param {number} index - the index of the link in the list
   * @return {JSX.Element} the rendered Link component
   */
  const renderLink = (link: NavButtonLink, index: number) => {
    const className =
      pathName?.startsWith(link.href) || (index === 0 && pathName === '/')
        ? classNames.linkSelected
        : link.isDisabled
          ? classNames.linkDisabled
          : classNames.linkDefault;

    return (
      <li className="me-2" key={index}>
        <Link
          to={link.isDisabled ? '#' : link.href}
          onClick={() => {
            onLinkClicked?.(link);
          }}
          aria-disabled={link.isDisabled || false}
          className={className}>
          {link.title}
        </Link>
      </li>
    );
  };

  return (
    <ScrollArea className="whitespace-nowrap">
      <div className={classNames.mainContainer}>
        {logo ? <img className={classNames.logoStyle} src={logo} /> : null}
        <ul className="flex">{links.map(renderLink)}</ul>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

/**
 * A function that renders the mobile menu.
 *
 * @param {TopNavClassName} className - optional class name for the top navigation bar
 * @param {NavButtonLink[]} links - array of navigation button links
 * @param {string} pathName - the current path name
 * @param {(link: NavButtonLink) => void} onLinkClicked - optional callback function when a link is clicked
 * @return {JSX.Element} the rendered mobile menu component
 */
const MobileMenu = ({
  pathName,
  links,
  onLinkClicked,
  logo,
}: {
  links: NavButtonLink[];
  pathName: string;
  onLinkClicked?: (link: NavButtonLink) => void;
  logo?: string;
}) => {
  /**
   * A function that renders a link based on the provided NavButtonLink and index.
   *
   * @param {NavButtonLink} link - the NavButtonLink object to render
   * @param {number} index - the index of the link in the list
   * @return {JSX.Element} the rendered Link component
   */
  const linkRender = (link: NavButtonLink, index: number) => {
    const isActive = link.href === pathName;
    const variant = isActive ? 'default' : 'ghost';
    const onClick = () => onLinkClicked?.(link);

    return (
      <Link
        key={index}
        to={link.href}
        onClick={onClick}
        className={cn(
          buttonVariants({ variant, size: 'sm' }),
          isActive &&
            'dark:bg-muted dark:hover:bg-muted dark:text-background dark:hover:text-background',
          'justify-start',
        )}>
        {link.title}
      </Link>
    );
  };

  return (
    <ScrollArea className="h-[85vh]">
      <div
        className={cn(
          'group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2',
        )}>
        {logo ? <img className={'h-20 w-20'} src={logo} /> : null}
        <nav className="grid gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map(linkRender)}
        </nav>
      </div>
    </ScrollArea>
  );
};

/**
 * Generate the top navigation component based on the current view.
 *
 * @param {string} className - The CSS class name for the top navigation component.
 * @param {boolean} isMobileView - A flag indicating if the view is in mobile mode.
 * @param {array} links - An array of links to be displayed in the navigation component.
 * @param {function} onLinkClicked - A function to be called when a link is clicked.
 * @param {...any} props - Additional props to be spread on the top navigation component.
 * @return {JSX.Element} The rendered top navigation component.
 */
const TopNav = ({
  className,
  isMobileView,
  links,
  onLinkClicked,
  logo,
  ...props
}: TopNavProps) => {
  const location = useLocation();
  const { pathname: pathName } = location;

  const NavComponent = isMobileView ? MobileMenu : TabsNavBar;

  return (
    <div {...props}>
      <NavComponent
        links={links}
        pathName={pathName}
        onLinkClicked={onLinkClicked}
        className={className}
        logo={logo}
      />
    </div>
  );
};

export { TopNav };
