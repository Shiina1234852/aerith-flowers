import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/aerith-flowers/',
  plugins: [react()],
  css: { postcss: { plugins: [tailwindcss()] } },
  publicDir: 'public',
  build: {
    outDir: 'pages-dist',
    emptyOutDir: true,
  },
});
