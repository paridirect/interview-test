/// <reference types='vitest' />
import { builtinModules } from 'module';
import { join } from 'path';
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  return {
    cacheDir: '../../node_modules/.vite/website-bff',

    plugins: [nxViteTsPaths()],

    ssr: { target: 'node', noExternal: true, format: 'esm' },
    build: {
      ssr: true,
      sourcemap: !isProduction,
      rollupOptions: {
        input: join(__dirname, 'src', isProduction ? 'lambda.ts' : 'node.ts'),
        external: [...builtinModules, ...builtinModules.map((m) => `node:${m}`)],
      },
    },

    test: {
      globals: true,
      clearMocks: true,
      environment: 'node',
      cache: { dir: '../../node_modules/.vitest' },
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
      includeSource: ['src/**/*.{js,mjs,cjs,ts,mts,cts}'],
    },
  };
});
