$(document).ready(function(){
 	is_weixin();
 	$("#btn").click(function(){
 		var scroll_top = $("#pos").offset().top;
        /*window.scrollTo(scroll_offset.left,scroll_offset.top);
        $("body,html").animate({
        	scrollTop:scroll_top
        },1000);*/
 	 	scrollToS(scroll_top, 300);
    }); 
    $("#btn2").click(function(){
 		var scroll_top = 0;
 	 	scrollToS(scroll_top, 100);
    }); 
    $("#aaa").click(function(){
    	if(isWeixin){
    		alert("weixin");
    		$("#aaa").attr("href","http://mp.weixin.qq.com/mp/redirect?url=https://itunes.apple.com/us/app/shi-liu-fan-xiang-shi-jie/id855031900?l=zh&ls=1&mt=8");
    	}else{
    		alert("not-weixin");
    		$("#aaa").attr("href","https://itunes.apple.com/us/app/shi-liu-fan-xiang-shi-jie/id855031900?l=zh&ls=1&mt=8");
    	}
    });
});
function changePg(pg){
	var _page = document.getElementById("page");
	var page = $(".page");
	var pgLength=$(".page option").length;
	var curPg=$(".page option:selected").index();
	if(pg==1){//pg_dn
		var temp = 0;
		temp=curPg+1;
		if(temp<pgLength){
		    page.get(0).selectedIndex = temp;
		    //_page.options[temp].selected = true;
		}else{
			alert("Last page!");
		}
	}else if(pg==0){//pg_up
		var temp = 0;
		temp=curPg-1;
		if(temp>=0){
		    page.get(0).selectedIndex = temp;
		}else{
			alert("First page!");
		}
	}
}
 var isWeixin=0;
 function is_weixin(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		isWeixin=1;
 	} else {
		isWeixin=0;
	}
}
function scrollToS(end_height, stime){ //滚动函数（高度，时间）
	var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
	var speed=(end_height - scrollTop)/stime;
	var top=document.documentElement.scrollTop || document.body.scrollTop;
	var timer=setInterval(function(){
		var clientHeight=document.documentElement.clientHeight || document.body.clientHeight;
		var scrollHeight=document.documentElement.scrollHeight || document.body.scrollHeight;
		var isBottom=0;
		if(top + clientHeight >= scrollHeight){
			isBottom=1;
		}
		top += speed;
		if(speed >= 0){
			if(top >= end_height){
				window.scrollTo(0, end_height);
				clearInterval(timer);
			}else if(isBottom==1){
				//alert('已到达最底部');
				clearInterval(timer);				
			}else{
				window.scrollTo(0, top);
			}
		}else if(speed < 0){
			if(top <= end_height){
				window.scrollTo(0, end_height);
				clearInterval(timer);
			}else{
				window.scrollTo(0, top);
			}
		}
	},1);
}

window.onscroll=function(){
	alert("aaaaa");
}
var onSc=window.onscroll;
if (typeof onSc == 'function') {
	window.onscroll = function(){
		onSc.call(this);
		alert("bbbbbb");
	}
}