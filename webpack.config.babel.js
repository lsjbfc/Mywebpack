
import base from './build/webpack.base.babel.js'
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 文件夹清除工具
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs')
module.exports={
  enter:path.resolve(__dirname,'./src/js/services/index.js'),
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, './test'),
    publicPath: '/',
  },
  module:{
    rules:base.rules//[].concat(base.rules)
  },
  devtool: 'source-map',
  plugins:[
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify(env)
      }
  }),
  ]
}