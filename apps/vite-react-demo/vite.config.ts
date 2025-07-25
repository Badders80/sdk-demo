/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/vite-react-demo',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(), 
    nxViteTsPaths(),
    nodePolyfills({
      globals: {
        Buffer: true,  // Fixes the externalized warning
        process: true, // Optional fallback if needed
        global: true,
      },
      protocolImports: true, // For other node modules if errors
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  define: {
    'process.env': {},
  },
  base: './',
  build: {
    outDir: '../../dist/apps/vite-react-demo',
    emptyOutDir: true,
    reportCompressedSize: true,
    sourcemap: true,
    rollupOptions: {
      external: [],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/vite-react-demo',
      provider: 'v8',
    },
  },
});
