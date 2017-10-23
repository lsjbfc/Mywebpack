import template from './lib/template.js'

export const HTTP_URL='http://116.62.224.22:9005';
export const IMGURL = "http://ffsh-oss.oss-cn-beijing.aliyuncs.com/"; 


template.defaults.rules[0].test = /<$(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)$>/;
template.defaults.rules[1].test = /{\(([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*\)}/;

$.ajaxSetup({
    headers:{
        token:'NDIzYzAxMjE5YjEzOWQyZDZiZWY5NTdmNmEwYmMzNzQ='
    },
    error:(err)=>{
        console.error('err',err)
    }
})
// module.exports={
//     HTTP_URL,
//     IMGURL
// }

// export { HTTP_URL, IMGURL };
// export
// export const a=1;