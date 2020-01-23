import webpack from "webpack";
import { resolve } from "path";
import { getIfUtils, removeEmpty } from "webpack-config-utils";
import ManifestPlugin from "webpack-manifest-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import OfflinePlugin from "offline-plugin";

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
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"]
        }
      ]
    },
    plugins: removeEmpty([
      ifProd(
        new ManifestPlugin({
          fileName: "asset-manifest.json"
        })
      ),
      ifProd(
        new CopyWebpackPlugin([
          {
            from: resolve(__dirname, "src/pwa"),
            to: resolve(__dirname, "dist")
          }
        ])
      ),
      new OfflinePlugin({
        externals: ["/"],
        appShell: "/",
        ServiceWorker: {
          events: true
        }
      })
    ]),
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
