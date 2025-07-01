import { setupHttpInterceptors } from 'shared';
import { AppState } from './AppState';
import { httpClient, api } from '@/common/api';

export const appState = new AppState();

setupHttpInterceptors(httpClient, appState);

appState.setExchangeTokenAction(async (currentRefreshToken) => {
  const response = await api.authApi.refreshToken({
    refreshToken: currentRefreshToken,
  });

  const { accessToken, refreshToken } = response.data;

  return {
    accessToken,
    refreshToken,
  };
});
