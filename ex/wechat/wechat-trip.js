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
	"0-30" : "对于一个不爱好旅游的人来说，这已经实属不易，旅行前请一定做好旅行攻略",
	"40-60" : "虽然分数不高，但你是一个值得信赖的旅行小伙伴，请再接再厉！",
	"70-90" : "分数不错！一个人旅行也不用担心找不到好吃的好玩的。",
	"100" : "你就是我们要找的旅行控！跟你一同出游，可以放心玩！"
};
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
    	nextBtn.fadeIn('400');
    	$(page[2]).css('display', 'block');
    	select();
    	setTimeout(function(){
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
    	console.log(selectArr);
    	$('#score').text(score);
    	if( score <= 30){
    		description.text(descrip['0-30']);
    	}else if(score > 30 && score <= 60){
    		description.text(descrip['40-60']);
    	}else if(score > 60 && score <= 90){
    		description.text(descrip['70-90']);
    	}else if(score == 100){
    		description.text(descrip['100']);
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