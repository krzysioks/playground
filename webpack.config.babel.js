import { resolve } from 'path';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default env => {
    const isProd = env?.prod ?? false;

    const WebpackManifestPluginOptions = {
        fileName: 'asset-manifest.json'
    };

    return {
        mode: isProd ? 'production' : 'development',
        entry: {
            index: './src/index.js'
        },
        output: {
            filename: '[name].bundle.js',
            path: resolve(__dirname, 'dist')
        },
        devtool: !isProd ? 'cheap-module-source-map' : false,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.scss$|\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: ['file-loader']
                }
            ]
        },
        plugins: [
            isProd
                ? new WebpackManifestPlugin(WebpackManifestPluginOptions)
                : null,
            isProd
                ? new CopyWebpackPlugin({
                      patterns: [
                          {
                              from: resolve(__dirname, 'src/pwa'),
                              to: resolve(__dirname, 'dist')
                          }
                      ]
                  })
                : null
        ].filter(item => item),
        optimization: {
            splitChunks: {
                cacheGroups: {
                    //All node_modules into vendors.js
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        }
    };
};
