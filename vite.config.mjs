import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site from /greece-is-shrinking-a-data-story/, so assets and routes need that base.
export default defineConfig({
  base: '/greece-is-shrinking-a-data-story/',
  plugins: [react()],
  build: {
    outDir: 'build',
  },
});
