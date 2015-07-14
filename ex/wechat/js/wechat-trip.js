/*手机浏览器隐藏地址栏*/
/*window.onload=function(){ 
	//alert(document.documentElement.scrollHeight+','+document.documentElement.clientHeight);
	//alert(screen.width+','+screen.height);
	if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) { 
		bodyTag = document.getElementsByTagName('body')[0]; 
		bodyTag.style.minHeight = document.documentElement.clientWidth / screen.width * screen.height + 'px';
	}
	setTimeout(function() {
	window.scrollTo(0, 1) 
	}, 0);
};*/
var score = 0;
var rightAnswer = [0, 1, 3, 0, 2, 0, 1, 1, 3, 2];
var descrip = {
	"0-30" : ["对于一个不爱好旅游的人来说，这已经实属不易，旅行前请一定做好旅行攻略", "喜欢旅行却答不好这套题。你来试试？"],
	"40-60" : ["虽然分数不高，但你是一个值得信赖的旅行小伙伴，请再接再厉！", "是一个值得信赖的旅行小伙伴！你来试试？"],
	"70-90" : ["分数不错！一个人旅行也不用担心找不到好吃的好玩的。", "就算一个人旅行也不用担心。你来试试？"],
	"100" : ["你就是我们要找的旅行控！跟你一同出游，可以放心玩！", "我就是传说中的旅行控。你来试试？"]
};
var shareData = {
	title: '你是旅行控吗？',
	desc: '',
	link: function(){
		return window.location.href;
	},
	imgUrl: function(){
		return $('.for-wechat>img')[0].src;
	}
};
var wxData = null;
$(function() {
    FastClick.attach(document.body);

    var page = $('.page'),
    	startPage = $('#page-start'),
    	sharePage = $('#page-share'),
    	startBtn = $('.start-btn'),
    	nextBtn = $('.btn-next');
    // start page    
    startBtn.on('click', function() {
    	startPage.removeClass('active').addClass('animated');
    	$(page[1]).addClass('active');    	
    	$(page[2]).css('display', 'block');
    	select();
    	setTimeout(function(){
            nextBtn.fadeIn('400');
    		startPage.css('display', 'none');
    	}, 500);
    });
    // next question    
    nextBtn.on('click', function(){
    	if(!$(this).hasClass('disable')){
    		var active = $('.active');
    		var id = active.attr('id');
    		var idArr = id.split('-');
    		// console.log(idArr[1]);
    		var n = parseInt(idArr[1]);

			var nextPage = $('#page-'+(n+1)),
				prePage = $('#page-'+(n-1));

    		active.removeClass('active').addClass('animated');
    		if(n < 10) {
    			nextPage.addClass('active');
    			if(n == 9) {
    				sharePage.css('display', 'block');
    				nextBtn.text('完成');
    			}
    		} else if(n == 10) {
    			sharePage.addClass('active');
    			nextBtn.fadeOut('fast');
    			getScore();
    			shareData.desc = getDesc();
                wxData = {
                    title: shareData.title,
                    desc: shareData.desc,
                    link: shareData.link(),
                    imgUrl: shareData.imgUrl()
                };
                if(typeof wxShare === 'function'){
                    wxShare();
                }                
    		}  		
    		if((n-1) >= 1){
    			prePage.css('display', 'none');
    		}
    		if((n+2) <= 10){
    			$('#page-'+(n+2)).css('display', 'block');
    		}    		

    		nextBtn.addClass('disable');
    		setTimeout(function(){
    			active.css('display', 'none');
    			active.find('.question li').off('click');
    			select();
    		}, 500);	
    	}
    });

    // select init    
    function select(){
    	var active = $('.active');
    	var list = $('.active .question li');
	    list.on('click', function(){
	    	if(!$(this).hasClass('selected')) {
	    		list.removeClass('selected');
	    		$(this).addClass('selected');
	    		nextBtn.removeClass('disable');
	    	}
	    });
    }   

    //get score
    function getScore(){
    	var selectList = $('.question .selected');
    	var selectArr = [];
    	var description = $('.description');
    	for (var i=0; i<selectList.length; i++){
    		selectArr[i] = $(selectList[i]).index();
    		if(rightAnswer[i] == selectArr[i]){
    			score += 10;
    		}
    	}
    	// console.log(selectArr);
    	$('#score').text(score);
    	if( score <= 30){
    		description.text(descrip['0-30'][0]);
    	}else if(score > 30 && score <= 60){
    		description.text(descrip['40-60'][0]);
    	}else if(score > 60 && score <= 90){
    		description.text(descrip['70-90'][0]);
    	}else if(score == 100){
    		description.text(descrip['100'][0]);
    	}
    }  

    //reload 
    $('.reload').on('click', function(){
    	window.location.reload();
    });
    $('#reload').on('click', function(){
    	window.location.reload(true);
    });
});

//app download
!function(){ 
	var downBtn = $('.download');
	var u=navigator.userAgent;
    var android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var isweixin = function(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    }();

    if(android){
        downBtn.attr("href","http://www.16fan.com/o/Fan16.apk");
    }
    if (isweixin) {
        downBtn.attr({
            href: "http://a.app.qq.com/o/simple.jsp?pkgname=com.fan.app&g_f=991653",
            onclick: "javascript:_gaq.push(['_trackPageview','weixin-game']);"
        });
    };
}();

//weixin share
function getDesc(){
	var text = '我得了'+score+'分，';
	if( score <= 30){
		text += descrip['0-30'][1];
	}else if(score > 30 && score <= 60){
		text += descrip['40-60'][1];
	}else if(score > 60 && score <= 90){
		text += descrip['70-90'][1];
	}else if(score == 100){
		text += descrip['100'][1];
	}
	return text;
}
/*$.ajax({
	type: 'GET',
	url: 'getWxSignature.php',
	success: function(msg){
		console.log(msg);
		wx.config({
		    debug: true, // 开启调试模式
		    appId: 'wxe0f620c346f87b3b', // 必填，公众号的唯一标识
		    timestamp: msg[0], // 必填，生成签名的时间戳
		    nonceStr: msg[1], // 必填，生成签名的随机串
		    signature: msg[2],// 必填，签名，见附录1
		    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'] // 必填，需要使用的JS接口列表
		});
	}
});*/
/*wx.ready(function(){		
	wx.onMenuShareTimeline(shareData); //朋友圈
	wx.onMenuShareAppMessage(shareData); //分享给朋友
	wx.onMenuShareQQ(shareData); //分享到QQ
	wx.onMenuShareWeibo(shareData); //分享到腾讯微博
});
wx.error(function(res){
	alert('错误：'+res);
});*/