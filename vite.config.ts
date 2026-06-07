import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/web/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          domegallery: ['@use-gesture/react'],
        },
      },
    },
    cssCodeSplit: true,
    minify: 'esbuild',
    target: 'es2015',
  },
  css: {
    devSourcemap: false,
  },
})
