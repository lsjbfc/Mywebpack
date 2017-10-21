console.log('main.js')
// import template from '../../lib/template.js'
const HTTP_URL='192.168.1.192:9005';
// exp  
// const temrender=(options)=>{
//     let data=options.data||'';
//     let remove=options.remove||false;
//     let insertion=options.insertion;
//     let template=options.template||''
//     let html=template('template')
// }
import template from './lib/template.js'
template.defaults.rules[1].test = /{\(([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*\)}/;
$.ajaxSetup({
    headers:{
        token:'NDIzYzAxMjE5YjEzOWQyZDZiZWY5NTdmNmEwYmMzNzQ='
    },
    error:(err)=>{
        console.log('err',err)
    }
})
// $.ajaxSetup({
//     headers:{
//         token:'token'
//     }
// })
module.exports={
    HTTP_URL
}