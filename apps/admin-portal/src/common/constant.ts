export const NavigationRoutes = {
  ForgotPassword: '/forgot-password',
  Home: '/',
  Landing: '/landing',
  Dashboard: '/dashboard',
  Users: '/users',
  Settings: '/settings',
  SetPassword: '/set-password',
  SignIn: '/sign-in',
  SignUp: '/sign-up',
} as const;

export const CacheKey = {
  User: 'user',
  PreferSidebarOpen: 'prefer-sidebar-open',
  LanguagePreference: 'language-preference',
  Theme: 'vite-ui-theme',
} as const;

export const ReactQueryKey = {
  Users: 'users',
  User: 'user',
  Sales: 'data-sales',
  Data: 'data',
  BarData: 'bar',
} as const;
