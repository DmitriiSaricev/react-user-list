import tailwindcssPlugin from '@tailwindcss/vite';
import viteReactPlugin from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import viteConfigPaths from 'vite-tsconfig-paths';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  build: {
    reportCompressedSize: false,
    commonjsOptions: { transformMixedEsModules: true },
  },
  plugins: [
    tailwindcssPlugin(),
    viteConfigPaths(),
    viteReactPlugin(),
    // eslint-disable-next-line no-undef
    process.env.INLINE ? viteSingleFile() : null,
  ].filter(Boolean),
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, './src/styles'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});
