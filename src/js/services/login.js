import '../../css/register.css'
import '../../css/test.scss'
import '../../util/footer/footer.css'
import '../../css/login.css'
import main from '../../main.js'
import '../../lib/jquery.cookie.js'
import template from '../../lib/template.js'


$(function () {
    'use stict'
    $.cookie.json = true;
    $.cookie("token",null,{path:"/"})
    const token = $.cookie("token");
    const URL=main.HTTP_URL;
    console.log('url',URL)
    var run=false;
    var timer="";
    var str=""
        if(Boolean(token)){
            $.ajax({
                url:URL+"/user/user/getByToken",
                type:"get",
                headers: {
                    token:token
                },
                // async: false,
                dataType:"json",
                success:function(data){
                    if(data.success){
                        window.location="../index.html";
                    }else{
                        account()
                    }
                },
                error:function(err){
                    clearInterval(timer)
                    console.log("err",err)
                }
            })
        }else{
            account()
        }
        $.ajax({
            type: "POST",
            url: URL+"/user/user/login",
            data:{
                userName:18281575318,
                password:123456
            },
            success:(res)=>{
                console.log(res)
            },
            error:(err)=>{
                console.log(err)
            }
        })
        function account(){
            var run=false
            function login(){
                var userName=$("#username").val();
                var password=$("#password").val();
                var checked=$("#checked").prop("checked")
                var reg = /[0-9A-Za-z]{4,20}/
                var msg=userName.trim();
                if(!Boolean(userName.trim()) && !Boolean(password.trim())){
                    $(".tip").html("<i></i>请输入账号和密码")
                   
                    return;
                }
                if(!Boolean(userName.trim())){
                   
                    $(".tip").html("请输入账号")
                  
                    return;
                }
                if(!Boolean(password.trim())){
                  
                    $(".tip").html("<i></i>请输入密码")
                   
                    return;
                }
                if(msg && Boolean(password) && Boolean(userName)){
                    run=true;
                    // $("#login .ellipses").html("···")
                    timer=setInterval(function(){
                        str+="·";
                        if(str.length>3){
                            str=""
                        }
                        $("#login .ellipses").html(str) 
                    },800)
                    $.ajax({
                        type: "POST",
                        url: URL+"/user/user/login",
                        data: {userName: userName, password: password},
                        success: function (data) {
                            clearInterval(timer)
                            if(data && data.success){
                                $.cookie("token",data.data.token,
                                    {expires:1,
                                    path:"/"
                                    }
                                )
                                window.location="../index.html";
                            }else{
                                $(".tip").html('<i></i>账户名与密码不匹配，请重新输入')
                               
                            }
                            run=false;
                        },
                        error:function(error){
                            clearInterval(timer)
                            $(".tip").html("<i></i>网络连接超时")
                            $("#login .ellipses").html('') 
                            console.log(error)
                        }
                    })
                }else{
    
                }
            }
            $(".n").click(function(){
                console.log("xxx")
                $("#username").val("")
                $(this).hide()
            })
            $(".p").click(function(){
                $(this).hide()
                $("#password").val("")
            })
            $("#username").on('input propertychange',function(e){
                e=e||event;
                var val=e.target.value;
                if(val.trim()){
                    $(".n").show();
                }else{
                    $(".n").hide();
                }
            })
            $("#password").on('input propertychange',function(e){
                    e=e||event;
                    var val=e.target.value;
                    if(val.trim()){
                        $(".p").show();
                    }else{
                        $(".p").hide();
                    }
            })
            
            $("#password").on("keydown",function(e){
                e=e||event;
                if(e.which===13 &&!run){
                    login() 
                }
            })
            $("#login").on("click",function () {
                   if(!run)
                    login()
                   
            })
        }


});
