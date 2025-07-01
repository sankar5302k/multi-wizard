export type CustomSVGIconTypeProps = {
  variant?: 'on' | 'off' | undefined;
  className?: string;
};

export type CustomSVGIconType = ({
  variant,
  className,
}: CustomSVGIconTypeProps) => JSX.Element;

export type FlattenKeys<T> = T extends object
  ? {
      [K in keyof T]-?: `${K & string}${T[K] extends object ? '.' : ''}${FlattenKeys<T[K]>}`;
    }[keyof T]
  : '';

export type HttpClientMinState = {
  user: { accessToken: string } | null;
  authTokenVersion: number | undefined;
  exchangeOnlyOnce: () => Promise<unknown>;
  logout: () => void;
};
