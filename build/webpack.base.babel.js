
const rules= [
    {
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
       use: ['url-loader?limit=8192&name=font/[name].[ext]'] //.[hash:5]
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
                //    name: 'font/[name].[ext]'
                }
             },
             {  
                loader: 'postcss-loader',  
                options: {  
                    plugins:(loader)=>[  
                        require('autoprefixer')({  
                            browsers:['ie>=8','>1% in CN']  //'ie>=8','>1% in CN' last 2 versions
                            
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
             presets: ['es2015-loose']
          }
       }]
    },
    // {
    //    test: /.js$/,
    //    exclude: /(node_modules|bower_components)/,
    //    enforce: 'post', // post-loader处理
    //    use:[{
    //       loader: 'es3ify-loader'
    //    }]
    // },
    // {
    //     test: /\.(html|htm)$/,
    //     use: ['html-loader']//,'ejs-loader'
    // },
    {
       test: /\.ejs$/,
       use: [{
          loader: 'ejs-loader', //'ejs-html-loader', //
          options: {
             title: 'ejs',
             season: 1,
             episode: 9,
             production: process.env.ENV === 'production'?false:true //false
          }
       }, ],

    },
    {
       test: /\.(png|jpg|gif)$/i,
       use: [{
             loader: "url-loader",
             options: {
                limit: 200,
                name: "images/[name]-[hash:5].[ext]"
             }
          }
          ,'image-webpack-loader'
       ],
    },
    {
       test: /\.art$/,
       use: [{
          loader: 'art-template-loader',
          options: {
             // art-template options (if necessary) 
             // @see https://github.com/aui/art-template 
          }
       }
    ]

    },
    {
       test: require.resolve('jquery'),
       use: 'expose-loader?$!expose-loader?jquery', // jQuery and $
    },
    {
        test:/\.htc$/,
        use:[{
            loader:'file-loader',
            options:{
                name:"css/IEcss/[name]-[chunkhash:5].[ext]"
            }
        }]
    }
 ],
export {
    rules
}