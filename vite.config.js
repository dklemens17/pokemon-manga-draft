import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the built site works from any path, including a GitHub Pages project URL.
export default defineConfig({
  plugins: [react()],
  base: './',
});
