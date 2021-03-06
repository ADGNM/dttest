/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @project index2015
 * @file    2015/index2015_v6_20160618.js
 * @Updates 
 * MiniHui 新华深度点击更多滚动到新加载的位置
 * 常磊20160310 修改代码，注释掉了以前的scrollLoading，最早大王加的，感觉这个函数没有用，所以注释掉了，偶尔还报错
 *          @St.    2016-06-18-13.56
                    ## 更新 `index2015_v6_20160618.js`
                    - 添加`2015`开发和 build模组到 github
                    - 更新全新的头部注释格式
                    - 更新`focusBoxEv`模块
                    - 添加了帧数控制功能，可以使用页面发稿控制 `<div id="ampMax"></div>`，最少显示 5条
                    - 合并页内js，并压缩
                    - 同时修正连续点击文字动画的bug
*/

var _screenW = $(window).width(),
    _screenH = $(window).height(),
    _ua = window.navigator.userAgent.toLowerCase(),
    isLtIe10 = (_ua.indexOf("msie 9")!==-1 || _ua.indexOf("msie 8")!==-1),
    xh_keyWord = {
        "set": 0
    },
    XH_newsIng = {
        "cur": 1,
        "finish": false,
        "allowLoad": true,
        "curNum": 0,
        "curHeight":0
    },
    $audioPause = $("#audioPause");

window.onload = function () {
    wloadIframeAD.init();
    setIntervalAd.init();

    //$("#topAdv").animate({"marginTop":"0"},500);
    /*$("img.lazy").each(function(){
		$(this).attr("src",$(this).attr("data-original"));
		//console.log($(this).attr("src"))
	})*/

}

$(function () {
    var host = window.location.host;
    $(".smallAdv iframe").attr("src", "http://" + host + "/2015/html2015/xhfloatAdv_v1.html");
    //图片加载
    $("img.lazy").lazyload({
        effect: "fadeIn",
        threshold: 800,
        failurelimit: 60
    });
    /*$("img.lazy,iframe.lazyIframe").scrollLoading({
        container: $(window),
        callback: function() {
            //this.style.border = "3px solid #a0b3d6";
        }
    });*/
    //头部banner切换
    $(".headerC").slide({
        mainCell: ".bd",
        effect: "fold",
        autoPlay: true,
        interTime: 15000
    });
    //暴恐音视频
    $(".headerRT").slide({
        mainCell: ".reportItem",
        effect: "fold",
        autoPlay: true,
        interTime: 3000
    });
    //关键词
    $("#kwScroll").slide({
        mainCell: "#gd_content",
        effect: "leftMarquee",
        vis: 5,
        interTime: 50,
        autoPlay: true
    });
    //新华聚焦滚动文字
    $("#depthNewScroll").slide({
        mainCell: ".thelist",
        effect: "topLoop",
        autoPlay: true,
        interTime: 3000
    });
    //传媒之声
    $("#mediaItem").slide({
        mainCell: ".mediaList",
        effect: "topLoop",
        vis: 2,
        prevCell: ".btnPrev",
        nextCell: ".btnNext",
        trigger: "click",
        autoPlay: true,
        interTime: 4000,
        delayTime: 800
    });
    //传媒之声
    $("#zxjk").slide({
        mainCell: ".mediaList",
        effect: "topLoop",
        vis: 2,
        prevCell: ".btnPrev",
        nextCell: ".btnNext",
        trigger: "click",
        autoPlay: true,
        interTime: 4000,
        delayTime: 800
    });
    getH1keyword.init();
    focusBoxEv.init();
    baseSet.set();
    navCollapse.init();
    cnc.init();
    skxwEv.init();
    //频道页面加载
    loadPage.init();
    tabs.onEvent();
    //refresh.freshEvent();
    windowScroll.scrollEvent();
    playVideo.init();
    inputFocus.init();
    selectEvent.init();
    //productBodyEv.init();
    windowResize.init();
    videoPlay.init();
    timeShow.init();
    langBody.init();
    keyWord.init();
    newsing.init();
    xhOriginalEv.init();
    produceEv.init();
    //mediaScroll.init();
    pictureScroll.init();
    part21.init();
    dataList13.hoverEven();
    dataList14.hoverEven();
    dataList15.hoverEven();
    dataList16.hoverEven();
});
var wloadIframeAD = {
    init: function () {
        $(".wloadIframeAD").each(function () {
            $(this).attr("src", $(this).attr("data-original"));
        });
    }
};

