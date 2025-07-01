import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

const ReactQueryDevtoolsProd = React.lazy(() =>
  import('@tanstack/react-query-devtools/production').then((d) => ({
    default: d.ReactQueryDevtools,
  })),
);

export default function ReactQueryDevtoolsProduction({
  enabled,
}: {
  enabled: boolean;
}) {
  const [showDevtools, setShowDevtools] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  return enabled ? (
    <>
      <ReactQueryDevtools initialIsOpen />
      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProd />
        </React.Suspense>
      )}
    </>
  ) : null;
}
