import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.thecocktaildb.com/api/json/v2/9973533/',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/,'')
      }
    }
}
});