// @St. 2016-06-18-12.42 更新 `focusBoxEv` 模块
var focusBoxEv = {
    setMax: function () {
        var _this = this;
        var MAX;
        // console.log(!_this.$ampMax);
        if (!_this.$ampMax) {
            _this.$ampMax = $('#ampMax');
            MAX = $.trim(_this.$ampMax.text());
            // console.log('_this.$ampMax.text()', _this.$ampMax.text());
            // console.log('MAX', MAX);
            if (MAX === '') {
                MAX = 15;
            }
        }
        if (MAX < 5) {
            MAX = 5;
        }
        // console.log('MAX', MAX);
        var $focusBoxBody = $('#focusBoxBody');
        var $focusBoxBody_focusBoxWrap_li = $focusBoxBody.find('.focusBoxWrap ul li');
        var realLen = $focusBoxBody_focusBoxWrap_li.length;
        var $focusBoxBody_txt_li = $focusBoxBody.find('.txt ul li');
        var forMax;
        // console.log('focusBoxBody_focusBoxWrap_li:', $focusBoxBody_focusBoxWrap_li);
        // console.log('focusBoxBody_txt_li:', $focusBoxBody_txt_li);
        // console.log('cons:', realLen > MAX);
        if (realLen > MAX) {
            // console.log((realLen - (realLen - MAX)));
            for (var i = (realLen - (realLen - MAX)); i < realLen; i++) {
                // console.log('i', i);
                $focusBoxBody_focusBoxWrap_li.eq(i).remove();
                $focusBoxBody_txt_li.eq(i).remove();
                // $focusBoxBody_num_li.eq(i).remove();
            }
        }
    },
    init: function () {
        this.setMax();
        // 焦点图切换
        var $_videoLi = $(".focusBox .pic li"),
            $_videoLiA = $(".focusBox .videoPlayBtn a"),
            videoLiLen = $(".focusBox .pic li").length,
            $_iframe = $_videoLi.find(".iframeSrc");
        $_videoLiA.each(function () {
            if (!$.trim($(this).attr("href"))) {
                $(this).parent().remove();
            } else {
                $(this).parent().show();
            };
        });
        $_iframe.each(function (idx) {
            if ($(this).text() && $(this).text().indexOf("iframe_") < 0) {
                $(this).parent().remove();
                $(".focusBox .txt li").eq(idx).remove();
            };
        });
        var str = "",
            videoLiLen = $(".focusBox .pic li").length;
        for (i = 0; i < videoLiLen; i++) {
            str += '<li></li>';
            //$_videoLi.eq(i).find("i").attr("onClick","change("+(i+1)+")");
        };
        $(".focusBox .num").append(str);
        $(".focusBox").slide({
            titCell: ".num li",
            mainCell: ".pic",
            effect: "fold",
            autoPlay: true,
            prevCell: ".btnPrev",
            nextCell: ".btnNext",
            trigger: "click",
            delayTime: 300,
            interTime: 7000,
            startFun: function (i) {
                var $_thisLi = $(".focusBoxWrap li").eq(i),
                    $_nextLi = $_thisLi.next();
                if (!$_thisLi.hasClass("ok")) {
                    var $_lazyTarget = $_thisLi.find(".lazyload"),
                        $_iframeSrc = $_thisLi.find(".iframeSrc");
                    if (!$_iframeSrc.text() == "") {
                        var iframeHtml = '<iframe width="651px" height="365" frameborder="0" scrolling="no" src="' + $_iframeSrc.text() + '" ></iframe>';
                        $_thisLi.append(iframeHtml);
                    } else if ($_iframeSrc.text() == "" && $_lazyTarget.length) {
                        var dataOriginal = $_lazyTarget.attr("data-original");
                        if (!dataOriginal == "") {
                            $_lazyTarget.attr("src", dataOriginal).removeClass("lazyload");
                        };
                    };
                    $_thisLi.addClass("ok");
                };
                if ($_nextLi.length && !$_nextLi.hasClass("ok")) {
                    var $_lazyTarget = $_nextLi.find(".lazyload"),
                        $_iframeSrc = $_nextLi.find(".iframeSrc");
                    if (!$_iframeSrc.text() == "") {
                        var iframeHtml = '<iframe width="651px" height="365" frameborder="0" scrolling="no" src="' + $_iframeSrc.text() + '" ></iframe>';
                        $_nextLi.append(iframeHtml);
                    } else if ($_iframeSrc.text() == "" && $_lazyTarget.length) {
                        var dataOriginal = $_lazyTarget.attr("data-original");
                        if (!dataOriginal == "") {
                            $_lazyTarget.attr("src", dataOriginal).removeClass("lazyload");
                        };
                    };
                    $_nextLi.addClass("ok");
                };

                $(".focusBox .txt li")
                    .eq(i)
                    .animate({
                        "bottom": 0
                    }, 'normal', function () {
                        $(this).stop(true, true);
                    })
                    .siblings()
                    .animate({
                        "bottom": -36
                    }, 'normal', function () {
                        $(this).stop(true, true);
                    });
                // .stop(false, true);
            }
        });
        focusBoxEv.hoverEv();
    },
    hoverEv: function () {
        $(".focusBox").hover(
            function () {
                $(this).addClass("on");
            },
            function () {
                $(this).removeClass("on");
            }
        )
    }
};

//新华聚焦右侧 "广告" 交互事件
var setIntervalAd = {
    $_floatAdv: $(".floatAdv"),
    $_closeBtn: $(".floatAdv .closeBtn"),
    init: function () {
        idfloatAdv = 0;
        setIntervalAd.setId();
        setIntervalAd.hoverEv();
        setIntervalAd.closeBtnEv();
    },
    setId: function () {
        idfloatAdv = window.setInterval(function () {
            if (setIntervalAd.$_floatAdv.hasClass("open")) {
                setIntervalAd.$_closeBtn.hide()
                setIntervalAd.$_floatAdv.removeClass("open").animate({
                    "top": "100%"
                }, 800);
            } else {
                setIntervalAd.$_floatAdv.addClass("open").css("top", "-100%").animate({
                    "top": "0"
                }, 800);
                setTimeout(function () {
                    setIntervalAd.$_closeBtn.show()
                }, 800);
            }
        }, 9000);
    },
    closeBtnEv: function () {
        setIntervalAd.$_closeBtn.click(function () {
            $(this).hide();
            window.clearTimeout(idfloatAdv);
            setIntervalAd.$_floatAdv.removeClass("open").addClass("close").animate({
                "top": "100%"
            }, 800);
        })
    },
    hoverEv: function () {
        setIntervalAd.$_floatAdv.parent().hover(
            function () {
                if (idfloatAdv) {
                    window.clearTimeout(idfloatAdv);
                };
            },
            function () {
                if (!setIntervalAd.$_floatAdv.hasClass("close")) {
                    setIntervalAd.setId();
                };
            }
        );
        setIntervalAd.$_floatAdv.siblings(".smallAdv").hover(
            function () {
                if (!setIntervalAd.$_floatAdv.hasClass("close")) {
                    window.clearTimeout(idfloatAdv);
                    setIntervalAd.$_floatAdv.addClass("open").css("top", "-100%").animate({
                        "top": "0"
                    }, 800);
                    setTimeout(function () {
                        setIntervalAd.$_closeBtn.show();
                    }, 800);
                };
            },
            function () {}
        );
    }
};
var skxwEv = {
    init: function () {
        var $_skxwLi = $("#skxw .bd li");
        var skxwLiLen = $_skxwLi.length;
        var str = "";
        for (i = 0; i < skxwLiLen; i++) {
            str += '<li></li>';
        };
        $("#skxw .hd").append(str);
        $("#skxw").slide({
            titCell: ".hd li",
            mainCell: ".bd",
            effect: "leftLoop",
            //autoPlay: true,
            interTime: 4000,
            delayTime: 500,
            triggerTime: 0,
            trigger: "click"
        });
    }
};
//新华原创
var xhOriginalEv = {
    init: function () {
        $("#xhOriginal").slide({
            titCell: ".hd li",
            mainCell: ".bd",
            effect: "top",
            delayTime: 200,
            interTime: 8000,
            autoPlay: true,
            triggerTime: 0,
            startFun: function (i) {
                var $_lazyTarget = $("#xhOriginal .bd li").eq(i).find(".lazy");
                if ($_lazyTarget.length) {
                    $_lazyTarget.attr("src", $_lazyTarget.attr("data-original"));
                };
            }
        });
    }
};

