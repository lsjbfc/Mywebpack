webpackJsonp([ 2 ], {
    "5": function(t, e, o) {
        "use strict";
        (function(t) {
            function e(t) {
                return t && t.__esModule ? t : {
                    "default": t
                };
            }
            o(4), o(8), o(9);
            var n = o(2), i = e(n);
            o(3);
            var s = o(1), a = e(s);
            a["default"].defaults.rules[0].test = /<$(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)$>/, 
            a["default"].defaults.rules[1].test = /{\(([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*\)}/, 
            t(function() {
                function e() {
                    var e = t("#items li"), o = e.length, n = e.first().outerWidth();
                    t("#items").css({
                        "width": n * o,
                        "left": -n
                    });
                    var i = !1, s = !1;
                    t(".prev").on("click", function() {
                        if (!i) {
                            i = !0;
                            var e = Math.floor(t("#items").position().left);
                            if (e >= 0) return t("#hot_recom .prev").css("opacity", .5), void (i = !1);
                            var o = e + n;
                            t("#items").animate({
                                "left": o
                            }, "normal", function() {
                                i = !1, o >= 0 ? t("#hot_recom .prev").css("opacity", .5) : (t("#hot_recom .prev").css("opacity", 1), 
                                t("#hot_recom .next").css("opacity", 1));
                            });
                        }
                    }), t(".next").on("click", function() {
                        if (!s) {
                            s = !0;
                            var e = Math.floor(t("#items").position().left);
                            if (e <= -(o - 5) * n) return t("#hot_recom .next").css("opacity", .5), void (s = !1);
                            var i = e - n;
                            t("#items").animate({
                                "left": i
                            }, "normal", function() {
                                s = !1, i <= -(o - 5) * n ? t("#hot_recom .next").css("opacity", .5) : (t("#hot_recom .prev").css("opacity", 1), 
                                t("#hot_recom .next").css("opacity", 1));
                            });
                        }
                    });
                }
                t.support.cors = !0, t.cookie.json = !0;
                var o = t.cookie("token");
                console.log(o);
                var n = i["default"].HTTP_URL, s = i["default"].IMGURL;
                console.log("HTTP_URL", n), t.ajax({
                    "url": n + "/manager/marketBanner/list",
                    "type": "get",
                    "data": {
                        "type": 1
                    },
                    "success": function(e) {
                        if (e.success) {
                            var o = function() {
                                if (!d) {
                                    var e = -c * r;
                                    l = r, r++;
                                    var o = l - 1;
                                    o == a - 2 && (o = 0), -1 == o && (o = a - 3), t("#circle div").eq(o).addClass("on").siblings().removeClass("on"), 
                                    t("#imgbox").animate({
                                        "left": e
                                    }, "normal", function() {
                                        d = !1, r == a && (r = 2, l = 1, t("#imgbox").css("left", -c)), 0 == l && (r = a - 3, 
                                        l = a - 2, t("#imgbox").css("left", -c * l));
                                    });
                                }
                            }, n = "";
                            e.data.forEach(function(t) {
                                n += '<li><a href="' + t.url + '"><img src="' + s + t.path + '"  alt=""></a></li>';
                            }), t("#imgbox").empty().append(n);
                            var i = t("#imgbox li"), a = i.length, c = i.first().outerWidth(), r = 2, l = 1, d = !1;
                            a += 2, t("#imgbox").css({
                                "width": c * a,
                                "left": -c
                            });
                            var f = i.first().clone(!0), u = i.last().clone(!0);
                            f.appendTo("#imgbox"), u.prependTo("#imgbox"), t("#imgbox").hover(function() {
                                clearInterval(m);
                            }, function() {
                                m = setInterval(o, 3e3);
                            }), t("#container").on("selectstart", function() {
                                return !1;
                            });
                            for (var n = "", p = 0; p < a - 2; p++) n += "<div></div>";
                            t(n).appendTo("#circle"), t("#circle div:eq(0)").addClass("on"), t("#circle").delegate("div", "mouseover", function() {
                                var e = t(this).index();
                                r = e + 1, o(), d = !0;
                            });
                            var m = setInterval(o, 3e3);
                        }
                    }
                });
                var c = "", r = location.href.slice(location.href.lastIndexOf("/") + 1, location.href.lastIndexOf("/").length);
                console.log(r), t.ajax({
                    "url": n + "/manager/homepageColumn/list",
                    "cache": !1,
                    "type": "get",
                    "data": {
                        "url": n + "/manager/homepageColumn/list"
                    },
                    "success": function(i) {
                        if (i.success) {
                            var l = {
                                "arr": i.data
                            }, d = (0, a["default"])("product_template", l);
                            t(".nav").eq(0).append(d), t(".list1").on("click", function(t) {});
                            var f, u;
                            i.data.forEach(function(t, e) {
                                f = t.ahref.split("/"), u = f[f.length - 1], -1 !== r.indexOf(u) && (c = t.id);
                            }), "" != c && (console.log(c), t.ajax({
                                "url": n + "/manager/goodsCategory/findByColumnId",
                                "type": "get",
                                "data": {
                                    "columnId": c
                                },
                                "success": function(e) {
                                    if (e.success) {
                                        var o = (0, a["default"])("nav", {
                                            "lists": e.data
                                        });
                                        t(".sort  ul").append(o);
                                        var i = (0, a["default"])("sublists", {
                                            "sublists": e.data
                                        });
                                        t(".content_box").append(i), t(".nav_container li:last-child").css("border-bottom", "none"), 
                                        t(".sort").on("click", ".text h2,.text p a,.list2 a", function() {
                                            var e = t(this).attr("name");
                                            window.open("../html/list.html?id=" + e);
                                        }), t(".sort ul li .text h2").on("mouseover", function() {
                                            t(this).css("color", "#54c46c");
                                        }), t(".sort ul li .text h2").on("mouseout", function() {
                                            t(this).css("color", "#fff");
                                        }), t(".sort .text p").find("span:last").hide(), t(".sort .text p").each(function(e, o) {
                                            t(this).find("a").text().length > 11 && (t(this).find("a:last").hide(), t(this).find("span").eq(1).hide());
                                        });
                                        var r = t(window).height(), l = !1;
                                        t(".nav_container li").on("mouseenter", function() {
                                            var e = "#AE7247 url(" + s + t(this).attr("icon") + "?x-oss-process=image/resize,m_fixed,h_30,w_30) no-repeat center";
                                            t(this).css("background", e);
                                        }), t(".nav_container li").on("mouseleave", function() {
                                            if (!t(this).hasClass("clicked")) {
                                                var e = "url(" + s + t(this).attr("viceIcon") + "?x-oss-process=image/resize,m_fixed,h_30,w_30) no-repeat center";
                                                t(this).css("background", e);
                                            }
                                        }), t(window).on("scroll", function() {
                                            if (!l) {
                                                var e = t(window).scrollTop();
                                                t(".list_title").each(function(o, n) {
                                                    var i = t(".list_title").eq(o).offset().top, a = (t(".nav_container li").eq(o).attr("viceIcon"), 
                                                    "#AE7247 url(" + s + t(".nav_container li").eq(o).attr("icon") + "?x-oss-process=image/resize,m_fixed,h_30,w_30) no-repeat center");
                                                    e > i - r / 2 && (t(".nav_container li").each(function(e, o) {
                                                        t(this).css("background", "url(" + s + t(".nav_container li").eq(e).attr("viceIcon") + "?x-oss-process=image/resize,m_fixed,h_30,w_30) no-repeat center");
                                                    }), t(".nav_container li").eq(o).css("background", a));
                                                });
                                            }
                                        }), t(".nav_container").on("click", "li", function() {
                                            l = !0;
                                            var e = t(this).index(), o = "#AE7247 url(" + s + t(".nav_container li").eq(e).attr("icon") + "?x-oss-process=image/resize,m_fixed,h_30,w_30) no-repeat center", n = t(".list_title").eq(e).offset().top - r / 4;
                                            t(this).addClass("clicked").siblings().removeClass("clicked"), t(".nav_container li").each(function(e, o) {
                                                t(this).css("background", "url(" + s + t(".nav_container li").eq(e).attr("viceIcon") + "?x-oss-process=image/resize,m_fixed,h_30,w_30) no-repeat center");
                                            }), t(".nav_container li").eq(e).css("background", o), l = !0, t("html,body").stop().animate({
                                                "scrollTop": n
                                            }, 500, function() {
                                                l = !1;
                                            });
                                        }), t(window).resize(function() {
                                            var e = t(window).width();
                                            e < 1200 ? t(".table_left .nav_container").css({
                                                "left": 10,
                                                "top": 400
                                            }) : e > 1200 && e < 1400 ? t(".table_left .nav_container").css({
                                                "left": 20,
                                                "top": 400
                                            }) : t(".table_left .nav_container").css({
                                                "left": 110,
                                                "top": 400
                                            });
                                        });
                                    }
                                    t.ajax({
                                        "url": n + "/manager/goods/queryVoGoods",
                                        "type": "get",
                                        "data": {
                                            "columnId": c
                                        },
                                        "dataType": "json",
                                        "success": function(e) {
                                            e.success && (e.data.forEach(function(e, o) {
                                                var n = "";
                                                e.length > 0 && e.forEach(function(t) {
                                                    n += "<li class='list' goodsId=" + t.goodsId + " specId=" + t.specId + "><img src=" + s + t.goodsImg + "?x-oss-process=image/resize,m_fixed,h_108,w_108 alt=''><p class='title'>" + t.goodsName + "</p><p class='text'>" + t.goodsTitle + "</p><p class='price'>¥ " + t.salePrice + "</p></li>";
                                                }), t(".thirdList").eq(o).append(n);
                                            }), t(".thirdList").on("click", "li", function() {
                                                var e = (t(this).attr("goodsId"), t(this).attr("specId"));
                                                window.open("../html/detail.html?specId=" + e);
                                            }));
                                        }
                                    });
                                }
                            }), t.ajax({
                                "url": n + "/manager/goods/queryGoods?page=1&limit=7",
                                "type": "get",
                                "headers": {
                                    "token": o
                                },
                                "success": function(o) {
                                    if (o.success) {
                                        var n = o.data.list, i = (0, a["default"])("recomLists", {
                                            "lists": n
                                        });
                                        t("#items").append(i), t("#items").on("click", ".item", function() {
                                            var e = t(this).attr("nameId");
                                            window.location = "../html/detail.html?specId=" + e;
                                        }), e();
                                    }
                                }
                            }));
                        }
                    },
                    "error": function(t) {}
                });
            });
        }).call(e, o(0));
    },
    "8": function(t, e) {},
    "9": function(t, e) {}
}, [ 5 ]);