// development config
const { merge } = require("webpack-merge");
const path = require("path");
const commonConfig = require("./common");

module.exports = merge(commonConfig, {
  mode: "development",
  entry: [
    "webpack-dev-server/client?http://localhost:8080", // bundle the client for webpack-dev-server and connect to the provided endpoint
    "./index.tsx", // the entry point of our app
  ],
  devServer: {
    hot: "only", // enable HMR on the server
    historyApiFallback: true, // fixes error 404-ish errors when using react router :see this SO question: https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
  },
  devtool: "cheap-module-source-map",
  resolve: {
    extensions: [".js", ".tsx"],
    alias: {
      ["ui"]: path.resolve(__dirname + "../../../src/ui"),
      ["utils"]: path.resolve(__dirname + "../../../src/utils"),
      ["assets"]: path.resolve(__dirname + "../../../src/assets"),
      ["controller"]: path.resolve(__dirname + "../../../src/controller"),
      ["data"]: path.resolve(__dirname + "../../../src/data"),
    },
  },
  plugins: [],
});
