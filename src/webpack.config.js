const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  // 打包入口
  entry: path.join(__dirname, 'js/app/index.js'),
  // 文件出口设置
  output: {
    path: path.join(__dirname, '../public/'),
    filename: 'index.js'
  },
  // less文件和js文件loader处理
  module: {
    rules: [{
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "less-loader", "postcss-loader"]
      }) //把 css 抽离出来生成一个文件
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
      }
    }]
  },
  // 解决路径问题 
  resolve: {
    alias: {
      jquery: path.join(__dirname, 'js/lib/jquery.min.js'),
      module: path.join(__dirname, 'js/module'),
      less: path.join(__dirname, 'less')
    }
  },
  // 相关插件设置
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new ExtractTextPlugin('stylesheets/index.css'),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer,
        ]
      }
    }),
    // 打包压缩设置
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //   },
    //   output: {
    //     comments: false,
    //   }
    // })
  ]
}