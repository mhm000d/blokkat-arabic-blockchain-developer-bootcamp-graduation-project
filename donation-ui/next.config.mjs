/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    '@reown/appkit',
    '@reown/appkit-wallet',
    '@reown/appkit-adapter-wagmi',
    'thread-stream',
    'pino',
    '@walletconnect/logger'
  ],
  modularizeImports: {
    '@reown/appkit/networks': {
      transform: '@reown/appkit/networks/{{member}}'
    }
  },
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Ensure config.resolve exists
      config.resolve = config.resolve || {};
      
      // Configure fallbacks for Node.js core modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        encoding: false,
        os: false,
        path: false,
        crypto: 'crypto-browserify',
        stream: 'stream-browserify',
        buffer: 'buffer',
        util: 'util',
        assert: false,
        http: false,
        https: false,
        child_process: false,
        process: 'process/browser',
      };

      // Add webpack plugins for polyfills
      config.plugins = [
        ...(config.plugins || []),
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
          const mod = resource.request.replace(/^node:/, '');
          switch (mod) {
            case 'buffer':
              resource.request = 'buffer';
              break;
            case 'stream':
              resource.request = 'stream-browserify';
              break;
            case 'util':
              resource.request = 'util';
              break;
            default:
              break;
          }
        })
      ];
    }
    return config;
  }
};

export default nextConfig;