function isPlaceholder() {
    return 'placeholder' in document.createElement('input');
};

function playerPause(mode) {
    if (mode == 'pause') {
        G_PLUGIN_MOVIE.setMovieStatus("pause"); //视频暂停播放
    } else {
        G_PLUGIN_MOVIE.setMovieStatus("play"); //视频暂停播放
    }
};
// 页面初始化设置
var baseSet = {
    set: function () {}
};
// 导航二级收缩
var navCollapse = {
    init: function () {
        this.clickEven();
    },
    clickEven: function () {
        $("#navBody .moreBtn").click(function () {
            var $_secNav = $(".secNav");
            if ($_secNav.is(":hidden")) {
                $_secNav.slideDown("fast");
                $(this).removeClass("iconDownArrowWhite").addClass("iconUpArrowWhite");
            } else {
                $_secNav.slideUp("fast");
                $(this).removeClass("iconUpArrowWhite").addClass("iconDownArrowWhite");
            }
            return false;
        });
    }
};

// 普通横向tab页签
var tabs = {
    onEvent: function () {
        var $_tabs = $(".tabs");
        $_tabs.each(function () {
            var $_this = $(this);
            $_this.slide({
                titCell: ".tabsTit .tabsT",
                mainCell: ".tabsCont",
                startFun: function (i) {
                    var $_lazyTarget = $_this.find(".tabsItem").eq(i).find(".lazy");
                    if ($_lazyTarget.length) {
                        $_lazyTarget.each(function () {
                            $(this).attr("src", $(this).attr("data-original")).removeClass("lazy");
                        });
                    };
                }
            });
        });
    }
};

// 视频播放
var playVideo = {
    init: function () {
        playVideo.playVideos();
        playVideo.closeVideos();
    },
    playVideos: function () {
        $(".focusBox .videoPlayBtn").click(function () {
            //关闭视频
            newsing.videoClose();
            //关闭音频
            if ($audioPause.length) {
                $audioPause.click();
            }
            $(".playVideo").animate({
                "left": "0px"
            }, 100, function () {
                $("#headLine .videoCloseBtn").fadeIn();
            });
            change($(this).index(".focusBox .videoPlayBtn") + 1);
        });
        $(".focusBox li > a").click(function () {
            if ($(this).siblings(".videoPlayBtn").length) {
                $(this).siblings(".videoPlayBtn").click();
                return false;
            };
        });
    },
    closeVideos: function () {
        $("#headLine .videoCloseBtn").click(function () {
            playerPause("pause");
            $(this).hide();
            $(".playVideo").animate({
                left: '-656px'
            }, 300, function () {
                //$(this).css("visibility","hidden");
            });
        });
    }
};

//加载页面效果
var loadPage = {
    init: function () {
        this.loadColumn();
    },
    loadColumn: function () {
        $("#partColumn .columnBtn").click(function () {
            //$("#maskBg").show();
            var pageUrl = $(this).attr("name");
            var oPage = $(this).parent().parent().find(".showBox");
            $("#partColumn .partBox").css({
                "z-index": "98"
            });
            $(this).parent().parent().css({
                "z-index": "99"
            });
            $("#partColumn .showBox").hide(200);
            oPage.show(800);
            oPage.find("iframe").attr("src", pageUrl);
        })
    }
}

// 文本输入框FOCUS事件
var inputFocus = {
    init: function () {
        inputFocus.checkInput();
        inputFocus.searchSubmit();
    },
    checkInput: function () {
        if (!isPlaceholder()) {
            var $_input = $("input[type='text']") //.css("color","#a9a9a9");
            $_input.each(function () {
                var _color = $(this).attr("data-inputColor");
                $(this).css("color", _color);
                $(this).val($(this).attr("placeholder")).focus(function () {
                    if ($.trim($(this).val()) == $(this).attr("placeholder")) {
                        $(this).val("");
                    }
                }).focusout(function () {
                    if ($.trim($(this).val()) == "") {
                        $(this).val($(this).attr("placeholder")).css("color", _color);
                    };
                }).change(function () {
                    $(this).removeAttr("style");
                });
            });
        };
    },
    searchSubmit: function () {
        $("#searchSubmit").click(function () {
            if ($.trim($("#searchInput").val()) == "") {
                $("#searchInput").val($("#searchInput").attr("placeholder"));
            }
        });
    }
};
// 下拉选项
var selectEvent = {
    init: function () {
        selectEvent.hoverEvent();
    },
    hoverEvent: function () {
        $(".comSelect,#groups .groupsL,#groups .groupsR,.case .controlBtn").hover(
            function () {
                $(this).addClass("activeSelect").find(".selectList").stop(true, true).slideDown("fast");
            },
            function () {
                $(this).removeClass("activeSelect").find(".selectList").stop(true, true).slideUp("fast");
            }
        );
    }
};
// dataList13
var dataList13 = {
    hoverEven: function () {
        var $_dataList13 = $(".dataList13");
        $_dataList13.each(function () {
            var _this = $(this);
            _this.find(".name").hover(
                function () {
                    var _info = ($(this).parent().attr("data-info")).split(',');
                    var closeW = parseInt($.trim(_info[0]));
                    var openW = parseInt($.trim(_info[1]));
                    _this.find(".openItem").stop().animate({
                        width: closeW
                    }, {
                        duration: 500
                    }).removeClass("openItem");
                    $(this).parent().stop().animate({
                        width: openW
                    }, {
                        duration: 500
                    }).addClass("openItem");
                    return false;
                },
                function () {}
            );
        });
    }
};
// dataList14
var dataList14 = {
    hoverEven: function () {
        var $_dataList14 = $(".dataList14");
        $_dataList14.each(function () {
            $(this).slide({
                titCell: "h3",
                targetCell: "ul",
                defaultIndex: 0,
                effect: "slideDown",
                delayTime: 500,
                triggerTime: 0
            });
        });
    }
};
// dataList15
var dataList15 = {
    hoverEven: function () {
        var $_dataList15 = $(".dataList15");
        $_dataList15.each(function () {
            var _this = $(this);
            _this.find("li").hover(
                function () {
                    if (!$(this).hasClass("on")) {
                        $(this).addClass("on").siblings().removeClass("on");
                    }
                },
                function () {}
            );
        });
    }
};
// dataList16
var dataList16 = {
    hoverEven: function () {
        var $_dataList16 = $(".dataList16");
        $_dataList16.each(function () {
            var _this = $(this);
            _this.slide({
                titCell: ".hd li",
                mainCell: ".bd .list",
                effect: "top",
                delayTime: 200,
                autoPlay: false,
                triggerTime: 0
            });
        });
    }
};

