import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 1753,
    host: true, // Permite acesso da rede local (0.0.0.0)
    // Ou use '0.0.0.0' explicitamente
    // host: '0.0.0.0',
  },
  build: {
    // Compatibilidade com navegadores mais antigos
    target: 'es2015', // Suporta Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
    cssTarget: 'chrome90', // CSS compatível
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remover console em produção (melhor performance)
      },
    },
    // Rollup options para melhorar chunking
    rollupOptions: {
      output: {
        // Manter nomes de arquivos mais estáveis (menos mudanças de hash)
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // Separar vendor chunks
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  // Polyfills automáticos via Vite
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
