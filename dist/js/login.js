webpackJsonp([ 0 ], [ , , , , , , , , , , , , , function(o, n, e) {
    "use strict";
    (function(o) {
        function n(o) {
            return o && o.__esModule ? o : {
                "default": o
            };
        }
        e(4), e(14), e(16), e(17);
        var t = e(2), i = n(t);
        e(3);
        var r = e(1);
        n(r);
        o(function() {
            "use stict";
            function n() {
                function n() {
                    var n = o("#username").val(), i = o("#password").val(), a = (o("#checked").prop("checked"), 
                    n.trim());
                    return Boolean(n.trim()) || Boolean(i.trim()) ? Boolean(n.trim()) ? Boolean(i.trim()) ? void (a && Boolean(i) && Boolean(n) && (e = !0, 
                    r = setInterval(function() {
                        l += "·", l.length > 3 && (l = ""), o("#login .ellipses").html(l);
                    }, 800), o.ajax({
                        "type": "POST",
                        "url": t + "/user/user/login",
                        "data": {
                            "userName": n,
                            "password": i
                        },
                        "success": function(n) {
                            clearInterval(r), n && n.success ? (o.cookie("token", n.data.token, {
                                "expires": 1,
                                "path": "/"
                            }), window.location = "../index.html") : o(".tip").html("<i></i>账户名与密码不匹配，请重新输入"), 
                            e = !1;
                        },
                        "error": function(n) {
                            clearInterval(r), o(".tip").html("<i></i>网络连接超时"), o("#login .ellipses").html(""), 
                            console.log(n);
                        }
                    }))) : void o(".tip").html("<i></i>请输入密码") : void o(".tip").html("请输入账号") : void o(".tip").html("<i></i>请输入账号和密码");
                }
                var e = !1;
                o(".n").click(function() {
                    console.log("xxx"), o("#username").val(""), o(this).hide();
                }), o(".p").click(function() {
                    o(this).hide(), o("#password").val("");
                }), o("#username").on("input propertychange", function(n) {
                    n = n || event, n.target.value.trim() ? o(".n").show() : o(".n").hide();
                }), o("#password").on("input propertychange", function(n) {
                    n = n || event, n.target.value.trim() ? o(".p").show() : o(".p").hide();
                }), o("#password").on("keydown", function(o) {
                    o = o || event, 13 !== o.which || e || n();
                }), o("#login").on("click", function() {
                    e || n();
                });
            }
            o.cookie.json = !0, o.cookie("token", null, {
                "path": "/"
            });
            var e = o.cookie("token"), t = i["default"].HTTP_URL;
            console.log("url", t);
            var r = "", l = "";
            Boolean(e) ? o.ajax({
                "url": t + "/user/user/getByToken",
                "type": "get",
                "headers": {
                    "token": e
                },
                "dataType": "json",
                "success": function(o) {
                    o.success ? window.location = "../index.html" : n();
                },
                "error": function(o) {
                    clearInterval(r), console.log("err", o);
                }
            }) : n(), o.ajax({
                "type": "POST",
                "url": t + "/user/user/login",
                "data": {
                    "userName": 18281575318,
                    "password": 123456
                },
                "success": function(o) {
                    console.log(o);
                },
                "error": function(o) {
                    console.log(o);
                }
            });
        });
    }).call(n, e(0));
}, function(o, n, e) {
    var t = e(15);
    "string" == typeof t && (t = [ [ o.i, t, "" ] ]);
    var i = {
        "hmr": !0
    };
    i.transform = void 0;
    e(24)(t, i);
    t.locals && (o.exports = t.locals);
}, function(o, n, e) {
    n = o.exports = e(23)(undefined), n.push([ o.i, "nav {\n  width: 100px;\n  color: hotpink; }\n", "" ]);
}, function(o, n) {}, function(o, n) {} ], [ 13 ]);