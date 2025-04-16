const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        buffer: require.resolve("buffer"),
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
        process: require.resolve("process") // ✅ FIXED RIGHT HERE
      };
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process"
        })
      );
      return webpackConfig;
    }
  }
};
