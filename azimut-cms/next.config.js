/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output standalone para evitar problemas com micromatch
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
  
  // Configuração experimental para limitar file tracing
  experimental: {
    outputFileTracingRoot: require('path').join(__dirname),
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/**',
        'node_modules/@esbuild/**',
        '../node_modules/**',
        '../dist/**',
        '../build/**',
        '../.git/**',
        '../*.md',
      ],
    },
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















