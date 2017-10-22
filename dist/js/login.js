webpackJsonp([ 2 ], {
    "20": function(e, n, o) {
        "use strict";
        (function(e) {
            function n(e) {
                return e && e.__esModule ? e : {
                    "default": e
                };
            }
            var t = arguments;
            o(4), o(7), o(8), o(9), o(10);
            var c = o(2);
            n(c);
            o(3);
            var s = o(1), u = n(s);
            console.log("template.defaults.rules[1].test", u["default"].defaults.rules[1].test), 
            console.log(e("body")), e("#header").css({
                "background": "red"
            });
            var l = (0, u["default"])("my", {
                "arr": [ 1, 3, 5 ]
            });
            e("#header").append(l), e.cookie("cookie", new Date()), e("#header").click(function() {
                console.log("111");
            }), e(".button").on("click", function(n) {
                n = n || event, console.log("e", n.currentTarget), e.ajax({
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
            }), function(e) {
                return new Promise(function(n, o) {
                    setTimeout(n, e, "done");
                });
            }(1e3).then(function(e) {
                console.log(e);
            });
            var r = new Proxy({}, {
                "get": function(e, n, o) {
                    return console.log("getting " + n + "!"), Reflect.get(e, n, o);
                },
                "set": function(e, n, o, t) {
                    return console.log("setting " + n + "!"), Reflect.set(e, n, o, t);
                }
            });
            console.log(r), r.count = 1, ++r.count;
            var a = function(e) {
                undefined.a = t[0], console.log("1", undefined.a);
            }, i = function(e) {};
            i.bind(a);
        }).call(n, o(0));
    }
}, [ 20 ]);