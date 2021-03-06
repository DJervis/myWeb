<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
	<meta content="fullscreen=yes,preventMove=no" name="ML-Config">
	<title>test</title>
<script type="text/javascript" src="../js/jquery/1.11.1/jquery.min.js"></script>
<!--	<script type="text/javascript" src="../js/qmik.min.js"></script>-->

<style type="text/css">
body {padding-bottom: 200px;}
#editorbody {width: 300px;height:100px;border: 1px solid #999;padding: 10px;}
.icons .icon{
	height: 16px;
	width: 17px;
	-ms-filter: "alpha(opacity=70)";
	filter: alpha(opacity=70);
	-khtml-opacity: .7;
	opacity: .7;
	display: block;
	-webkit-transition: all .1s ease-out;
	-moz-transition: all .1s ease-out;
	-ms-transition: all .1s ease-out;
	-o-transition: all .1s ease-out;
	transition: all .1s ease-out;
}
.icons .icon:hover{
	-ms-filter: "alpha(opacity=100)";
	filter: alpha(opacity=100);
	-khtml-opacity: 1;
	opacity: 1;
}
.icons .png8 {
	background-image: url(../images/widearea-fu.png) no-repeat;
}
.icons .png24 {
	background-image: url(../images/widearea.png) no-repeat;
}

.icons {color: #37a;}
.icon-color {
	display: inline-block;
	width: 16px;
	height: 17px;
	background-color: currentColor;
}

.ie7-hover {display: block; width: 100px; background: #eee; text-align: center; position: relative;}
.hover-show {display:none;width: 50px;position: absolute; top: 18px; left: 0;padding-top: 20px; border: 1px solid #dedede;}
.ie7-hover:hover .hover-show {display: block;}
</style>
</head>
<body>
<div class="www">
<h2>1. jQ slideDown</h2>
	<button class="slide-btn">slide</button>
	<div class="slide" style="width:200px; height:200px;background:red;color:#fff;display:none;">
		fkdlsakfl;dkfla;dskfl;<br>
		fkdlsakfl;dkfla;dskfl;
	</div>
	<script type="text/javascript">
	var slide = $('.slide');
	$('.slide-btn').click(function() {
		if(slide.css('display') == "none"){
			slide.slideDown('500');
		}else{
			slide.slideUp('500');
		}
	});
	</script>
<h2>2. text</h2>
	<div class="wrap" id="editorbody" contenteditable="true" spellcheck="false"></div>
	<textarea style="width:300px; height:100px;" placeholder="textarea"></textarea>
<h2>3. calendar</h2>
	<input id="calen" type="text" >
	<input id="checkin" type="text" >
	<input id="checkout" type="text" >
	<script type="text/javascript">
		var calen = document.getElementById('calen'),
		checkin = document.getElementById('checkin'),
		checkout = document.getElementById('checkout');
		calen.onfocus = function(){
			JTC.setday();
		}
		checkin.onfocus = function(){
			JTC.setday({minDate: '2015-11-9'});
			JTC.setStartDay();
		}
		checkout.onfocus = function(){
			JTC.setday();
		}
	</script>
	<!-- myCalendar	 calendar  calendar_time -->
	<script type="text/javascript" src="../js/calendar.js"></script>
	<script type="text/javascript" src="../js/date.js"></script>
<h2>4. png 半透明</h2>
	<div class="icons">png8<a href="#" class="icon png8"></a></div>
	<div class="icons">png24<a href="#" class="icon png24"></a></div>
	<div class="icons"><i class="icon-color png24"></i><a href="#">icon-color</a></div>
<h2>5. 打开app</h2>
	<a href="weixin://">open weixin</a>
<h2>6. ie7 hover</h2>
	<p style="color:#999;">ie7下 透明背景无法触发hover (js mouseover代替hover)</p>
	<a class="ie7-hover" href="javascript:;">
		ie7-hover
		<div id="hover" class="hover-show">hover-show</div>
	</a>
	<div class="wrap">
		<ul class="arrow">
			<li class="item"><a href="" class="cal">xxxxxx</a></li>
			<li class="item"><a href="" class="cal">xxxxxx</a></li>
			<li class="item"><a href="" class="cal">xxxxxx</a></li>
			<li class="item"><a href="" class="cal">xxxxxx</a></li>
			<li class="item"><a href="" class="cal">xxxxxx</a></li>
		</ul>
	</div>
	<script type="text/javascript">		
		/*document.getElementById('hover').onmouseover = function(){
			alert('hover');
			this.style.display = "block";
		}*/
		!function(){
			// alert('aaaaaa');
			$('.wrap').find('.arrow').css({
				width: '100px',
				height: '100px'
			}).find('.item').css('background', '#eee').find('.cal').css('color', 'red');
		}();		
	</script>
<h2>7. css优先级</h2>
	<style>
		.wrap .css {color: #fff;background: url(../images/123.jpg) no-repeat;}
		.leve {display: block; padding: 5px; background-position: 0 -80px;}
	</style>
	<div class="wrap">
		<div class="css leve">css优先级</div>
	</div>
<h2>8. 手机浏览器隐藏地址栏</h2>
	<script>
		window.onload=function(){ 
			if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) { 
				bodyTag = document.getElementsByTagName('body')[0]; 
				bodyTag.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px'; 
				// alert(bodyTag.style.height);
			}
			setTimeout(function() { 
				window.scrollTo(0, 1) 
			}, 0); 
		}; 
	</script>
<h2>9. img 下空白</h2>
	<style>
		.wrap img {display: inline-block;width: 45px; height:30px; vertical-align: bottom; background: transparent;}		
	</style>
	<div class="wrap">
		<img src="">
	</div>
<h2>10. tap边框</h2>
	<style>
		.tap-test a{display: inline-block;padding: 10px;color:#333; -webkit-tap-highlight-color: rgba(61,166,226,0.3);}
		.tap-test a:active {outline:none;}		
	</style>
	<div class="tap-test">
		<a href="javascript:;" class="aa">click</a>
		<a href="javascript:;" class="bb" onclick="">onclick</a>
		<a href="javascript:;" class="cc" >touch</a>
	</div>
	<script>
		/*$('.aa').on('click', function(){alert('test');});
		$('.cc').on('touchend', function(){alert('cccc');});*/
	</script>
<h2>11. 对象</h2>
	<script type="text/javascript">
	var Person = {
		name: null,
		age: null,
		sayName: getthis
	};
	var one = {
		name: "dj",
		age: 3	
	};
	var extend = function(o,n,override){
	    for(var p in n){
			o[p] = n[p];
			/*if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override)) {
				o[p] = n[p];
			}*/
	    }
	    return o;
	};

	/*function Person(){};
	Person.prototype = {
		name: "dj",
		age: 3,
		sayName: getthis
	};	*/
	function getthis(){
		console.log(this);
	}
	var newPerson = extend(Person, one);
	newPerson.sayName();
	</script>
</div>
</body>
</html>
