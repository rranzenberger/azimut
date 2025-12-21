/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.azimut.com.br',
      },
    ],
  },
  
  // Excluir arquivos desnecessários do build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    
    // Limitar o que o webpack processa
    config.watchOptions = {
      ignored: ['**/node_modules', '../**'],
    };
    
    return config;
  },
  
  // Excluir arquivos da raiz do projeto do build
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  
  // Usar SWC minify
  swcMinify: true,
  
  // Limitar arquivos processados durante build traces
  experimental: {
    // Desabilitar otimizações que podem causar stack overflow
    optimizePackageImports: [],
  },
  
  // Excluir arquivos desnecessários do build traces
  outputFileTracingExcludes: {
    '*': [
      '**/*.md',
      '**/COMO_*.md',
      '**/CHECKLIST_*.md',
      '**/DEPLOY_*.md',
      '**/DIAGNOSTICAR_*.md',
      '**/SOLUCAO_*.md',
      '**/VERIFICAR_*.md',
      '**/azimut-cms/azimut-cms/**',
      '**/src/**',
      '../**',
    ],
  },
  
  async headers() {
    return [
      {
        source: '/api/public/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: process.env.SITE_URL || '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, Content-Type, Authorization' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
