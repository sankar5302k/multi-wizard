import path from 'path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { defineConfig, loadEnv } from 'vite';
// import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(async ({ mode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (import.meta as any).env = loadEnv(mode, process.cwd()); // force load env

  await require('./src/config/env'); // Check env and throw error during build only

  return {
    assetsInclude: ['**/*.hdr', '**/*.exr', '**/*.glb'],
    server: {
      host: process.env.HOST,
      port: parseInt(process.env.ADMIN_PORTAL_DEV_PORT) || 3022,
    },
    plugins: [
      // tsconfigPaths(),
      // tsconfigPaths({
      //   projects: ['tsconfig.base.json', 'tsconfig.node.json'],
      // }),
      react(),
      svgr({
        // svgr options: https://react-svgr.com/docs/options/
        svgrOptions: {
          // ...
        },

        // esbuild options, to transform jsx to js
        esbuildOptions: {
          // ...
        },

        // A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include.
        include: '**/*.svg?react',

        //  A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should ignore. By default no files are ignored.
        exclude: '',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@shared': path.resolve(__dirname, '../../packages/shared/src'),
      },
      // alias: [
      //   {
      //     find: /^@\/(.*)$/,
      //     replacement: `${path.resolve('..')}/src/$1`,
      //     // '@': path.resolve(__dirname, './src'),
      //   },
      // ],
    },
  };
});
