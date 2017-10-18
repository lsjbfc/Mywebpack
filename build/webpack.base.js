'ust strict'
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 文件夹清除工具
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let config = {}
const pagelist = (function () {
    let jsDir = path.resolve(__dirname, 'src/js/services/');
    let entryFiles = glob.sync(jsDir + '/*.js');
    let map = {};

    entryFiles.forEach(function (filePath) {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    });
    return map;
})();
const util = (function () {
    let jsDir = path.resolve(__dirname, 'src/lib');
    let entryFiles = glob.sync(jsDir + '/*.js');
    let map = {};

    entryFiles.forEach(function (filePath) {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    });
    return map;
})();
const utilname = (function () {
    let jsDir = path.resolve(__dirname, 'src/lib');
    let entryFiles = glob.sync(jsDir + '/*.js');
    let map = {};
    let name = []
    entryFiles.forEach(function (filePath) {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filename;
        // map.push({
        //     filename:[filename]
        // })
        name.push(filename)
    });
    return { util: map, name: name };
})();
console.log('util', util)
const htmlPages = (function () {
    var pageDir = path.resolve(__dirname, 'src/pages');
    var pageFiles = glob.sync(pageDir + '/*.html');
    var array = [];
    // var chunks=[ 'vendor','main']
    pageFiles.forEach(function (filePath) {
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        var chunks = ['vendor', 'main']
        // console.log('chunks',chunkarr)
        array.push(new HtmlWebpackPlugin({
            template: filePath,// path.resolve(__dirname, 'src/template/index.html'),
            filename: filename + '.html',
            chunks: ['vendor'].concat(utilname.name).concat(['main']).concat([filename]),
            chunksSortMode: function (chunk1, chunk2) {
                var order = ['vendor'].concat(utilname.name).concat(['main']).concat([filename]);
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            },
            data:new Date(),
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }));
    });
    return array;
})();
console.log('entry')
const entry = Object.assign(
    pagelist,
    utilname.util,
    {
        main: path.resolve(__dirname, 'src/main.js'),
        vendor: ['jquery'],
        // jquery:['jquery']
        // cookie:['cookie']
    }
)
config = {
    entry: entry,
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: 'http://localhost:888//',
    },
    resolve: {
        extensions: ['.js', '.css', '.png', '.jpg'],
        alias: Object.assign({},
            util,
            {
                '@lib': './src/lib',
                '@css': './src/css'
                // 'jquery':'jquery',
                // 'cookie':'./src/lib/jquery.cookie.js'

            }
        )
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }]
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.(html|htm)$/,
                use: ['html-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 200,
                            name: "images/[name]-[hash:5].[ext]"
                        }
                    }
                    // ,
                    // 'image-webpack-loader'
                ],
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        // new ExtractTextPlugin('css/[name].[chunkhash:5].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/[name][chunkhash:5].js'
        }),
        new webpack.ProvidePlugin({
            jquery: 'window.jQuery',
            $: "jquery"
        }),
        new CleanWebpackPlugin(['dist']),
        // new HtmlWebpackPlugin({
        // 	template:'./src/pages/index.html',
        // 	filename: 'index.html',
        //     chunks: [ 'vendor', 'main','cookie','index'],
        // 	// chunksSortMode: 3,
        // 	minify: {
        // 		removeComments:false,
        // 		collapseWhitespace:false
        //     }
        // })
    ].concat(htmlPages)
};



module.exports = config