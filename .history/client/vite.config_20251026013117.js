import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Optional but recommended for correct asset paths on Vercel
  base: './',

  build: {
    outDir: 'dist',
    emptyOutDir: true, // ensures clean rebuilds
  },

  server: {
    host: '127.0.0.1',
    port: 3000,
  },
})
