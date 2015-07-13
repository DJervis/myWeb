<?php 
function wx_get_token() {
    // $token = S('access_token');
    $appid = "wxe0f620c346f87b3b";
    $appsecret = "08b7ed2b5a2c6dea7198905695594e50";
    if (!$token) {
        $res = file_get_contents('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$appid.'&secret='.$appsecret);
        $res = json_decode($res, true);
        $token = $res['access_token'];
        // 注意：这里需要将获取到的token缓存起来（或写到数据库中）
        // 不能频繁的访问https://api.weixin.qq.com/cgi-bin/token，每日有次数限制
        // 通过此接口返回的token的有效期目前为2小时。令牌失效后，JS-SDK也就不能用了。
        // 因此，这里将token值缓存1小时，比2小时小。缓存失效后，再从接口获取新的token，这样
        // 就可以避免token失效。
        // S()是ThinkPhp的缓存函数，如果使用的是不ThinkPhp框架，可以使用你的缓存函数，或使用数据库来保存。
        // S('access_token', $token, 3600);
    }
    return $token;
}
function wx_get_jsapi_ticket(){
    $ticket = "";
    do{
        // $ticket = S('wx_ticket');
        if (!empty($ticket)) {
            break;
        }
        // $token = S('access_token');
        if (empty($token)){
            wx_get_token();
        }
        // $token = S('access_token');
        if (empty($token)) {
            // logErr("get access token error.");
            break;
        }
        $url2 = sprintf("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi",
            $token);
        $res = file_get_contents($url2);
        $res = json_decode($res, true);
        $ticket = $res['ticket'];
        // 注意：这里需要将获取到的ticket缓存起来（或写到数据库中）
        // ticket和token一样，不能频繁的访问接口来获取，在每次获取后，我们把它保存起来。
        // S('wx_ticket', $ticket, 3600);
    }while(0);
    return $ticket;
}

$timestamp = time();
$nonceStr = "16fan";
$wxticket = wx_get_jsapi_ticket();
$wxOri = sprintf("jsapi_ticket=%s&noncestr=%s&timestamp=%s&url=%s",
    $wxticket, $nonceStr, $timestamp,
    'http://wechat.16fan.com/wechat/'
    );
$signature = sha1($wxOri);

$dataArr = array($timestamp, $nonceStr, $signature);
$dataArr = json_encode($dataArr);
echo $dataArr;

?>