// 滚动事件
var windowScroll = {
    scrollEvent: function () {
        $(window).scroll(function () {
            var _this = $(this);
            $(".lazyIframe,.wloadIframeAD").each(function () { //iframe延迟
                if (_this.scrollTop() > ($(this).offset().top - _screenH) && !$(this).attr("src")) {
                    $(this).attr("src", $(this).attr("data-original"));
                }
            });
        });
    }
};
// 页面刷新事件
var refresh = {
    freshEvent: function () {
        var _scrollTop = $(window).scrollTop();
        $("iframe").each(function () {
            if ((_scrollTop + _screenH) > ($(this).offset().top) && !$(this).attr("src")) {
                $(this).attr("src", $(this).attr("data-src"));
            }
        });
        // $(".lazyload").each(function(){ //隐藏图片延迟
        //     if((_scrollTop + _screenH) > ($(this).offset().top)){
        //         $(this).attr("src",$(this).attr("data-original")).removeClass("lazyload");
        //     }
        // });
    }
};
// 窗口事件
var windowResize = {
    init: function () {
        $(window).resize(function () {
            baseSet.set();
        });
    }
};
// 页面初始化设置
var videoPlay = {
    init: function () {
        $("#btnVideoPlay").click(function () {
            var _spAdd = $("#ifrVideo").attr("bsrc");
            $("#ifrVideo").show().attr("src", _spAdd);
            $("#btnVideoClose").show();
        });
        $("#btnVideoClose").click(function () {
            //var _spAdd = $("#ifrVideo").attr("bsrc");
            $("#ifrVideo").hide().attr("src", "");
            $("#btnVideoClose").hide();
        })

    }
};

