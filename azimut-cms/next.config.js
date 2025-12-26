/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output standalone para builds mínimos
  output: 'standalone',
  
  // Desabilitar completamente features desnecessárias
  poweredByHeader: false,
  compress: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.azimut.com.br',
      },
    ],
  },
  
  // Configuração simples de webpack
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    
    return config;
  },
  
  // Apenas extensões necessárias
  pageExtensions: ['ts', 'tsx'],
  
  // CORS para API pública
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
