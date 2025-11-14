import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Use default fs events, not polling
      usePolling: false,
      // Ignore everything except src
      ignored: [
        '**/node_modules/**',
        '**/dist/**',
        '**/.git/**',
        '**/vite.config.ts',
        '**/pnpm-lock.yaml',
        '**/package-lock.json',
        '**/*',          // ignore everything
        '!src/**'        // except src
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
