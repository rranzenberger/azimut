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
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // Múltiplas passadas para melhor compressão
      },
      format: {
        comments: false, // Remover comentários
      },
    },
    cssCodeSplit: true, // Code splitting para CSS também
    sourcemap: false, // Desabilitar sourcemaps em produção (melhor performance)
    // Rollup options para melhorar chunking
    rollupOptions: {
      output: {
        // Manter nomes de arquivos mais estáveis (menos mudanças de hash)
        chunkFileNames: 'assets/[name]-[hash:8].js', // Hash menor (8 chars)
        entryFileNames: 'assets/[name]-[hash:8].js',
        assetFileNames: 'assets/[name]-[hash:8].[ext]',
        // Separar vendor chunks para melhor cache
        manualChunks: (id) => {
          // React core (separado para melhor cache)
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }
          // Router (separado)
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor'
          }
          // UI libraries
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/lucide-react')) {
            return 'ui-vendor'
          }
          // Analytics/tracking (lazy load)
          if (id.includes('analytics') || id.includes('tracking') || id.includes('plausible') || id.includes('gamification')) {
            return 'analytics-vendor'
          }
          // Markdown/Blog (lazy load)
          if (id.includes('react-markdown') || id.includes('remark') || id.includes('rehype')) {
            return 'markdown-vendor'
          }
          // Forms (lazy load)
          if (id.includes('react-hook-form') || id.includes('zod') || id.includes('validator')) {
            return 'forms-vendor'
          }
          // Utils próprios (separar do vendor)
          if (id.includes('/utils/') && !id.includes('node_modules')) {
            return 'app-utils'
          }
          // Hooks próprios (separar do vendor)
          if (id.includes('/hooks/') && !id.includes('node_modules')) {
            return 'app-hooks'
          }
          // Outros node_modules (vendor genérico)
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
    // Otimizações de performance
    chunkSizeWarningLimit: 500, // Avisar se chunk > 500KB
    reportCompressedSize: false, // Desabilitar report (acelera build)
  },
  // Polyfills automáticos via Vite
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
