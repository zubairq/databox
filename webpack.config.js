var path = require('path')
var webpack = require('webpack')

var ip = require("ip");
console.dir ( ip.address() );

console.log('addr: '+ ip.address());
var hostaddress = ip.address();

module.exports = {
  entry: ['babel-polyfill', './src/main.js'],
  output: {
    path: path.resolve(__dirname, './public/dist'),
    publicPath: '/public/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this nessessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    proxy: {
      '/db': {
        target: 'http://' + hostaddress,
        secure: false
      },
      '/db/system_settings/': {
        target: 'http://' + hostaddress,
        secure: false
      },
      '/open_query_in_native_app': {
        target: 'http://' + hostaddress,
        secure: false
      },
      '/getresult': {
        target: 'http://' + hostaddress,
        secure: false
      },
      '/getqueryresult': {
        target: 'http://' + hostaddress,
        secure: false
      },
      '/scanharddisk': {
        target: 'http://' + hostaddress,
        secure: false
      },
      '/stopscanharddisk': {
        target: 'http://' + hostaddress,
        secure: false
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