var timeShow = {
    init: function () {
        $(".part1 .mainL .timeItem").hover(
            function () {
                var $_this = $(this);
                //alert($_this.position().top)
                $(this).siblings(".time").text($(this).text()).css("top", $_this.position().top - 2);
            },
            function () {
                $(this).siblings(".time").text("");
            }
        )
    }
};
//向上滚动
function AutoScroll(obj) {
    $(obj).find("ul:first").animate({
        marginTop: "-158px"
    }, 800, function () {
        $(this).css({
            marginTop: "0px"
        }).find("li:first").appendTo(this);
    });
}
//langBody
var langBody = {
    init: function () {
        var $_langBody = $("#langBody"),
            $_list = $_langBody.find(".dragList");

        $_langBody.hover(
            function () {
                $_list.stop(true, true).slideDown(200);
            },
            function () {
                $_list.stop(true, true).slideUp(200)
            }
        );
        $_list.click(function () {
            $_list.stop().slideUp(200);
        });
    }
};
//任务区
var keyWord = {
    init: function () {
        keyWord.setData();

        var MyKey = setInterval(keyWord.setData, 4000);
        $("#keyWord").hover(function () {
            clearInterval(MyKey);
        }, function () {
            MyKey = setInterval(keyWord.setData, 4000);
        });
        $("#keyLeft,#keyRight").click(function () {
            keyWord.setData();
        });

    },
    setData: function () {
        $("#keyWord .keyBox").html("");
        var oKey = $("#keyWord .keyStyle")
        var ArrList = [0, 1, 2];
        var ArrList2 = [0, 1, 2, 3, 4, 5];
        if (xh_keyWord.set == 0) {
            xh_keyWord.arr1 = keyWord.getArrayItems(ArrList, 2);
            xh_keyWord.arr2 = keyWord.getArrayItems(ArrList2, 4);
        }
        if (oKey.hasClass("keyWord1")) {
            oKey.attr("class", "keyStyle keyWord2").css({
                "background-position": "0 -61px"
            });
            $($("#keyWordMain .long a").eq(xh_keyWord.arr1[0])).clone().prependTo($("#keyWord .keyBox1"));
            $($("#keyWordMain .short a").eq(xh_keyWord.arr2[0])).clone().prependTo($("#keyWord .keyBox2"));
            $($("#keyWordMain .short a").eq(xh_keyWord.arr2[1])).clone().prependTo($("#keyWord .keyBox3"));
            xh_keyWord.set = 1;

        } else {
            oKey.attr("class", "keyStyle keyWord1").css({
                "background-position": "0 0"
            });;
            $($("#keyWordMain .long a").eq(xh_keyWord.arr1[1])).clone().prependTo($("#keyWord .keyBox1"));
            $($("#keyWordMain .short a").eq(xh_keyWord.arr2[2])).clone().prependTo($("#keyWord .keyBox2"));
            $($("#keyWordMain .short a").eq(xh_keyWord.arr2[3])).clone().prependTo($("#keyWord .keyBox3"));
            xh_keyWord.set = 0;
        }
    },
    getArrayItems: function (arr, num) {
        //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        //取出的数值项,保存在此数组
        var return_array = new Array();
        for (var i = 0; i < num; i++) {
            //判断如果数组还有可以取出的元素,以防下标越界
            if (temp_array.length > 0) {
                //在数组中产生一个随机索引
                var arrIndex = Math.floor(Math.random() * temp_array.length);
                //将此随机索引的对应的数组元素值复制出来
                return_array[i] = temp_array[arrIndex];
                //然后删掉此索引的数组元素,这时候temp_array变为新的数组
                temp_array.splice(arrIndex, 1);
            } else {
                //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
                break;
            }
        }
        return return_array;
    }
}
//热点观察
function setScroll(pos) {
    $('#xwjxsMain').slimScroll({
        height: '730px',
        width: '315px',
        scrollTo: pos
    });
}
//2015新闻进行时
var newsing = {
    init: function () {
        //this.creatJs();
        this.clickBtn();
        this.moreData(XH_newsIng.curNum, 30);
    },
    creatJs: function () {
        /*		var head= document.getElementsByTagName('head')[0];
        		var script= document.createElement('script');
        		script.type= 'text/javascript';
        		script.src= 'http://www.xinhuanet.com/2015/js2015/rdgc_na.js';
        		head.appendChild(script);
        */
        //$("<scri" + "pt>" + "</scr" + "ipt>").attr({ src: 'http://www.xinhuanet.com/2015/js2015/rdgc_na.js', type: 'text/javascript', id: 'load' }).appendTo($('head'));
    },
    timeShow: function () {
        $("#xwjxs .content .dot").hover(
            function () {
                $(this).next().show();
            },
            function () {
                $(this).next().hide();
            }
        );

    },
    clickBtn: function () {
        $("#xwjxs .loadstatus").click(function () {

            if (XH_newsIng.finish == false && XH_newsIng.allowLoad == true) {
                $("#xwjxs .loadstatus .tpLoad").css("display", "inline-block");


                setTimeout('newsing.moreData(XH_newsIng.curNum,15)', 1000);
                $("#xwjxs .loaded").fadeIn(300);

            } else if (XH_newsIng.finish == true && XH_newsIng.allowLoad == true) {
                $("#xwjxs .loadstatus a").html("显示更多").attr("href", "http://www.news.cn/2015xhsd/").attr("target", "_blank");
            }

        })
    },
    //Indepth
    moreData: function (beginNum, showNum) {

        XH_newsIng.allowLoad = false;
        $("#xwjxs .loadstatus").addClass("loading");
        $("#xwjxs .loadstatus .tpLoad").css("display", "none");
        var curLen = Indepth.data.list.length;
        
        for (var i = beginNum; i < beginNum + showNum; i++) {
            //console.log("i:"+i+"aaacurLen:"+curLen)
            if (i == curLen) {

                XH_newsIng.finish = true;
                break;
            };

            var title = Indepth.data.list[i].title,
                time = Indepth.data.list[i].pubTime,
                url = Indepth.data.list[i].linkUrl,
                pic = Indepth.data.list[i].picLinks,
                video = Indepth.data.list[i].subTitle,
                isMoreImg = Indepth.data.list[i].isMoreImg,
                tarray = Indepth.data.list[i].tarray,
                uarray = Indepth.data.list[i].uarray,
                imgarray = Indepth.data.list[i].imgarray,
                videoMp4 = Indepth.data.list[i].introtitle || "";



            time = time.substring(time.length - 8, time.length);

            //普通稿件
            if (pic == "" /* && url!=null*/ ) {
                //普通拼稿
                if (tarray.length > 0) {
                    tempStr = '<div class="newsItem" data-idx="' + i + '"><span class="dot"></span><span class="time">' + time + '</span><a target="_blank" class="linka" href="' + url + '">' + title + '</a>';
                    for (var k = 0; k < tarray.length; k++) {
                        tempStr += '<a target="_blank" class="linka" href="' + uarray[k] + '">' + tarray[k] + '</a>';
                    }
                    tempStr += '</div>';
                } else {
                    tempStr = '<div class="newsItem" data-idx="' + i + '"><span class="dot"></span><span class="time">' + time + '</span><a target="_blank" href="' + url + '">' + title + '</a></div>';
                }

            }
            //单图片稿件
            if (pic != "" && url != "" && video == "" && imgarray.length == 0) {

                //普通拼稿
                if (tarray.length > 0) {
                    tempStr = '<div class="newsPic" data-idx="' + i + '"><span class="dot"></span><span class="time">' + time + '</span><a target="_blank" href="' + url + '"><img src="' + newsing.setImg(pic) + '"></a><h4><a target="_blank" href="' + url + '">' + title + '</a>';
                    for (var k = 0; k < tarray.length; k++) {
                        tempStr += '<a target="_blank" class="linka" href="' + uarray[k] + '">' + tarray[k] + '</a>';
                    }
                    tempStr += '</h4></div>';
                } else {
                    tempStr = '<div class="newsPic" data-idx="' + i + '"><span class="dot"></span><span class="time">' + time + '</span><a target="_blank" href="' + url + '"><img src="' + newsing.setImg(pic) + '"></a><h4><a target="_blank" href="' + url + '">' + title + '</a></h4></div>';
                }

            }
            //多图片稿件
            if (pic != "" && url != "" && video == "" && imgarray.length != 0) {
                tempStr = '<div class="morePic" data-idx="' + i + '"><span class="dot"></span><span class="time">' + time + '</span><h4><a target="_blank" href="' + url + '">' + title + '</a></h4><div class="picImg"><a target="_blank" href="' + url + '"><img class="img1" src="' + newsing.setImg(pic) + '"></a><a target="_blank" href="' + url + '"><img class="img2" src="' + newsing.setImg(imgarray[0]) + '"></a><a target="_blank" href="' + url + '"><img class="img3" src="' + newsing.setImg(imgarray[1]) + '"></a></div></div>';
            }
            //视频稿件
            if (pic != "" && url != "" && video != "" ) {

                tempStr = '<div class="newsVideo" data-idx="'+i+'"><span class="dot"></span><span class="time">' + time + '</span><div class="con"><img src="' + newsing.setImg(pic) + '" width="285" /><span class="bg"></span> <span class="tit"><a target="_blank" href="' + url + '">' + title + '</a></span><span class="play"></span><span style="display:none">' + video + '</span><i style="display:none">'+ videoMp4 +'</i><span class="close"></span> </div></div>';

            }

            XH_newsIng.curNum = i + 1;
            //alert(tempStr)
            $("#xwjxsMain .content").append(tempStr);
            
            
        }
        
        $("#xwjxs .loaded").fadeOut(1000);
        $("#xwjxs .dataLoad").fadeOut(1000);
        setScroll(XH_newsIng.curHeight); //设置滚动
        
        XH_newsIng.curHeight = $("#xwjxsMain .content").height();

        console.log(XH_newsIng.curNum, XH_newsIng.curHeight)

        newsing.timeShow(); //设置时间效果
        newsing.videoPlay(); //设置视频
        XH_newsIng.cur++; //设置页号自动增加
        timeShow.init(); //设置效果初始化
        newsing.setImpNews(); //设置重点新闻
        newsing.imgLarge(); //设置图片变大效果
        XH_newsIng.allowLoad = true;
        $("#xwjxs .loadstatus").removeClass("loading");

        if (XH_newsIng.cur == 6) {
            XH_newsIng.finish = true;
            $("#xwjxs .loadstatus a").html("显示更多").attr("href", "http://www.news.cn/2015xhsd/").attr("target", "_blank");
        }

    },
    videoPlay: function () {
        $("#xwjxs .newsVideo .play").click(function () {
            //关闭视频
            $("#headLine .videoCloseBtn").click();
            //关闭音频
            if ($audioPause.length) {
                $audioPause.click();
            }

            $("#xwjxs .newsVideo .close").hide();
            $("#xwjxs .newsVideo").find("iframe").remove();
            $("#xwjxs .newsVideo").find("video").attr("src","").remove();
            var _src = $(this).next().html(),
                _srcMp4 = $(this).next().next().html();
            $(this).parent().find(".close").show();


            var ifrStr = isLtIe10?('<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="' + _src + '"></iframe>'):('<video controls autoplay src='+ _srcMp4 +'></video>');

            $(this).parent().append(ifrStr);
        });


        $("#xwjxs .newsVideo .close").click(function () {
            $(this).hide();
            $(this).parent().find("iframe").remove();
            $(this).parent().find("video").remove();
        });
    },
    videoClose: function () {
        $("#xwjxs .newsVideo .close").hide();
        $("#xwjxs .borderCont").find("iframe").remove();
        $("#xwjxs .borderCont").find("video").attr("src","").remove();
    },
    setImg: function (_src) {
        var _arr = _src.split("_")[0];
        var imgSrc = "http://www.news.cn/titlepic/" + _arr.substring(0, _arr.length - 4) + "/" + _src.replace('title', 'title0h');
        return imgSrc;
    },
    setImpNews: function () {
        $("#xwjxs .interval").each(function () {
            $(this).next().find(".dot").addClass("timeImp");
        })
    },
    imgLarge: function () {
        $("#xwjxs .newsPic").each(function () {
            $(this).find("img").hover(function () {
                $(this).closest(".newsPic").addClass("newsPicOn");
                $(this).stop().animate({
                    width: "280px",
                    height: "187px"
                }, 400);
            }, function () {
                $(this).closest(".newsPic").removeClass("newsPicOn");
                $(this).stop().animate({
                    width: "120px",
                    height: "80px"
                }, 200)
            });
        });
        $("#xwjxs .morePic .picImg img").hover(function () {
                $(this).closest(".morePic").addClass("newsPicOn");
                $(this).parent().addClass("on");
                $(this).stop().animate({
                    width: "280px",
                    height: "187px",
                    left: "0px"
                }, 400);
            },
            function () {
                var _index = $(this).parent().index();
                $(this).closest(".morePic").removeClass("newsPicOn");
                $(this).parent().removeClass("on");
                if (_index == 0) {
                    $(this).stop().animate({
                        width: "90px",
                        height: "60px",
                        left: '0'
                    }, 200)
                } else if (_index == 1) {
                    $(this).stop().animate({
                        width: "90px",
                        height: "60px",
                        left: "95px"
                    }, 200)
                } else if (_index == 2) {
                    $(this).stop().animate({
                        width: "90px",
                        height: "60px",
                        left: "190px"
                    }, 200)
                }
            });

    }
};
//2015新华推广区
var produceEv = {
    init: function () {
        produceEv.hoverEv();
        produceEv.hoverEv2();
    },
    hoverEv: function () {
        $(".produce .item div[data-h]").parent().hover(
            function () {
                var $_this = $(this);
                $_this.css("z-index", "1");
                timeIdProduce = window.setTimeout(function () {
                    $_this.find(".cover").show().stop(true, true).animate({
                        "height": $_this.find(".cover").attr("data-h")
                    }, 300);
                }, 300)
            },
            function () {
                clearTimeout(timeIdProduce);
                $(this).removeAttr("style").find(".cover").stop(true, true).animate({
                    "height": "0"
                }, 100).hide();
            }
        )
    },
    hoverEv2: function () {
        $(".produce .item div[data-w]").parent().hover(
            function () {
                var $_this = $(this);
                $_this.css("z-index", "1");
                timeIdProduce = window.setTimeout(function () {
                    $_this.find(".cover").show().stop(true, true).animate({
                        "width": $_this.find(".cover").attr("data-w")
                    }, 300);
                }, 300)

            },
            function () {
                clearTimeout(timeIdProduce);
                $(this).removeAttr("style").find(".cover").stop(true, true).animate({
                    "width": "0"
                }, 100).hide();
            }
        )
    }
};
var channerId = 0,
    zhankaiBId = 0;
