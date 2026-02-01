import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true, // Permite acesso da rede local (0.0.0.0)
    // Em dev: /pt/game/, /en/game/, etc. são repassados ao jogo (porta 5174)
    proxy: {
      '^/(pt|en|es|fr)/game': {
        target: 'http://localhost:5174',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/(pt|en|es|fr)\/game/, '') || '/',
      },
    },
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
        // Separar vendor chunks para melhor cache e menor bundle
        manualChunks: (id) => {
          // React core (separado para melhor cache - ~40KB gzip)
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor'
          }
          // Router (separado - ~15KB gzip)
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor'
          }
          // Framer Motion (pesado - ~60KB gzip, lazy load)
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-vendor'
          }
          // Three.js (muito pesado - ~150KB gzip, lazy load)
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) {
            return 'three-vendor'
          }
          // Icons (Lucide - ~10KB gzip)
          if (id.includes('node_modules/lucide-react')) {
            return 'icons-vendor'
          }
          // Analytics/tracking (lazy load)
          if (id.includes('analytics') || id.includes('tracking') || id.includes('plausible') || id.includes('gamification')) {
            return 'analytics-vendor'
          }
          // Markdown/Blog (lazy load - ~30KB gzip)
          if (id.includes('react-markdown') || id.includes('remark') || id.includes('rehype')) {
            return 'markdown-vendor'
          }
          // Forms (lazy load - ~20KB gzip)
          if (id.includes('react-hook-form') || id.includes('zod') || id.includes('validator')) {
            return 'forms-vendor'
          }
          // Helmet (SEO - ~5KB)
          if (id.includes('react-helmet')) {
            return 'seo-vendor'
          }
          // Utils próprios (separar do vendor)
          if (id.includes('/utils/') && !id.includes('node_modules')) {
            return 'app-utils'
          }
          // Hooks próprios (separar do vendor)
          if (id.includes('/hooks/') && !id.includes('node_modules')) {
            return 'app-hooks'
          }
          // Páginas (separar cada página para lazy loading)
          if (id.includes('/pages/') && !id.includes('node_modules')) {
            const match = id.match(/\/pages\/([^/]+)\.(tsx|ts)/)
            if (match) {
              return `page-${match[1].toLowerCase()}`
            }
          }
          // Componentes pesados
          if (id.includes('/components/') && !id.includes('node_modules')) {
            // Chatbot, VideoPlayer, GlobalSearch - separar
            if (id.includes('Chatbot') || id.includes('VideoPlayer') || id.includes('GlobalSearch')) {
              return 'heavy-components'
            }
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
