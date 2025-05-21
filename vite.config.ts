import { fileURLToPath, URL } from 'node:url'
import { ghPages } from "vite-plugin-gh-pages";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
	base: '/portfolio/',
  plugins: [
		ghPages({
			branch: 'gh-pages',
			message: 'Deploy to GitHub Pages',
		}),
    vue(),
    vueDevTools(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
