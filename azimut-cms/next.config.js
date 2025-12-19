/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output standalone para reduzir processamento de arquivos
  output: 'standalone',
  
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
  
  // Otimizações para evitar "Maximum call stack size exceeded"
  experimental: {
    optimizePackageImports: ['sharp', '@supabase/supabase-js'],
    // Desabilitar file tracing para evitar micromatch
    outputFileTracingRoot: undefined,
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
    
    // Desabilitar cache para evitar problemas
    config.cache = false;
    
    // Limitar processamento de arquivos de forma mais agressiva
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/*'],
    };
    
    return config;
  },
  
  // Excluir arquivos da raiz do projeto do build
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  
  // Desabilitar otimizações que podem causar problemas
  swcMinify: true,
  
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















