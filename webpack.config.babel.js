import webpack from "webpack";
import { resolve } from "path";
import { getIfUtils, removeEmpty } from "webpack-config-utils";
import ManifestPlugin from "webpack-manifest-plugin";
import SWPrecacheWebpackPlugin from "sw-precache-webpack-plugin";
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
      // ifProd(
      //   new SWPrecacheWebpackPlugin({
      //     // By default, a cache-busting query parameter is appended to requests
      //     // used to populate the caches, to ensure the responses are fresh.
      //     // If a URL is already hashed by Webpack, then there is no concern
      //     // about it being stale, and the cache-busting can be skipped.
      //     dontCacheBustUrlsMatching: /\.\w{8}\./,
      //     filename: "service-worker.js",
      //     logger(message) {
      //       if (message.indexOf("Total precache size is") === 0) {
      //         // This message occurs for every build and is a bit too noisy.
      //         return;
      //       }
      //       console.log(message);
      //     },
      //     minify: true,
      //     navigateFallback: "",
      //     staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
      //   })
      // ),
      ifProd(
        new CopyWebpackPlugin([
          {
            from: resolve(__dirname, "src/pwa"),
            to: resolve(__dirname, "dist")
          }
        ])
      ),
      new OfflinePlugin({
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
