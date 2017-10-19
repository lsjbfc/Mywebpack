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
$.ajaxSetup({
    headers:{
        token:'1111'
    },
    error:(err)=>{
        console.log('err',err)
    }
})
module.exports={
    HTTP_URL
}