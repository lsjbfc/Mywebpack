import '../../css/register.css'
import '../../css/login.css'
// import header from '../../util/header/header.ejs'
const runtime = require('art-template/lib/runtime');
// const template =require('art-template')
const $ = require('jquery');
const cookie=require('jquery.cookie')
console.log('I am login')
console.log('cookie',$.cookie('cookie'))
$('#header').html(header)
$.ajax({

})

cookie('a','aa')
$(function(){
    console.log('header',template)
    
    console.log('header',header)
    console.log('runtime',runtime)
    runtime.dateFormat = function(date, format){ 
        console.log('data',data)
        console.log('format',format)        
    };
})