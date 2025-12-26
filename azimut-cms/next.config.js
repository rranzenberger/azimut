/** @type {import('next').NextConfig} */
const nextConfig = {
  // OTIMIZAÇÕES PARA EVITAR STACK OVERFLOW NO VERCEL
  experimental: {
    outputFileTracingIncludes: {
      '/api/**': ['./prisma/**/*'],
    },
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild',
        'node_modules/webpack',
        '.git',
      ],
    },
  },
  
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
    
    // Reduzir recursão
    config.infrastructureLogging = {
      level: 'error',
    };
    
    return config;
  },
  
  // Excluir arquivos da raiz do projeto do build
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  
  // Usar SWC minify
  swcMinify: true,
  
  // Otimizar output
  output: 'standalone',
  
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
