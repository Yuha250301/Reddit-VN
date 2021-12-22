// production config
const { merge } = require("webpack-merge");
const { resolve } = require("path");

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "production",
  entry: "./index.tsx",
  output: {
    filename: "js/bundle.[contenthash].min.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".tsx"],
    modules: [resolve(__dirname + "../../../src"), "node_modules"],
    alias: {
      ["~"]: resolve(__dirname + "../../../src"),
    },
  },
  plugins: [],
});
