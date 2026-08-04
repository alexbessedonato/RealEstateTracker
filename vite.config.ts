import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // Prevent "Invalid hook call" / rules-of-hooks errors from duplicate React copies
    // (this repo currently has both react@19.0.0-rc.1 and react@19.2.7 in the tree).
    dedupe: ['react', 'react-dom'],
  },
})
