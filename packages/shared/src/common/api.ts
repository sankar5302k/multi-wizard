import { AxiosInstance } from 'axios';
import { AuthApi } from '../_api';

export const setupHttpEndpoints = (
  httpClient: AxiosInstance,
  apiEndpoint: string,
) => {
  const authApi = new AuthApi(undefined, apiEndpoint, httpClient);

  return {
    authApi,
  };
};
