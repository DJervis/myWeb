$(function() {
    var v = {
        flashTitle:$("#initName").val(),
        flashUrl:$("#initUrl").val(),
        flashAuthor:$("#initAuthor").val()
    };
    var init = function() {
        var flashvars = {
            titleVar:v.flashTitle,
            authorVar:v.flashAuthor,
            urlVar:v.flashUrl,
            autoPlay:"false"
        };
        var params = {
            menu:"false",
            wmode:"transparent"
        };
        var attributes = {};
        swfobject.embedSWF("flash/zxxHumorPlayer.swf", "humorFlashBox", "360", "270", "9.0.0", "http://www.zhangxinxu.com/Scripts/expressInstall.swf", flashvars, params, attributes);
    };
    init();
    $(".flash_list_ol > li > a").click(function() {
        var fid = $(this).attr("rel");
        v.flashTitle = $("#indexFlashName_" + fid).text();
        v.flashUrl = $(this).attr("name");
        v.flashAuthor = $("#indexFlashAuthor_" + fid).val();
        init();
        $("#indexFlashOn").removeClass("on").removeAttr("id").find(".flash_on_shape").remove();
        $(this).prepend('<span class="mr10 flash_on_shape">◄</span>').parent().attr("id", "indexFlashOn").addClass("on");
        return false;
    });
    var boxyRemind = function(txt) {
        $("<div class=wrap_login_area>" + txt + "</div>").boxy("友情提示", 320, .5, true);
    };
    $("#voteSubmitBtn").click(function() {
        var self = $(this);
        if (!window.localStorage) {
            boxyRemind("作为前端工作者，是不是应该使用更优秀的浏览器？至少IE8+，或是Firefox, Chrome之类。");
        } else {
            var booVoted = window.localStorage.getItem("isVote_1");
            if (booVoted) {
                boxyRemind("抱歉，您已经参与了此处关于薪资的调查。");
                return;
            }
            var idArr = [];
            $("input[name=voteInput]:checked").each(function() {
                idArr.push($(this).attr("id"));
            });
            if (!idArr.length) {
                boxyRemind("您尚未选择任何选项。");
                return;
            } else {
                $(this).val("提交中...").attr("disabled", "disabled");
                $.post("vote_ajax.php", {
                    vote_id:1,
                    vote_item_id:idArr.join(","),
                    randow:self.attr("data-random")
                }, function(data) {
                    if (data === "success") {
                        self.val("提交成功");
                        window.localStorage.setItem("isVote_1", true);
                        window.location.href = "/php/voteView.php?id=" + 1;
                    } else {
                        self.val("点击参与").removeAttr("disabled");
                        boxyRemind("抱歉，由于网络的原因，你刚才的操作并未成功。");
                    }
                });
            }
        }
    });
    $.fn.fnImgBigShow = function(options) {
        options = options || {};
        var def = {
            w:500,
            h:375
        };
        var sets = $.extend(def, options);
        $(this).click(function() {
            var imgId = $(this).attr("rel"), imgUrl = $(this).attr("href");
            var beAppended = '<img id="designImgShow_' + imgId + '" src="' + imgUrl + '" style="width:' + sets.w + "px; height:" + sets.h + 'px; padding:5px; border:1px solid #cccccc; background:white; position:absolute; z-index:3;" />';
            var sTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            if ($("#blank").length) {
                $("#blank").show();
            } else {
                $("body").prepend('<div id="blank"></div>');
            }
            if ($("#designImgShow_" + imgId).length) {
                $("#designImgShow_" + imgId).show();
            } else {
                $("body").append(beAppended);
            }
            $("#blank").height($("body").height()).css("opacity", "0.6");
            $("#designImgShow_" + imgId).css({
                left:($("body").width() - $("#designImgShow_" + imgId).width()) / 2,
                top:sTop + (cHeight - $("#designImgShow_" + imgId).height()) / 2
            });
            $("#blank").click(function() {
                $("#designImgShow_" + imgId).hide();
                $("#blank").remove();
            });
            return false;
        });
    };
    $("ul.book_tab_ul li").mouseover(function() {
        $("ul.book_tab_ul li").removeClass("on");
        $(this).addClass("on");
        $("div.book_list").hide();
        $("#bookList_" + $(this).attr("id")).show();
    });
    $("#luckAskSubmit").click(function() {
        var that = $(this);
        if (that.hasClass("active")) {
            var rem = $("#luckAskRemind");
            var remhide = function() {
                rem.fadeOut(200);
                clearTimeout(remhide);
            };
            var newAsk = $.trim($("#luckAskQues").val());
            var theAsk = $("#newestQues").text();
            var theReply = $.trim($("#luckAskReply").val());
            if (theReply === "") {
                rem.show().text("您还没有回答");
                setTimeout(remhide, 1500);
                return false;
            } else {
                if (newAsk === "") {
                    rem.show().text("给下一位留个问题吧");
                    setTimeout(remhide, 1500);
                    return false;
                } else {
                    newAsk = $.htmlText(newAsk);
                    theReply = $.htmlText(theReply);
                    if (newAsk.length > 100) {
                        rem.show().text("问题字数要少于100");
                        setTimeout(remhide, 1500);
                        return false;
                    }
                    if (theReply.length > 500) {
                        rem.show().text("回答字数要少于500");
                        setTimeout(remhide, 1500);
                        return false;
                    }
                    askId = $("#lastQuesId").val();
                    rem.show().text("提交中").wait("提交中", 1e3);
                    that.removeClass("active");
                    $.post("ask_ajax_luck.php", {
                        post:"true",
                        ask:newAsk,
                        reply:theReply,
                        id:askId,
                        rand:$("#voteSubmitBtn").attr("data-random")
                    }, function(data) {
                        if (data === "success") {
                            rem.hide();
                            $("#newestQues").text(newAsk);
                            $("#luckAskQues").val("");
                            $("#luckAskReply").val("");
                            $("#lastQuesId").val(parseInt(askId) + 1);
                            var askTime = $("#lastQuesTime").val();
                            if (that.hasClass("posted")) {
                                askTime = "不久前";
                            }
                            $("div.answer_list:last").remove();
                            var replyHTML = '<div class="answer_list"><p><b>问题</b>：' + theAsk + '<span class="g9 f9">' + askTime + "</span></p><p><b>回答</b>：" + theReply + '<span class="g9 f9">1秒前</span></p></div>';
                            $("#luckReplyArea").prepend(replyHTML);
                            that.addClass("active").addClass("posted");
                        } else {
                            if (data === "asked") {
                                rem.text("此问题刚被其他人回答");
                                setTimeout(remhide, 1500);
                            } else {
                                rem.text("服务器忙，稍后重试");
                                setTimeout(remhide, 1500);
                                that.addClass("active");
                            }
                        }
                    });
                }
            }
        }
        return false;
    });
    $("#luckAskMore").click(function() {
        var that = $(this);
        $("#luckAskLoading").show().wait("加载中", 500);
        that.hide();
        var start_id = $("#luckAskMoreStart").val();
        $.get("ask_ajax_luck.php", {
            more:"true",
            start:start_id
        }, function(data) {
            if (data.slice(0, 7) === "success") {
                more = data.replace("success", "");
                that.parent().before(more);
                that.show();
                $("#luckAskLoading").hide();
                $("#luckAskMoreStart").val(parseInt(start_id) + 5);
            } else {
                if (data === "failed") {
                    $("#luckAskLoading").text("没有更多的问答了");
                } else {
                    $("#luckAskLoading").text("服务器忙，您可以刷新重试");
                }
            }
        });
        return false;
    });
    $("#luckAskRule").click(function() {
        $("body").prepend("<div id='blank'></div>");
        $("#blank").css({
            height:$("body").height(),
            backgroundColor:"#000000",
            zIndex:1e3,
            opacity:.6
        }).click(function() {
            $(this).hide();
            $("#hiddenBox").hide();
        });
        $("#hiddenBox").show().css({
            left:($("#blank").width() - $("#hiddenBox").width()) / 2,
            top:120
        });
        $("#hiddenBoxIn").html('<div style="padding-top:120px; text-align:center;">正在加载数据…</div>').load("rule.html");
        return false;
    });
    var fnGetMM = function() {
        $.get("../php.php", {}, function(data) {
            if (data !== []) {
                var json = eval(data);
                var src = json[0].path, id = json[0].pcb_id;
                if (src) {
                    $("#clockMM_a").attr("href", src).attr("rel", id);
                    $("#clockMM_img").attr("src", src);
                    $("#clockArea").show();
                    $("#clockMM_a").fnImgBigShow({
                        w:630,
                        h:421
                    });
                    return false;
                }
            }
        });
    };
    fnGetMM();
    var fnShowClock = function() {
        var myDate = new Date();
        var sec = myDate.getSeconds();
        var lefts = 60 - sec;
        if (lefts < 10) {
            lefts = "0" + lefts;
        }
        $("#mmSecond").text(lefts);
        if (sec === 0) {
            fnGetMM();
        }
        setTimeout(fnShowClock, 1e3);
    };
    fnShowClock();
    $("#feedLoading").text("订阅内容加载中").wait("订阅内容加载中", 1e3);
    $.get("myFeed.php", {}, function(data) {
        if (!data || data.slice(0, 7) === "Warning") {
            $("#feedBox").html('<div class="comment_data_null">未能加载订阅内容</div>');
        } else {
            $("#feedBox").html(data);
        }
    });
});