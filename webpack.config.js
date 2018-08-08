const path = require('path');

module.exports = {

   entry: {
      app: path.resolve(__dirname, './assets/js/app.js')
   },
   output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'js/[name].min.js',
      chunkFilename: 'js/[name].min.js'
   },

   resolve: {
      // Alias for JS & SCSS Files access
      alias: {
         '@js': path.resolve(__dirname, 'assets/js/'),
         '@scss': path.resolve(__dirname, 'assets/scss/'),
         '@images': path.resolve(__dirname, 'dist/assets/images/'),
         '@fonts': path.resolve(__dirname, 'dist/assets/fonts/')
      }
   },

   module: {
      rules: [

         // JS & JSX
         {
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
         },

         // Csv & Xml rules
         {
            // Csv, Tsv
            test: /\.(csv|tsv)$/,
            use: ['csv-loader']
         },{
            // Xml
            test: /\.xml$/,
            use: ['xml-loader']
         }
      ]
   },

   watchOptions: {
      ignored: [
         /node_modules/,
         /vendor/
      ]
   }
}
