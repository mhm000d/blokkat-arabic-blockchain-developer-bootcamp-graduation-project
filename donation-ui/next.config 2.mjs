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
  webpack: async function(config, { isServer }) {
    if (!isServer) {
      if (!config.resolve) {
        config.resolve = {};
      }
      if (!config.resolve.fallback) {
        config.resolve.fallback = {};
      }
      Object.assign(config.resolve.fallback, {
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
      });

      if (!config.resolve.alias) {
        config.resolve.alias = {};
      }
      Object.assign(config.resolve.alias, {
        buffer: 'buffer/',
      });

      if (!config.plugins) {
        config.plugins = [];
      }
      const webpack = await import('webpack');
      config.plugins.push(
        new webpack.default.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        })
      );
    }
    return config;
  }
};

export default nextConfig;