var part21 = {
    init: function () {
        $(".chaCom .zhankaiB").on('mouseover', function () {
            var $_this = $(this);
            clearTimeout(channerId);
            clearTimeout(zhankaiBId);
            channerId = window.setTimeout(function () {
                var num = $_this.index(".chaCom .zhankaiB") + 1;
                // var consult = parseInt((num-1)/3);
                // var topHeight = consult * 400+ "px";

                var topHeight = $_this.closest(".chaCom").position().top;

                $(".moudleBox").css({
                    "top": topHeight
                }).stop(true, true).animate({
                    "width": "1000px"
                }, 500);
                part21.getDatas(num);
            }, 300);
            $("#channel").mouseleave(function () {
                clearTimeout(channerId);
                clearTimeout(zhankaiBId);
                $(".moudleBox").stop(true, true).animate({
                    "width": "0"
                }, 500);
                setTimeout(function () {
                    $(".moudleBox").empty();
                }, 300);
            });
            $(".chaCom .zhankaiB").on('mouseleave', function () {
                clearTimeout(channerId)
                clearTimeout(zhankaiBId);
                zhankaiBId = window.setTimeout(function () {
                    clearTimeout(channerId);
                    $(".moudleBox").stop(true, true).animate({
                        "width": "0"
                    }, 500);
                    setTimeout(function () {
                        $(".moudleBox").empty();
                    }, 300);
                }, 300);
            });
            $(".moudleBox").on('mouseover', function () {
                clearTimeout(zhankaiBId);
            });
        });
    },
    getDatas: function (_num) {
        var num = _num;
        if (num == 999) {
            var iframe = $("<div class='moudle moudle15'><iframe src='http://www.xinhuanet.com/part21/chabox21.htm' width='1000' height='400' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no'></iframe></div>");

            $(".moudleBox").empty().append(iframe);
            //setTimeout(function(){
            $(".moudleBox").find(".moudle").fadeIn(500);
            //},300);
            $(".moudleBox").mouseleave(function () {
                clearTimeout(channerId);
                $(this).stop(true, true).animate({
                    "width": "0"
                }, 500);
                setTimeout(function () {
                    $(".moudleBox").empty();
                }, 300);
            });
        } else {
            var hostUrl = window.location.host;
            $.ajax({
                type: "GET",
                global: false,
                url: 'http://' + hostUrl + '/part21/chabox' + num + '.htm', //'http://www.news.cn/part21/chabox1
                dataType: "html",
                success: function (data) {
                    $(".moudleBox").empty().html(data);
                    //setTimeout(function(){
                    $(".moudleBox").find(".moudle").fadeIn(500);
                    //},300);
                },
                error: function () {
                    part21.getDatas(num);
                }
            });
            $(".moudleBox").mouseleave(function () {
                clearTimeout(channerId);
                $(this).stop(true, true).animate({
                    "width": "0"
                }, 500);
                setTimeout(function () {
                    $(".moudleBox").empty();
                }, 300);
            });
        };
    }
};

