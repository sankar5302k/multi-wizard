import { ScrollArea } from '@shared/components/ui/scroll-area';
import {
  GetTemplatesInfiniteResult,
  useGetTemplatesInfinite,
} from '@/hooks/rq/queries/useGetTemplatesInfinite';
import { useInView } from 'react-intersection-observer';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import TemplatesCard from '@shared/components/ui/templates-card';

/**
 * Checks if the provided templates are empty.
 * @param {GetTemplatesInfiniteResult | undefined} templates - The templates to check.
 * @returns {boolean} `true` if the templates are empty, `false` otherwise.
 */
const isEmptyTemplates = (
  templates: GetTemplatesInfiniteResult | undefined,
): boolean => templates === undefined || (templates?.pages ?? []).length === 0;

export const TemplateList = observer(function Templates() {
  const {
    data: templates,
    isLoading,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useGetTemplatesInfinite({
    refetchOnMount: true, // refetchOnMount: true, This will fetch all the loaded pages again on mount.
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

  const templatesCards = () =>
    templates?.pages.map(({ templates, otherInfo }, i) =>
      templates.map((u) => (
        <TemplatesCard
          key={i + '-' + u.email}
          slideImages={otherInfo.slideImages}
          navButtons="arrow"
          fillType="default"
        />
      )),
    );

  const loadingText = isLoading
    ? 'Loading...'
    : isFetchingNextPage || isFetching
      ? 'Loading more...'
      : '';

  if (isEmptyTemplates(templates) && !isLoading)
    return <div className="flex justify-center">No templates found</div>;

  return (
    <div className="flex h-full max-h-[100%] w-full  flex-col gap-5">
      <ScrollArea className="flex w-full flex-1 overflow-y-auto">
        <div className="max-h-100 flex h-full w-full flex-col items-center justify-center">
          <div className="justify-flex-start flex h-full w-full flex-row flex-wrap items-center gap-6 ">
            {templatesCards()}
          </div>
          <span className="mb-4 mt-4" ref={infiniteRef}>
            {loadingText}
          </span>
        </div>
      </ScrollArea>
    </div>
  );
});
