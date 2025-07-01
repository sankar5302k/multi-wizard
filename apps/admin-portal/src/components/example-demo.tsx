import { NavigationRoutes } from '@/common/constant';
import { useLanguageTranslation } from '@/hooks/ui/useLanguageTranslation';
import { cn } from '@/lib/utils';
import ReactIconOption1 from '@shared/components/icons/examples/ReactIcon';
import ReactIconOption2 from '@shared/components/icons/examples/ReactIcon2';
import ReactIconOption3 from '@shared/components/icons/examples/ReactIcon3';
import { Button } from '@shared/components/ui/button';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@shared/components/ui/drawer';
import { Nav } from '@shared/components/ui/nav';
import { Separator } from '@shared/components/ui/separator';

export default function ExamplesDemo({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { t } = useLanguageTranslation();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className={cn('underline', className)} variant="link">
          {t('EXAMPLES.PARENT_TRIGGER_BUTTON')}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{t('EXAMPLES.TITLE')}</DrawerTitle>
            <DrawerDescription>{t('EXAMPLES.DESCRIPTION')}</DrawerDescription>
          </DrawerHeader>
          <div className="min-h-[40vh] p-4 pb-0">
            <div className="flex flex-col items-center justify-center space-x-2 space-y-4">
              <div className="flex  items-center justify-center space-x-4 space-y-4">
                <h4 className="bg-example text-example-foreground px-4 py-2">
                  {t('EXAMPLES.COLOR_TEST')}
                </h4>
              </div>
              <Separator />
              <div className="flex  items-center justify-center space-x-4 space-y-4">
                <div>
                  SVG OPTION1: One modified svg with fill empty - set manually
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <ReactIconOption1 variant="off" />
                  <ReactIconOption1 variant="on" />
                </div>
              </div>
              <div className="flex  items-center justify-center space-x-4 space-y-4">
                <div>SVG OPTION2: Two different svgs</div>
                <div className="flex items-center justify-center space-x-2">
                  <ReactIconOption2 variant="off" />
                  <ReactIconOption2 variant="on" />
                </div>
              </div>
              <div className="flex  items-center justify-center space-x-4 space-y-4">
                <div>
                  SVG OPTION3: One modified svg with fill currentColor from
                  parent theme
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <ReactIconOption3 variant="off" />
                  <ReactIconOption3 variant="on" />
                </div>
              </div>

              <Separator />
              <p>SVG OPTIONS Demo in Nav:</p>
              <Nav
                links={[
                  {
                    title: 'Landing1',
                    icon: ReactIconOption1,
                    variant: 'ghost',
                    href: NavigationRoutes.Landing,
                  },
                  {
                    title: 'Unknown1',
                    icon: ReactIconOption1,
                    variant: 'ghost',
                    href: '/unknown1',
                  },

                  {
                    title: 'Landing2',
                    icon: ReactIconOption2,
                    variant: 'ghost',
                    href: NavigationRoutes.Landing,
                  },
                  {
                    title: 'Unknown2',
                    icon: ReactIconOption2,
                    variant: 'ghost',
                    href: '/unknown2',
                  },
                  {
                    title: 'Landing3',
                    icon: ReactIconOption3,
                    variant: 'ghost',
                    href: NavigationRoutes.Landing,
                  },
                  {
                    title: 'Unknown3',
                    icon: ReactIconOption3,
                    variant: 'ghost',
                    href: '/unknown3',
                  },
                ]}
                isCollapsed={false}></Nav>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
