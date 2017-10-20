'ust strict'
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 文件夹清除工具
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs')
// const precss = require('precss');

let config = {}
const uglifyJs = new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {
        properties: false,
        // warnings: false,
        warnings: false,
        // 删除console
        drop_console: false,
        screw_ie8: false
    },
    output: {
        beautify: true,
        quote_keys: true
    },
    sourceMap: false,
    mangle: {
        screw_ie8: false
    }
});
const pagelist = (function () {
    let jsDir = path.resolve(__dirname, '../src/js/services/');
    let entryFiles = glob.sync(jsDir + '/*.js');
    let map = {};

    entryFiles.forEach(function (filePath) {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    });
    return map;
})();
const util = (function () {
    let jsDir = path.resolve(__dirname, '../src/lib');
    let entryFiles = glob.sync(jsDir + '/*.js');
    let map = {};

    entryFiles.forEach(function (filePath) {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    });
    return map;
})();
const utilname = (function () {
    let jsDir = path.resolve(__dirname, '../src/lib');
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
    return {
        util: map,
        name: name
    };
})();
console.log('util', util)
const htmlPages = (function () {
    var pageDir = path.resolve(__dirname, '../src/pages');
    var pageFiles = glob.sync(pageDir + '/*.art');
    var array = [];
    // var chunks=[ 'vendor','main']
    pageFiles.forEach(function (filePath) {
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        var chunks = ['vendor', 'main']
        // console.log('chunks',chunkarr)
        array.push(new HtmlWebpackPlugin({
            template: filePath, // path.resolve(__dirname, 'src/template/index.html'),
            filename: filename + '.html',
            inject: "body",
            // title: '',
            // data: new Date(),
            chunks: ['vendor', 'compatible', 'main', filename], //.concat(utilname.name).concat(['main']).concat([filename])
            chunksSortMode: function (chunk1, chunk2) {
                var order = ['vendor', 'compatible', 'main', filename]; //.concat([]).concat([filename]) .concat(utilname.name)
                var order1 = order.indexOf(chunk1.names[0]);
                var order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            },
            minify: {
                removeComments: false,
                collapseWhitespace: false
            }
        }));
    });
    return array;
})();
console.log('entry')
deleteall(path.resolve(__dirname, '../dist'))


const entry = Object.assign({},
    pagelist,
    utilname.util, {
        main: path.resolve(__dirname, '../src/main.js'),
        vendor: ['jquery'],
        compatible: [
            path.resolve(__dirname, '../src/lib/es5-shim.min.js'),
            path.resolve(__dirname, '../src/lib/es5-sham.min.js'),
            // path.resolve(__dirname, '../src/lib/es5-shim.min.js'),
        ]
        // jquery:['jquery']
        // cookie:['cookie']
    }
)

console.log('entry', entry)

