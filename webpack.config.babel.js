import webpack from "webpack";
import { resolve } from "path";
import { getIfUtils, removeEmpty } from "webpack-config-utils";

export default env => {
  const { ifProd, ifNotProd } = getIfUtils(env);

  return {
    mode: ifProd("production", "development"),
    entry: {
      index: "./src/index.js"
    },
    output: {
      filename: "[name].bundle.js",
      path: resolve(__dirname, "dist")
    },
    devtool: ifNotProd("cheap-module-source-map"),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.scss$|\.css$/,
          loader: "style-loader!css-loader"
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          //All node_modules into vendors.js
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          }
        }
      }
    }
  };
};
