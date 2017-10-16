import path from 'path';
import webpack from "webpack";
import glob from "glob";


let config={}


config={
    entry:{
        index:'./src/js/index.js'
    },
    output:{
        filename:'js/[name][chunkhase].js',
        path:path.resolve(__dirname, './dist'),
        publicPath:'./'
    },
    resolve:{
        extensions:['.js','css','.png','.jpg'],
        alias:{

        }
    }
}