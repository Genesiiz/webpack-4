const merge = require('webpack-merge');
const common = require('../webpack.config.js');

const path = require('path');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');

let modernizrConfig = {

   'options': [
      'setClasses'
   ],
   'feature-detects': [
      'input',
      'canvas',
      'css/resize',
      'css/objectfit',
      'css/cssgrid',
      'ie8compat'
   ],
   filename: 'js/modernizr.bundle.js'
}

module.exports = merge(common, {

   mode: 'production',
   devtool: 'none',
   // devtool: 'source-map',

   performance: {
      // hints: 'error' // Give a better return error(attention to use: nice to test performance)
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
      },
      minimizer: [
         new UglifyJsPlugin({
            cache: true,
            parallel: 4,
            sourceMap: true // Set to true if you want JS source maps
         }),
         new OptimizeCSSAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { autoprefixer: { remove: false }, discardComments: { removeAll: true } }
         })
      ]
   },

   plugins: [
      // Extract css
      new MiniCssExtractPlugin({
         filename: 'css/[name].min.css',
         chunkFilename: 'css/[id].min.css'
      }),
      new ModernizrWebpackPlugin(modernizrConfig)
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
               'postcss-loader',
               'sass-loader'
            ]
         },

         // Files rules
         {
            test: /\.(png|jpg|tiff|gif|svg)$/,
            use: [{
               loader: 'file-loader',
               options: {
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
               loader: 'file-loader',
               options: {
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
