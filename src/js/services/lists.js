$(function(){
    const test={
        a:(err)=>{
            console.log(err)
            err='err'+err
        }
    }
    test.a('test')
    console.log(test.a('test'))
    var data=['1','2','xx']
    console.log('template',template())
    var html =template('lists',{arr:data})
})