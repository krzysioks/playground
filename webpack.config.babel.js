import webpack from "webpack";
import { resolve } from "path";

import { getIfUtils, removeEmpty } from "webpack-config-utils";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";

export default env => {
  const { ifProd, ifNotProd } = getIfUtils(env);

  return {
    mode: ifProd("production", "development"),
    entry: {
      index: "./src/index.js"
      //   playground: "./src/Playground.js",
      //   taskMainView: "./src/component/TaskMainView.js",
      //   taskLogin: "./src/component/TaskLogin.js",
      //   taskRegister: "./src/component/TaskRegister.js"
    },
    output: {
      filename: "[name].bundle.js",
      path: resolve(__dirname, "dist")
    },
    devtool: ifNotProd("cheap-module-source-map"),
    plugins: [
      ifProd(
        new CompressionPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.(js|json|css)$/,
          deleteOriginalAssets: true
        })
      )
    ],
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
        // chunks: "all"
        // maxSize: 200000
        cacheGroups: {
          //All node_modules into vendors.js
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          }
        }
      },
      minimizer: removeEmpty([
        ifProd(
          new UglifyJsPlugin({
            cache: true,
            parallel: true
          })
        )
      ])
    }
  };
};
