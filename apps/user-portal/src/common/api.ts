import { createHttpClient, setupHttpEndpoints } from 'shared';
import { apiEndpoint } from '../config/env';

export const httpClient = createHttpClient();
export const api = setupHttpEndpoints(httpClient, apiEndpoint);
