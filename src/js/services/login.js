import '../../css/register.css'
import '../../css/login.css'
import main from '../../main.js'
import  '../../lib/jquery.cookie.js'
import template from '../../lib/template.js'

template.defaults.rules[1].test = /{\(([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*\)}/;

console.log('template.defaults.rules[1].test',template.defaults.rules[1].test)

console.log($('body'))
$('#header').css({
    'background':'red'
})

// console.log(main.HTTP_URL)

var htm=template('my',{arr:[1,3,5]})
$('#header').append(htm)

$.cookie('cookie',new Date())
// $.ajax({
//     url:main.HTTP_URL+"/user/user/login",
//     type:"GET",
//     headers:{
//         token:''
//     },
//     data: {userName: '1', password: 'sdf'},
//     success:function(res){
//         if(res.success){
//             console.log(res)
//         }
//     },
//     error:(err)=>{
//         console.log(err)
//     }
// })
