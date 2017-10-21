'ust strict'
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 文件夹清除工具
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const hotModule = new webpack.HotModuleReplacementPlugin();


const commonsJs=new webpack.optimize.CommonsChunkPlugin({
    // names: ['vendor'],
	name:'vendor',    
	filename: 'js/[name]-[hash:5].js'
});



const devServer ={
	contentBase: path.resolve(__dirname),
	compress: true,
	historyApiFallback: true,
	hot: true,
	inline: true,
	host: 'localhost', 
	port: 8088
};
let config = {}


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
        
        name.push(filename)
    });
    return { util: map, name: name };
})();


console.log('..............')
console.log('util', util)
console.log('..............')
console.log('utilname', utilname)
console.log('..............')


const htmlPages = (function () {
    var pageDir = path.resolve(__dirname, '../src/pages');
    var pageFiles = glob.sync(pageDir + '/*.art');
    var array = [];
    pageFiles.forEach(function (filePath) {
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        var chunks = ['vendor','template'].concat(utilname.name).concat(['main']).concat([filename])

        array.push(new HtmlWebpackPlugin({
            template: filePath,// path.resolve(__dirname, 'src/template/index.html'),
            filename: filename + '.html',
            inject:"body",
            // title: 'ejs',
            // data:new Date(),
            chunks: ['vendor',filename],//,'template'].concat(utilname.name).concat(['main']).concat([filename])
            chunksSortMode: function (chunk1, chunk2) {
                var order = ['vendor',filename]//.concat([filename]); //.concat(utilname.name).concat(['main']).
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





const entry = 
    Object.assign(
        pagelist,
        utilname.util,
        {
            main: path.resolve(__dirname, '../src/main.js'),
            // template:['template']
            vendor: ['jquery'],
            // arttemplate:['']
            // jquery:['jquery']
            // cookie:['cookie']
        }
    )

console.log('entry',entry)
config = {
	entry: entry,
	devServer: devServer,
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../debug'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.css','.sass', '.png', '.jpg'],
        alias: Object.assign({},
            util,
            {
                '@lib': './src/lib',
                '@css': './src/css',
                'jquery':'jquery',
                // 'cookie':'./src/lib/jquery.cookie.js'
                'template':path.resolve(__dirname,'../src/lib/template.js')
            }
        )
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
            {
				test: /\.(eot|woff|ttf|svg)$/,
				use: ['url-loader?limit=8192&name=font/[name].[ext]']//.[hash:5]
			},
            { test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                    {   
                        loader: 'css-loader', 
                        options: { 
                            importLoaders: 1,
                            minimize:false,
                            modules: false,
                            name:'font/[name].[ext]'
                            // plugins:function(){
                            //     return [
                            //      require('autoprefixer')
                            //     ]
                            //     }                        
                            } 
                        
                    },
                    'postcss-loader',
                    'autoprefixer-loader',
                  ]
                 
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
            // {
            //     test: /\.(html|htm)$/,
            //     use: ['html-loader']//,'ejs-loader'
            // },
            {
                test: /\.ejs$/,
                use:[
                    {
                        loader:'ejs-loader',//'ejs-html-loader', //
                        options: {
                            title: 'ejs',
                            season: 1,
                            episode: 9,
                            production: false//process.env.ENV === 'production'
                        }
                    },
                ],
                
            },
            {
                test: /\.(png|jpg|gif)$/i,
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
            },
            {
                test: /\.art$/,
                use:[
                    {
                        loader:'art-template-loader',
                        options: {
                            // art-template options (if necessary) 
                            // @see https://github.com/aui/art-template 
                        }
                    },
                ]
               
            },
            {
                test: require.resolve('jquery'),
                use: 'expose-loader?$!expose-loader?jquery', // jQuery and $
            }
        ]
    },
    plugins: [
        hotModule,
        new OpenBrowserPlugin({ url: 'http://localhost:8088' }),
        new ExtractTextPlugin('css/[name].css'),

        new webpack.ProvidePlugin({
            jquery: 'window.jquery',
            $: "jquery",
        
            // template:'window.template'
		}),
        // commonsJs,
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            filename: 'js/[name].js',
            minChunks:'2'
        }),
        // new HtmlWebpackPlugin({
        // 	template:'./src/pages/login.art',
        // 	filename: 'index.html',
        //     chunks: [ 'vendor', 'main','cookie','index'],
        // 	minify: {
        // 		removeComments:false,
        // 		collapseWhitespace:false
        //     }
        // }),
    ].concat(htmlPages),
    externals:{
        // jquery: 'window.$',
        // template: 'window.template'
    }
};


// var open = require("open");
// open("http://localhost:8088");

module.exports = config;