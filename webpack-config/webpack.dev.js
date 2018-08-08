const merge = require('webpack-merge');
const common = require('../webpack.config.js');

const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {

   mode: 'development',
   devtool: 'eval', // Fast compilation +++
   devtool: 'inline-source-map', // Lower(better) compilation +

   performance: {
      // hints: 'warning' // Give a better return warning(use to test performance)
   },

   optimization: {
      splitChunks: {
         chunks: 'all',
         cacheGroups: {
            styles: {
               name: 'styles',
               test: /\.css$/,
               chunks: 'all',
               enforce: true
            }
         }
      }
   },

   plugins: [
      // Extract css
      new MiniCssExtractPlugin({
         filename: 'css/[name].min.css',
         chunkFilename: 'css/[id].min.css'
      })
   ],

   module: {
      rules: [

         // (LE | SA | SC | C )SS
         {
            test: /\.(le|sa|sc|c)ss$/,
            use: [
               'style-loader',
               MiniCssExtractPlugin.loader,
               'css-loader',
               // 'postcss-loader',
               'sass-loader'
            ]
         },

         // Files rules
         {
            test: /\.(png|jpg|tiff|gif|svg)$/,
            use: [{
               loader: 'url-loader',
               options: {
                  limit: 8192,
                  name: '[name].[ext]',
                  outputPath: '/assets/images/',
                  publicPath: '../assets/images/',
                  context: path.resolve(__dirname, './dist/assets/images/')
               }
            }]
         },

         // Fonts rules
         {
            test: /\.(woff(2)?|eot|ttf|ttc|otf|odttf)$/,
            use: [{
               loader: 'url-loader',
               options: {
                  limit: 8192,
                  name: '[name].[ext]',
                  outputPath: '/assets/fonts/',
                  publicPath: '../assets/fonts/',
                  context: path.resolve(__dirname, './dist/assets/fonts/')
               }
            }]
         }
      ]
   }
});
