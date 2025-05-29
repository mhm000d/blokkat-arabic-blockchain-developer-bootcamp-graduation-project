// @ts-check

const nextConfig = {
  serverExternalPackages: [
    '@reown/appkit',
    '@reown/appkit-wallet',
    '@reown/appkit-adapter-wagmi',
    'thread-stream',
    'pino',
    '@walletconnect/logger'
  ],
  turbopack: {
    resolveAlias: {
      fs: 'empty-module',
      net: 'empty-module',
      tls: 'empty-module',
      encoding: 'empty-module',
      os: 'empty-module',
      path: 'empty-module',
      stream: 'stream-browserify',
      crypto: 'crypto-browserify',
      buffer: 'buffer/',
      util: 'util',
      assert: 'empty-module',
      http: 'empty-module',
      https: 'empty-module',
      child_process: 'empty-module',
      process: 'process/browser',
    }
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: 'crypto-browserify',
        stream: 'stream-browserify',
        buffer: 'buffer',
        util: 'util',
        assert: false,
        http: false,
        https: false,
        os: false,
        path: false,
      };

      config.resolve.alias = {
        ...config.resolve.alias,
        buffer: 'buffer/',
      };

      config.plugins = config.plugins || [];
      
      // Use Next.js built-in webpack
      const webpack = require('next/dist/compiled/webpack');
      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        })
      );
    }
    return config;
  }
};

module.exports = nextConfig;
