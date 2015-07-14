<?php
	require_once "jssdk.php";
	$jssdk = new JSSDK("wxa213be1d4f948fac", "f6a4cd37d078a49dc73c6cf1ceb41321");
	$signPackage = $jssdk->GetSignPackage();

	function is_weixin(){ 
		if ( strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false ) {
				return true;
		}	
		return false;
	}
	$isWeixin = is_weixin();
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="keywords" content="十六番，十六番旅行，十六番游记攻略、问答、约伴、直播" />
	<meta name="description" content="十六番,这里有最新的自助游攻略游记,最佳自助游线路推荐,在线解答旅行交通、美食、住宿等问题,出境自助游有不清楚的地方就来十六番,手把手教你自由行。">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1">
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta content="black" name="apple-mobile-web-app-status-bar-style"  />
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="full-screen" content="yes">
    <meta name="format-detection" content="telephone=no">    
    <meta name="format-detection" content="address=no">

    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon">    
	<title>你是旅行控吗？</title>
	<link rel="stylesheet" type="text/css" href="css/wechat.css">	
</head>
<body>
	<div class="for-wechat"><img src="images/16fan.png"></div>
	<a href="javascript:;" class="button btn-next disable" style="display: none;">下一题</a>
	<div class="wrapper">
		<div class="page active" id="page-start">
			<div class="main">
				<div class="start-bg">
					<figure><img src="images/start_bg.png"></figure>
				</div>
				<div class="start-btn">开始测试</div>
				<input type="button" id="reload" value="刷新">
			</div>
		</div>
		<div class="page type-text" id="page-1">
			<div class="main">
				<div class="question">
					<h3>1、以下是哪个景点？</h3>
					<ul>
						<li><span>A</span>埃菲尔铁塔</li>
						<li><span>B</span>东京塔</li>
						<li><span>C</span>迪拜塔</li>
						<li><span>D</span>华盛顿塔</li>
					</ul>					
				</div>
				<figure>
					<img src="images/Eiffel.png">
				</figure>
			</div>
		</div>
		<div class="page type-text" id="page-2">
			<div class="main">
				<div class="question">
					<h3>2、自由女神像除了美国，下列哪个国家还有？</h3>
					<ul>
						<li><span>A</span>英国</li>
						<li><span>B</span>日本</li>
						<li><span>C</span>韩国</li>
						<li><span>D</span>瑞士</li>
					</ul>					
				</div>
				<figure>
					<img src="images/theStatueofLiberty.png">
				</figure>
			</div>
		</div>
		<div class="page type-two-col" id="page-3">
			<div class="main">
				<div class="question">
					<h3>3、下列哪道美食是泰国菜？</h3>
					<ul class="clearfix">
						<li>
							<span>A</span>担仔面
							<figure>
								<img src="images/dzm.png">
							</figure>
						</li>
						<li>
							<span>B</span>天妇罗
							<figure>
								<img src="images/tfl.png">
							</figure>
						</li>
						<li>
							<span>C</span>泡菜石锅拌饭
							<figure>
								<img src="images/pcsgbf.png">
							</figure>
						</li>
						<li>
							<span>D</span>冬阴功汤
							<figure>
								<img src="images/dygt.png">
							</figure>
						</li>
					</ul>					
				</div>
			</div>
		</div>
		<div class="page type-text" id="page-4">
			<div class="main">
				<div class="question">
					<h3>4、俗称“西瓜卡”的交通卡是下列哪个国家？</h3>
					<ul>
						<li><span>A</span>日本</li>
						<li><span>B</span>法国</li>
						<li><span>C</span>香港</li>
						<li><span>D</span>意大利</li>
					</ul>					
				</div>
				<figure>
					<img src="images/suica.png">
				</figure>
			</div>
		</div>
		<div class="page type-text" id="page-5">
			<div class="main">
				<div class="question">
					<h3>5、GUCCI CAFE总店开设在下列哪个地方？</h3>
					<ul>
						<li><span>A</span>韩国首尔</li>
						<li><span>B</span>英国伦敦</li>
						<li><span>C</span>意大利米兰</li>
						<li><span>D</span>日本东京</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="page type-two-col" id="page-6">
			<div class="main">
				<div class="question apps">
					<h3>6、下列哪APP可以在旅行中定位晒美食美景？</h3>
					<ul class="clearfix">
						<li>
							<div class="text"><span>A</span>十六番</div>
							<figure>
								<img src="images/16fan.png">
							</figure>
						</li>
						<li>
							<div class="text"><span>B</span>in</div>
							<figure>
								<img src="images/in.png">
							</figure>
						</li>
						<li>
							<div class="text"><span>C</span>堆糖</div>
							<figure>
								<img src="images/duitang.png">
							</figure>
						</li>
						<li>
							<div class="text"><span>D</span>nice</div>
							<figure>
								<img src="images/nice.png">
							</figure>
						</li>
					</ul>					
				</div>
			</div>
		</div>
		<div class="page type-text" id="page-7">
			<div class="main">
				<div class="question">
					<h3>7、土耳其的首都是下列哪个城市？</h3>
					<ul>
						<li><span>A</span>伊斯坦布尔</li>
						<li><span>B</span>安卡拉</li>
						<li><span>C</span>圣彼得堡</li>
						<li><span>D</span>日内瓦</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="page type-text" id="page-8">
			<div class="main">
				<div class="question">
					<h3>8、下列哪家书店获得过“全球20间最美丽的书店”称号？</h3>
					<ul>
						<li><span>A</span>新华书店</li>
						<li><span>B</span>台湾好样本事</li>
						<li><span>C</span>一本书店</li>
						<li><span>D</span>席殊书屋</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="page type-text" id="page-9">
			<div class="main">
				<div class="question">
					<h3>9、全球最小且已经开业的迪斯尼乐园在下列哪个地方？</h3>
					<ul>
						<li><span>A</span>莫斯科</li>
						<li><span>B</span>东京塔</li>
						<li><span>C</span>纽约</li>
						<li><span>D</span>香港</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="page type-text" id="page-10">
			<div class="main">
				<div class="question">
					<h3>10、下列哪个国家对中国公民个人游实行免签政策？</h3>
					<ul>
						<li><span>A</span>新加坡</li>
						<li><span>B</span>泰国</li>
						<li><span>C</span>毛里求斯</li>
						<li><span>D</span>马来西亚</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="page" id="page-share">
			<div class="main">
				<div class="score">
					<div class="score-text"><span id="score">0</span>分</div>
					<div class="line line-up"></div>
					<p class="description">对于一个不爱好旅游的人来说，这已经实属不易，旅行前请一定做好旅行攻略</p>
					<div class="line line-down"></div>
				</div>
				<div class="reload">重新答题</div>
				<div class="appdown">
					<p>想知道所有答案吗？请下载十六番手机APP</p>
					<a class="button download" onclick="javascript:_gaq.push(['_trackPageview','weixin-game']);" href="https://itunes.apple.com/us/app/shi-liu-fan-xiang-shi-jie/id855031900?ls=1&mt=8" target="_blank">立即下载</a>
				</div>
			</div>
		</div>
	</div>

<script src="js/jquery.min.js"></script>
<script src="js/fastclick.min.js"></script>
<script src="js/wechat-trip.js"></script>
<?php if($isWeixin) { ?>
<!-- <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script> -->
<script src="js/jweixin-1.0.0.js"></script>
<script>
function wxShare(){
wx.config({
    debug: false,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: '<?php echo $signPackage["timestamp"];?>',
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [
    'onMenuShareTimeline', 
    'onMenuShareAppMessage', 
    'onMenuShareQQ', 
    'onMenuShareWeibo'
    ]
});
wx.ready(function(){
	wx.onMenuShareTimeline(wxData); //朋友圈
	wx.onMenuShareAppMessage(wxData); //分享给朋友
	wx.onMenuShareQQ(wxData); //分享到QQ
	wx.onMenuShareWeibo(wxData); //分享到腾讯微博
});
wx.error(function(res){
	console.log(res);
	alert('错误：'+res);
});
}
</script>
<?php } ?>
</body>
</html>