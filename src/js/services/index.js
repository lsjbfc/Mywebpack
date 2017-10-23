import '../../css/register.css'
import '../../css/common.css'
import '../../css/index.css'
import {HTTP_URL,IMGURL,a} from '../../main.js'
import '../../lib/jquery.cookie.js'
import template from '../../lib/template.js'

template.defaults.rules[0].test = /<$(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)$>/;
template.defaults.rules[1].test = /{\(([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*\)}/;

console.log('main',a)
$(function(){
    //兼容ie
    // if (!document.addEventListener) {
    // // IE6~IE8
    // document.write('<script src="../lib/ieBetter-min.js"><\/script>'); 
    // }
    $.support.cors = true;
    $.cookie.json = true;
    var token=$.cookie("token");
    console.log(token);
    // const HTTP_URL=main.HTTP_URL
    // const IMGURL=main.IMGURL
    console.log('HTTP_URL',HTTP_URL)
    //获取轮播图的图片
    $.ajax({
        url: HTTP_URL + "/manager/marketBanner/list",
        type: "get",
        data: {
            type: 1
        },
        success: function(res){
            if(res.success){
                var html = "";
                var widthsimg = "?x-oss-process=image/resize,m_fixed,h_400,w_950";
                res.data.forEach(function(curr){
                    html += '<li><a href="' + curr.url + '"><img src="' + IMGURL + curr.path + '"  alt=""></a></li>'
                });
                $("#imgbox").empty().append(html);
                //轮播图的原生写法
                var $imgs = $("#imgbox li"),
                len = $imgs.length,
                imgWidth = $imgs.first().outerWidth(),
                nextIndex = 2,
                currentIndex = 1,
                Carouselflag = false;//标记运动是否运动结束;
                len += 2;
                $("#imgbox").css({"width":imgWidth*len,"left":-imgWidth});
                var _first = $imgs.first().clone(true),
                    _last = $imgs.last().clone(true);
                _first.appendTo("#imgbox");
                _last.prependTo("#imgbox");
                $("#imgbox").hover(function(){
                    clearInterval(timer);
                },function(){
                    timer = setInterval(move,3000);
                });
                //取消双击选取文本的默认行为
                $("#container").on("selectstart",function(){
                    return false;
                });
                //动态添加小圆点
                var html = "";
                for(var i=0;i<len-2;i++){
                    html += "<div></div>"
                }
                $(html).appendTo("#circle");
                $("#circle div:eq(0)").addClass("on");
                //给小圆点添加鼠标移入的效果
                $("#circle").delegate("div","mouseover",function(){
                    var _index = $(this).index();
                    nextIndex = _index + 1;
                    move();
                    Carouselflag = true;
                });
                //让图片和小圆点自己运动
                var timer = setInterval(move,3000);
                //运动函数
                function move(){
                    if(Carouselflag){
                        return;
                    }
                    var _left = -imgWidth * nextIndex;
                    currentIndex = nextIndex;
                    nextIndex++;
                    var circleIndex = currentIndex - 1;
                    if(circleIndex == len - 2){
                        circleIndex = 0;
                    }
                    if(circleIndex == -1){
                        circleIndex = len - 3;
                    }
                    $("#circle div").eq(circleIndex).addClass("on").siblings().removeClass("on");
                    $("#imgbox").animate({left:_left},"normal",function(){
                        Carouselflag = false;
                        if(nextIndex == len){
                            nextIndex = 2;
                            currentIndex = 1;
                            $("#imgbox").css("left", -imgWidth);
                        }
                        if(currentIndex == 0){
                            nextIndex = len - 3;
                            currentIndex = len - 2;
                            $("#imgbox").css("left", -imgWidth*currentIndex);
                        }
                    });
                }
            }
        }
    })
        //走马灯效果的半成品
        function lighting(){
            //走马灯效果
            var $imgs = $("#items li"),
                len = $imgs.length,
                imgWidth = $imgs.first().outerWidth(),
                flag = false;//标记运动是否运动结束;
                $("#items").css({"width":imgWidth * len,"left":-imgWidth});
                // console.log("imgWidth",imgWidth);
            var prevClickFlag = false,nextClickFlag = false;
                $('.prev').on("click",function(){
                    if(prevClickFlag){
                        return
                    };
                    prevClickFlag = true;
                    var left = Math.floor($("#items").position().left);
                    if(left >= 0){
                        $("#hot_recom .prev").css("opacity",0.5);
                        prevClickFlag = false;
                        return ;
                    }else{
                        var _left = left+imgWidth;
                        $("#items").animate({"left": _left},"normal",function(){
                            prevClickFlag = false;
                            if(_left >= 0){
                                $("#hot_recom .prev").css("opacity",0.5);
                            }else{
                                $("#hot_recom .prev").css("opacity",1);
                                $("#hot_recom .next").css("opacity",1);
                            }
                        });
                    }
                });
                
                $('.next').on("click",function(){
                    if(nextClickFlag){
                        return 
                    };
                    nextClickFlag = true
                    var left = Math.floor($("#items").position().left);
                    if(left <= -(len - 5) * imgWidth ){
                        $("#hot_recom .next").css("opacity",0.5);
                        nextClickFlag = false;
                        return
                    }else{
                        var _left = left-imgWidth
                        $("#items").animate({"left": _left},"normal",function(){
                            nextClickFlag = false;
                            if(_left <= -(len - 5) * imgWidth){
                                $("#hot_recom .next").css("opacity",0.5);
                            }else{
                                $("#hot_recom .prev").css("opacity",1);
                                $("#hot_recom .next").css("opacity",1);
                            }
                        });
                    } 
                })
        }
        //获取栏目的分类.
        var id = '';
        var href = location.href.slice(location.href.lastIndexOf("/")+1,location.href.lastIndexOf("/").length);
        console.log(href);
        $.ajax({
            url: HTTP_URL + "/manager/homepageColumn/list",
            cache:false,
            type:"get",
            data:{
                "url": HTTP_URL + "/manager/homepageColumn/list"
            },
            success:function(res){
                // alert("success");
                if(res.success){
                    // console.log(JSON.stringify(res.data));
                    var data = {arr:res.data}
                    var html = template("product_template", data);
                    $(".nav").eq(0).append(html);
                    $(".list1").on("click",function(e){
                    });
                    var arr,address;
                    res.data.forEach(function(curr,idx){
                        arr = curr.ahref.split("/");
                        address = arr[arr.length - 1];
                        if( href.indexOf(address) !== -1 ){
                            id = curr.id;
                        }
                    });
                    if(id != ''){
                        console.log(id);
                        $.ajax({
                            url: HTTP_URL + "/manager/goodsCategory/findByColumnId",
                            type:"get",
                            data:{columnId:id},
                            success:function(res){
                                if(res.success){
                                    //模板引擎
                                    var html2 = template("nav",{lists:res.data});
                                    $(".sort  ul").append(html2);
                                    var html3 = template("sublists",{sublists: res.data});
                                    $(".content_box").append(html3);
                                    $(".nav_container li:last-child").css("border-bottom","none");
                                    //点击跳转到相应的页面;
                                    $(".sort").on("click",".text h2,.text p a,.list2 a",function(){
                                        var id = $(this).attr("name");
                                        window.open("../html/list.html?"+ "id=" + id)
                                    })
                                    //给一级导航添加hover效果
                                    $(".sort ul li .text h2").on("mouseover",function(){
                                        $(this).css("color","#54c46c");
                                    });
                                    $(".sort ul li .text h2").on("mouseout",function(){
                                        $(this).css("color","#fff");
                                    })
                                    //控制导航栏的多余显示与隐藏；
                                    $(".sort .text p").find("span:last").hide();
                                    $(".sort .text p").each(function(index,curr){
                                        var len = $(this).find("a").text().length;
                                        // console.log(len);
                                        if(len > 11){
                                            $(this).find("a:last").hide();
                                            $(this).find("span").eq(1).hide();
                                        }
                                    })
                                    //楼层导航效果;
                                    var winHeight = $(window).height(),
                                        autoScroll = false;
                                    $(".nav_container li").on("mouseenter",function(){
                                        var img = "#AE7247 url(" + IMGURL + $(this).attr("icon")+ "?x-oss-process=image/resize,m_fixed,h_30,w_30" + ") no-repeat center";
                                        $(this).css("background",img);
                                    });
                                    $(".nav_container li").on("mouseleave",function(){
                                        if($(this).hasClass("clicked")){
                                            return 
                                        }
                                        var img = "url(" + IMGURL + $(this).attr("viceIcon")+ "?x-oss-process=image/resize,m_fixed,h_30,w_30" + ") no-repeat center";
                                        $(this).css("background",img);
                                    });
                                        // height = $(".list_title :first").offset().top;
                                    $(window).on("scroll",function(){
                                        if (autoScroll){
                                            return;
                                        }
                                        var _scrollTop = $(window).scrollTop();
                                        $(".list_title").each(function(index, element){
                                            // 获取当前遍历到楼层之前布局结构的高度
                                            var height = $(".list_title").eq(index).offset().top;
                                            var viceIcon ="url(" + IMGURL + $(".nav_container li").eq(index).attr("viceIcon")+ "?x-oss-process=image/resize,m_fixed,h_30,w_30" + ") no-repeat center";
                                            var icon ="#AE7247 url(" + IMGURL + $(".nav_container li").eq(index).attr("icon")+ "?x-oss-process=image/resize,m_fixed,h_30,w_30" + ") no-repeat center";
                                            // 判断侧边栏该显示还是隐藏汉字内容
                                            if (_scrollTop > height - winHeight / 2) {

                                                //在跳到另一层楼层导航时,先把所有的楼层的重新添加一遍原来的背景图;
                                                $(".nav_container li").each(function(idx,curr){
                                                    $(this).css("background","url(" + IMGURL + $(".nav_container li").eq(idx).attr("viceIcon")+ "?x-oss-process=image/resize,m_fixed,h_30,w_30" + ") no-repeat center")
                                                })
                                                //再添加新的滚到的楼层的背景图;
                                                $(".nav_container li").eq(index).css("background",icon);
                                            }
                                        });
                                    })
                                    //给每一个楼层导航添加点击事件
                                    $(".nav_container").on("click","li",function(){
                                        autoScroll = true
                                        var index = $(this).index();
                                        var icon ="#AE7247 url(" + IMGURL + $(".nav_container li").eq(index).attr("icon")+ "?x-oss-process=image/resize,m_fixed,h_30,w_30" + ") no-repeat center";
                                        var currHeight = $(".list_title").eq(index).offset().top - winHeight / 4;
                                        // console.log(currHeight)
                                        $(this).addClass("clicked").siblings().removeClass("clicked");
                                        
                                        $(".nav_container li").each(function(idx,curr){
                                            $(this).css("background","url(" + IMGURL + $(".nav_container li").eq(idx).attr("viceIcon")+ "?x-oss-process=image/resize,m_fixed,h_30,w_30" + ") no-repeat center")
                                        })
                                        //再添加新的滚到的楼层的背景图;
                                        $(".nav_container li").eq(index).css("background",icon);
                                        autoScroll = true;
                                        $("html,body").stop().animate({scrollTop : currHeight}, 500, function(){
                                            autoScroll = false;
                                        });
                                    })
                                    //给左边导航栏设置动态的定位位置。
                                    $(window).resize(function(){
                                        
                                        var winWidth = $(window).width();
                                        if(winWidth < 1200){
                                            $(".table_left .nav_container").css({"left":10,top:400});
                                        }else if(winWidth > 1200 && winWidth < 1400){
                                            $(".table_left .nav_container").css({"left":20,top:400});
                                        }else{
                                            $(".table_left .nav_container").css({"left":110,top:400});
                                        }
                                    })
                                }
                                $.ajax({
                                    url: HTTP_URL + "/manager/goods/queryVoGoods",
                                    type: "get",
                                    data: {
                                        columnId: id
                                    },
                                    dataType: "json",
                                    success: function(res){
                                        if(res.success){
                                            res.data.forEach(function(curr,idx){
                                                    var html = '';
                                                    if(curr.length >0 ){
                                                        curr.forEach(function(curr2){
                                                            html += 
                                                            "<li class='list' goodsId=" + curr2.goodsId + " specId=" + curr2.specId + ">" +
                                                            "<img src=" + IMGURL + curr2.goodsImg + "?x-oss-process=image/resize,m_fixed,h_108,w_108" + " alt=''>" +
                                                            "<p class='title'>"+ curr2.goodsName + "</p>"+
                                                            "<p class='text'>" + curr2.goodsTitle + "</p>" + 
                                                            "<p class='price'>¥ " + curr2.salePrice + "</p></li>";
                                                        })
                                                    }
                                                    $(".thirdList").eq(idx).append(html);
                                            })
                                            $(".thirdList").on("click","li",function(){
                                                var goodsId = $(this).attr("goodsId"),
                                                    specId = $(this).attr("specId");
                                                    // window.location = "../html/detail.html?" + "specId=" + specId;
                                                window.open("../html/detail.html?" + "specId=" + specId);
                                            })
                                        }
                                    }
                                })
                            }
                        });
                        $.ajax({
                            url: HTTP_URL + "/manager/goods/queryGoods?page=1&limit=7",
                            type: "get",
                            headers: {token:token},
                            success: function(res){
                                if(res.success){
                                    var data = res.data.list;
                                    var html = template("recomLists",{lists: data});
                                    $("#items").append(html);
                                    $("#items").on("click",".item",function(){
                                        var id = $(this).attr("nameId");
                                        window.location = "../html/detail.html?specId=" + id;
                                    })
                                    lighting();
                                }else{

                                }
                            }
                        })
                    }
                }
            },
            error:function(error){
                // alert(error);
                // console.log(error)
            }
        });

})