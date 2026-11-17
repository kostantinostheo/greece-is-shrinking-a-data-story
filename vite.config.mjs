import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site from /vizginius/, so assets and routes need that base.
export default defineConfig({
  base: '/vizginius/',
  plugins: [react()],
  build: {
    outDir: 'build',
  },
});
