<<<<<<< HEAD
webpackJsonp([0],[,,,,,,,,,,function(e,t,o){"use strict";(function(e){function t(e){return e&&e.__esModule?e:{default:e}}o(11),o(12),o(13);var n=o(1);t(n);o(2);var s=o(3),a=t(s);a.default.defaults.rules[1].test=/{\(([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*\)}/,console.log("template.defaults.rules[1].test",a.default.defaults.rules[1].test),console.log(e("body")),e("#header").css({background:"red"}),console.log(e.ajaxSetup);var l=(0,a.default)("my",{arr:[1,3,5]});e("#header").append(l),e.cookie("cookie",new Date),e(".button").on("click",function(t){t=t||event,console.log("e",t.currentTarget),e.ajax({url:"http://localhost:8/login.html",type:"GET",header:{token:"1524545"},data:{userName:"1",password:"sdf"},success:function(e){e.success&&console.log(e)}})})}).call(t,o(0))},function(e,t){},function(e,t){},function(e,t){}],[10]);
=======
webpackJsonp([ 0 ], [ , , , , , , , , , , function(e, t, o) {
    "use strict";
    (function(e) {
        function t(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }
        o(11), o(12), o(13);
        var n = o(1);
        t(n);
        o(2);
        var a = o(3), c = t(a);
        c["default"].defaults.rules[1].test = /{\(([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*\)}/, 
        console.log("template.defaults.rules[1].test", c["default"].defaults.rules[1].test), 
        console.log(e("body")), e("#header").css({
            "background": "red"
        });
        var s = (0, c["default"])("my", {
            "arr": [ 1, 3, 5 ]
        });
        e("#header").append(s), e.cookie("cookie", new Date()), e("#header").click(function() {
            console.log("111");
        }), e(".button").on("click", function(t) {
            t = t || event, console.log("e", t.currentTarget), e.ajax({
                "url": "http://116.62.224.22:9005/manager/marketSearch/list",
                "type": "GET",
                "data": {
                    "userName": "1",
                    "password": "sdf"
                },
                "success": function(e) {
                    e.success && console.log(e);
                }
            });
        });
    }).call(t, o(0));
}, function(e, t) {}, function(e, t) {}, function(e, t) {} ], [ 10 ]);
>>>>>>> 95c6eefb04b01770ad4e4755790bfd08c663c2d9
