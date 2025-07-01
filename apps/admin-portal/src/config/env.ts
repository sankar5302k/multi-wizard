import { EnvList } from '../type'; // do not use alias here. required in vite.config manually
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: 'VITE__ADMIN_PORTAL__',

  client: {
    VITE__ADMIN_PORTAL__APP_ENV: z.enum(EnvList),
    VITE__ADMIN_PORTAL__API_ENDPOINT: z.string().url(),
    VITE__ADMIN_PORTAL__REACT_QUERY_DEBUGGING: z
      .string() // only allow "true" or "false"
      .refine((s) => s === 'true' || s === 'false')
      // // transform to boolean
      .transform((s) => s === 'true'),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: import.meta.env,

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
});

export const envName = env.VITE__ADMIN_PORTAL__APP_ENV;
export const apiEndpoint = env.VITE__ADMIN_PORTAL__API_ENDPOINT;
export const reactQueryDebugging =
  env.VITE__ADMIN_PORTAL__REACT_QUERY_DEBUGGING;