config = {
    entry: entry,
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.css', '.sass', '.png', '.jpg'],
        alias: Object.assign({},
            util, {
                '@lib': './src/lib',
                '@css': './src/css'
                // 'jquery':'jquery',
                // 'cookie':'./src/lib/jquery.cookie.js'

            }
        )
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }]
            },
            {
                test: /\.(eot|woff|ttf|svg)$/,
                use: ['url-loader?limit=8192&name=font/[name].[hash:16].[ext]']
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                minimize: false,
                                modules: false,
                                name: 'font/[name].[ext]'
                            }
                        },
                        // 'postcss-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('autoprefixer')({
                                        browsers: ['ie>=8', '>1% in CN'] //'ie>=8','>1% in CN' last 2 versions

                                    })
                                ]
                            }
                        },
                        'autoprefixer-loader',
                    ]

                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            },
            // {
            //     test: /\.js$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use: [{
            //        loader: 'babel-loader',
            //     //    enforce: 'post',
            //        options: {
            //           presets: ['es3ify-loader']//,'es3ify-loader' 'es2015-loose'
            //            //    "plugins": [
            //     //     'transform-es3-member-expression-literals',
            //     //     'transform-es3-property-literals'
            //     //     ]
            //        },

            //     }]
            //  },
            // {

            //         test: /\.js$/,
            //         use:[{
            //             loader:'babel',
            //             options:{
            //                 presets: ["es2015"],
            //                 // plugins: [
            //                 //     "transform-es3-property-literals",
            //                 //     "transform-es3-member-expression-literals",
            //                 //     "transform-es2015-modules-simple-commonjs"
            //                 // ]
            //             },

            //         }] 



            // },
            {
                test: /\.(html|htm)$/,
                use: [

                    {
                        loader: 'html-loader',
                        options: {
                            attrs: [':src'],
                            minimize: true,
                            removeComments: false,
                            collapseWhitespace: false
                        }
                    }

                ]
            },
            // {
            //     test: /\.ejs$/,
            //     use: [

            //         {
            //             loader: 'ejs-loader'
            //         },

            //     ]
            // },
            {
                test: /\.ejs$/,
                use: [{
                        loader: 'ejs-loader', //'ejs-html-loader', //
                        options: {
                            attrs: [':src'],
                            title: 'ejs',
                            season: 1,
                            episode: 9,
                            production: false //process.env.ENV === 'production'
                        }
                    },
                    // 'ejs-render'
                ],

            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 200,
                        name: "images/[name]-[hash:5].[ext]"
                    }
                }, 'image-webpack-loader'],
            },
            {
                test: /\.art$/,
                use: [{
                    loader: 'art-template-loader',
                    options: {
                        // art-template options (if necessary) 
                        // @see https://github.com/aui/art-template 
                    }
                }, ]

            },
            {
                test: require.resolve('jquery'),
                use: 'expose-loader?$!expose-loader?jQuery', // jQuery and $
            }
        ],
        // htmlLoader: {
        //     ignoreCustomFragments: [/\{\{.*?}}/],
        //     root: path.resolve(__dirname, '../dist'),
        //     attrs: ['img:src', 'link:href']
        // },
    },
    devtool: 'source-map',
    plugins: [
        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         postcss: function(){
        //             return [
        //                 require("autoprefixer")({
        //                     browsers: ['last 5 versions']
        //                 })
        //             ]
        //         }
        //     }
        // }),
        uglifyJs,
        // 'autoprefixer': {browsers: 'last 5 version'},
        new ExtractTextPlugin('css/[name].[chunkhash:5].css'),
        // new ExtractTextPlugin('css/[name].[chunkhash:5].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/[name][chunkhash:5].js',
            minChunks: '2'
        }),
        new webpack.ProvidePlugin({
            jquery: 'window.jQuery',
            $: "jquery"
        }),
        new CleanWebpackPlugin([path.resolve(__dirname, '../dist')]), //删除dist目录
        new webpack.LoaderOptionsPlugin({ //浏览器加前缀            options: {
            postcss: [require('autoprefixer')({
                browsers: ['last 5 versions']
            })]
        }),
        // new HtmlWebpackPlugin({
        //     template:path.resolve(__dirname, '../src/pages/index.ejs'),
        //     filename:"index.html",
        //     publicPath:"xxx",
        //     inject:"body",
        //     title:"首页",
        //     data:new Date(),
        //     minify:{
        //       // collapseWhitespace:true,
        //       // removeComments:true
        //     },
        //     chunks:["index"] 
        // }),
    ].concat(htmlPages),
    externals: {
        // 'jquery':'jquery'
        // 'cookie':'./src/lib/jquery.cookie.js',
        // 'template': path.resolve(__dirname,'../src/lib/jquery.cookie.js'),
        // 'cookie': path.resolve(__dirname,'../src/lib/template.js')
    }
};

function deleteall(path) { //删除dist目录及目录下的文件方法
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse  
                deleteall(curPath);
            } else { // delete file  
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};


module.exports = config