// 获取H1大标题的关键字
var getH1keyword = {
    init: function () {
        $("#searchInput").attr("placeholder", $("#h1keyword").text());
    }
};
// 炫图
var pictureScroll = {
    init: function () {
        var $_picLi = $("#pictureItem .picList li");
        var picLiLen = $_picLi.length;
        var pages = Math.ceil(picLiLen / 4);
        var str = "";
        for (i = 0; i < pages; i++) {
            str += '<li></li>';
        };
        $("#pictureItem .hd").append(str);
        $("#pictureItem ").slide({
            mainCell: ".picList",
            effect: "leftLoop",
            delayTime: 1000,
            vis: 4,
            scroll: 4,
            pnLoop: true,
            autoPlay: true,
            prevCell: ".prev",
            nextCell: ".next",
            interTime: 10000,
            easing: "easeOutCubic",
            endFun: function (i) {
                var $_lazyTarget = $("#pictureItem .lazy");
                if ($_lazyTarget.length) {
                    $_lazyTarget.each(function () {
                        var $_thisSrc = $(this).attr("data-original");
                        $(this).attr("src", $_thisSrc).removeClass("lazy");
                    });
                }
            }
        });
    }
};
// 传媒之声
var mediaScroll = {
    init: function () {
        var $_Li = $("#mediaItem .list li");
        var liLen = $_Li.length;
        var pages = Math.ceil(liLen / 3);
        var str = "";
        for (i = 0; i < pages; i++) {
            str += '<li></li>';
        };
        $("#mediaItem .hd ul").append(str);
        $("#mediaItem ").slide({
            mainCell: ".list",
            effect: "leftLoop",
            delayTime: 1300,
            vis: 3,
            scroll: 3,
            pnLoop: true,
            autoPlay: true,
            prevCell: ".prev",
            nextCell: ".next",
            interTime: 10000,
            easing: "easeOutCubic",
            endFun: function (i) {
                var $_lazyTarget = $("#mediaItem .lazy");
                if ($_lazyTarget.length) {
                    $_lazyTarget.each(function () {
                        var $_thisSrc = $(this).attr("data-original");
                        $(this).attr("src", $_thisSrc).removeClass("lazy");
                    });
                }
            }
        });
    }
};
//cnc滚动
var cnc = {
    init: function () {
        $("#mediaItem .cnc .tabsItem").each(function () {
            $(this).slide({
                mainCell: ".scrollWrap",
                autoPlay: true,
                effect: "topMarquee",
                interTime: 100,
                pnLoop: false,
                vis: 3
            });
        });
    }
};

// 移动原页内底部一部分js
var $_spAddItems = $(".focusBox .videoPlayBtn a");
var spArray = [];
var spn = 0;

$_spAddItems.each(function () {
    if ($(this).attr("href")) {
        spArray.push({
            'videoname': $(this).attr("href")
        });
    }
});

function VideoSwitch() {
    this.show = function (m) {
        if (G_PLAYER_INSTANCE != null) {
            G_PLAYER_INSTANCE.close();
        }
        if (spArray[m - 1] != 'is undefined') {
            G_PLUGIN_MOVIE.playBysUrl(spArray[m - 1].videoname, true);
        }
    };
}

function change(src) {
    var vs = new VideoSwitch();
    spn = src;
    vs.show(src);
}

