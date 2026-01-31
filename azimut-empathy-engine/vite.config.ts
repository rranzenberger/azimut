import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// base relativo para servir em /pt/game/, /en/game/, etc. (assets resolvem relativos ao path atual)
export default defineConfig({
  base: './',
  plugins: [tailwindcss(), react()],
  server: {
    port: 5174,
    host: 'localhost',
    strictPort: true,
  },
})
