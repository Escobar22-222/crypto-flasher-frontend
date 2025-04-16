const webpack = require("webpack");
const path = require("path"); // ✅ Required for correct process resolution

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        buffer: require.resolve("buffer/"),
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
        process: path.resolve(__dirname, "node_modules/process/browser.js") // ✅ Direct file path
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