function kkPlayerLoaded() {
    G_PLUGIN_MOVIE.addCallBack("onEnd", function () {
        if (spn > 0 && spn < spArray.length + 1) {
            //G_PLAYER_INSTANCE.close();
            G_PLUGIN_MOVIE.playBysUrl(spArray[spn].videoname, true);
        }
        if (spn == 0) {
            //G_PLAYER_INSTANCE.close();
            G_PLUGIN_MOVIE.playBysUrl(spArray[0].videoname, true);
        }
    });
    if (getParameter("vid")) {
        G_PLUGIN_MOVIE.playSvodById(getParameter("vid"), false);
    } else if (getParameter("url")) {
        G_PLUGIN_MOVIE.playSvodByUrl(getParameter("url"), false);
    } else if (getParameter("gcid")) {
        G_PLUGIN_MOVIE.playSvodByGcid(getParameter("gcid"), false);
    }
}
kkLoadPlayer("player_container");
var unReadEv = {
    $unReadNum: $(".unReadNum"),
    $parent: $("#hpart2L li,#hpart2L h3"),
    storageData: [], //存储数组
    init: function () {
        unReadEv.initload();
        unReadEv.clickEv();
        unReadEv.closeEv();
    },
    initload: function () {
        if (!unReadEv.getData()) { //没有获取到客户端数据，或者第一次打开本网站，存储默认数据
            unReadEv.storageData[0] = 0; //存储url数量，暂定30个url
            unReadEv.storageData[1] = 1; //是否存储：0/1
            unReadEv.setData(unReadEv.storageData); //向客户端存储默认数据
            unReadEv.$parent.addClass("unclick"); //所有A标签的父元素添加"unclick"
            unReadEv.$unReadNum.show(); //显示数量统计标识
        } else {
            //获取到客户端数据
            unReadEv.storageData = unReadEv.getData().split(","); //获取数据转为数组
            if (parseInt(unReadEv.storageData[1]) == 1) {
                unReadEv.$parent.addClass("unclick");
                //if(unReadEv.storageData.length>2){
                unReadEv.setList(unReadEv.storageData);
                //}else{
                //unReadEv.$unReadNum.show();
                //};
            };
        };
    },
    clickEv: function () {
        $("#hpart2L a").on("click", function () {
            var $this = $(this),
                href = $this.attr("href");
            if (!unReadEv.searchList(href) && $this.parent().hasClass("unclick")) { //从客户端找不到这个链接 && 父元素有"unclick"
                unReadEv.storageData[0] = parseInt(unReadEv.storageData[0]) == 30 ? 0 : parseInt(unReadEv.storageData[0]) + 1;

                if (parseInt(unReadEv.storageData[0]) == 0) {
                    unReadEv.storageData[2] = href;
                } else {
                    unReadEv.storageData[unReadEv.storageData[0] + 1] = href;
                }
                $this.parent().css("overflow", "hidden").removeClass("unclick");
                var num = parseInt($(".unReadNum .num2").text()) - 1;
                $(".unReadNum .num2").text(num);
                if (num == 0) {
                    unReadEv.$unReadNum.hide();
                } else if (num <= 10 && num > 0) {
                    $(".unReadNum .num").text(num);
                } else {
                    $(".unReadNum .num").text("10+");
                };
                unReadEv.setData(unReadEv.storageData);
            };
        });
    },
    closeEv: function () {
        $(".unReadNum .num").hover(
            function () {
                $(this).siblings(".text").stop(true, true).slideDown();
            },
            function () {
                $(this).siblings(".text").stop(true, true).slideUp();
            }
        );
        $(".unReadNum .readBtn").click(function () {
            unReadEv.storageData[1] = unReadEv.storageData[1] == 1 ? 0 : 1;
            unReadEv.setData(unReadEv.storageData);
            if (unReadEv.storageData[1] == 0) {
                unReadEv.$unReadNum.hide();
                $("#hpart2L a").parent().removeClass("unclick");
            };
        });
    },
    searchList: function (str) {
        var len = unReadEv.storageData.length;
        for (var i = 2; i < len; i++) {
            if (str == unReadEv.storageData[i]) {
                return 1;
            };
        };
        return 0;
    },
    setList: function (strArray) {
        var len = strArray.length,
            $num = $(".unReadNum .num"),
            $num2 = $(".unReadNum .num2");
        for (var i = 2; i < len; i++) {
            var $target = $("a[href='" + strArray[i] + "']");
            if ($target.length && $target.parent().hasClass("unclick")) {
                $target.parent().removeClass("unclick");
                var num = parseInt($num2.text()) - 1;
                $num2.text(num);
                if (num <= 10) {
                    $num.text(num);
                } else {
                    $num.text("10+");
                };
            };
        };
        if (parseInt($num.text()) <= 0) {
            unReadEv.$unReadNum.hide();
        } else {
            unReadEv.$unReadNum.show();
        };
    },
    onlocalStorage: function () {
        if (window.localStorage) {
            return true;
        } else {
            return false;
        };
    },
    getLocalStorage: function () {
        var str = localStorage["XHGLOBAL_UNREAD"];
        return str;
    },
    setLocalStorage: function (str) {
        localStorage["XHGLOBAL_UNREAD"] = str;
    },
    getCookie: function () {
        var str = $.cookie("XHGLOBAL_UNREAD");
        return str;
    },
    setCookie: function (str) {
        $.cookie("XHGLOBAL_UNREAD", str, {
            expires: 7
        });
    },
    getData: function () {
        if (unReadEv.onlocalStorage()) {
            return unReadEv.getLocalStorage();
        } else {
            return unReadEv.getCookie();
        };
    },
    setData: function (str) {
        if (unReadEv.onlocalStorage()) {
            return unReadEv.setLocalStorage(str);
        } else {
            return unReadEv.setCookie(str);
        };
    }
};
unReadEv.init();
// 顶部收缩广告
var topAdAnimate = {
    init: function () {
        var $tXjp = $("#tXjp"),
            $tXjpTitle = $("#tXjpTitle"),
            $tXjpTitle2 = $("#tXjpTitle2"),
            $tXjpMap = $("#tXjpMap"),
            $adSuofang = $("#adSuofang");
        setTimeout(function () {
            $adSuofang.animate({
                "opacity": "1"
            }, 300);
        }, 1000);
        setTimeout(function () {
            $tXjp.animate({
                "margin-left": "-374px",
                "opacity": "1"
            }, 300);
        }, 3000);
        setTimeout(function () {
            $tXjpTitle.animate({
                "margin-left": "15px",
                "opacity": "1"
            }, 300);
        }, 3300);
        setTimeout(function () {
            $tXjpMap.animate({
                "bottom": "50px",
                "opacity": "1"
            }, 300);
        }, 3600);
        setTimeout(function () {
            $adSuofang.animate({
                "height": "180px"
            }, 300);
            $adSuofang.find("a").animate({
                "height": "180px"
            }, 300);
            $tXjp.animate({
                "margin-left": "-600px",
                "opacity": "0"
            }, 300);
            $tXjpTitle.animate({
                "margin-left": "350px",
                "opacity": "0"
            }, 300);
            $tXjpMap.animate({
                "bottom": "44px",
                "opacity": "0"
            }, 300);
        }, 10000);
        setTimeout(function () {
            $("#img001").animate({
                "opacity": "1"
            }, 500);
        }, 10100);
        setTimeout(function () {
            $adSuofang.css("position", "relative").css("background", "none").css("width", "1000px");
            $("#boxBg").css("padding-top", "0px");
            $tXjp.animate({
                "margin-left": "317px",
                "opacity": "1",
                "height": "180px"
            }, 0);
            $tXjpMap.animate({
                "margin-left": "166px",
                "opacity": "1",
                "bottom": "32px"
            }, 0);
            $tXjpTitle2.animate({
                "opacity": "1"
            }, 0);
        }, 10400);
    }
};

! function (window, $) {
    /*
    首页上方搜索
    */
    var search = function (kw) {
        var str = $("#inputwd").val() || "";
        if (str) {

            window.open("http://so.news.cn/#search/0/" + str + "/1/");
        }
    }
    $("#searchSubmit").on("click", search)

    $(".form").on('keydown', function (e) {
        var e = e || window.event || event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
            search();
        }
    });

}(window, jQuery)
//topAdAnimate.init();