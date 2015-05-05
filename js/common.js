function $(id) {
	return !id ? null : document.getElementById(id);
}

function $C(classname, ele, tag) {
	var returns = [];
	ele = ele || document;
	tag = tag || '*';
	if(ele.getElementsByClassName) {
		var eles = ele.getElementsByClassName(classname);
		if(tag != '*') {
			for (var i = 0, L = eles.length; i < L; i++) {
				if (eles[i].tagName.toLowerCase() == tag.toLowerCase()) {
						returns.push(eles[i]);
				}
			}
		} else {
			returns = eles;
		}
	}else {
		eles = ele.getElementsByTagName(tag);
		var pattern = new RegExp("(^|\\s)"+classname+"(\\s|$)");
		for (i = 0, L = eles.length; i < L; i++) {
				if (pattern.test(eles[i].className)) {
						returns.push(eles[i]);
				}
		}
	}
	return returns;
}
/*
*css(name)：访问第一匹配元素的样式属性
*css(name,value)：在所有匹配的元素中，设置一个样式属性的值
*css(properties)：把一个“名/值对”对象设置为所有匹配元素的样式属性
*css(name,function(index,value))：在所有匹配的元素中，设置一个样式属性的值
*/
function css(obj, attr, value) {
    switch (arguments.length) {
        case 2:
            if (typeof arguments[1] == "object") {    //批量设置属性
                for (var i in attr) obj.style[i] = attr[i]
            }
            else {    // 读取属性值
                return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr]
            }
            break;
        case 3:
            //设置属性
            obj.style[attr] = value;
            break;
        default:
            return "";
    }
}
/*
*addClass(class)：为每个匹配的元素添加指定的类名
*removeClass(class)：从所有匹配的元素中删除全部或者指定的类
*toggleClass(class)：如果存在（不存在）就删除（添加）一个类
*/
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}
function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}
function toggleClass(obj,cls){  
    if(hasClass(obj,cls)){  
        removeClass(obj, cls);  
    }else{  
        addClass(obj, cls);  
    }  
}
/*---------------------------滚动函数（高度，时间）---------------------------------*/
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
/*--------------------------- 阻止冒泡 ---------------------------------*/
function stopPropagation(e) {
    e = e || window.event;
    if(e.stopPropagation) { //W3C阻止冒泡方法
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法
    }
}
//拖拽
function in_array(needle, haystack) {
    if(typeof needle == 'string' || typeof needle == 'number') {
        for(var i in haystack) {
            if(haystack[i] == needle) {
                    return true;
            }
        }
    }
    return false;
}
function isUndefined(variable) {
    return typeof variable == 'undefined' ? true : false;
}
function doane(event, preventDefault, stopPropagation) {
    var preventDefault = isUndefined(preventDefault) ? 1 : preventDefault;
    var stopPropagation = isUndefined(stopPropagation) ? 1 : stopPropagation;
    e = event ? event : window.event;
    if(!e) {
        e = getEvent();
    }
    if(!e) {
        return null;
    }
    if(preventDefault) {
        if(e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }
    if(stopPropagation) {
        if(e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }
    return e;
}
var JSMENU = [];
JSMENU['active'] = [];
JSMENU['timer'] = [];
JSMENU['drag'] = [];
JSMENU['layer'] = 0;
JSMENU['zIndex'] = {'win':200,'menu':300,'dialog':400,'prompt':500};
JSMENU['float'] = '';
var dragMenuDisabled = false;
function dragMenu(menuObj, e, op) {
    e = e ? e : window.event;
    if(op == 1) {
        if(dragMenuDisabled || in_array(e.target ? e.target.tagName : e.srcElement.tagName, ['TEXTAREA', 'INPUT', 'BUTTON', 'SELECT'])) {
            return;
        }
        JSMENU['drag'] = [e.clientX, e.clientY];
        JSMENU['drag'][2] = parseInt(menuObj.style.left);
        JSMENU['drag'][3] = parseInt(menuObj.style.top);
        document.onmousemove = function(e) {try{dragMenu(menuObj, e, 2);}catch(err){}};
        document.onmouseup = function(e) {try{dragMenu(menuObj, e, 3);}catch(err){}};
        doane(e);
    }else if(op == 2 && JSMENU['drag'][0]) {
        var menudragnow = [e.clientX, e.clientY];
        menuObj.style.left = (JSMENU['drag'][2] + menudragnow[0] - JSMENU['drag'][0]) + 'px';
        menuObj.style.top = (JSMENU['drag'][3] + menudragnow[1] - JSMENU['drag'][1]) + 'px';
        menuObj.removeAttribute('top_');menuObj.removeAttribute('left_');
        doane(e);
    }else if(op == 3) {
        JSMENU['drag'] = [];
        document.onmousemove = null;
        document.onmouseup = null;
    }
}
// alert 自定义
function _alert(data){
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var aDiv = document.createElement('div');
    var btns = document.createElement('button');
    aDiv.id = "myAlert";
    aDiv.className = "myAlert";
    aDiv.innerHTML = "<div class='con'>"+data+"</div>";


    btns.innerText = "确定";    
    btns.onclick = function(){
        this.parentNode.parentNode.removeChild(this.parentNode);
    }
    aDiv.appendChild(btns);
    document.body.appendChild(aDiv);
    css(aDiv, {
        'top': (clientHeight-aDiv.offsetHeight)/2+'px', 
        'left': (clientWidth-aDiv.offsetWidth)/2+'px'
    });
    aDiv.onmousedown = function(){
        dragMenu(aDiv, event, 1);
    }    
}

//分享相关
function sharetoqqzone(turl, fid){
    var zoneurl='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
    //var domTitle=document.getElementsByTagName('title')[0],domTitleTy=$C('ts')[0].getElementsByTagName('a')[0],domSumm=$('postmessage_'+fid);
    var domTitle=null, domSumm=null;
    var title="十六番分享";
    var summary="十六番约伴，直播"
    if(domTitle && domTitle.innerText!=''){
        title=domTitle.innerText;
        if(domTitleTy && domTitleTy.innerText!=''){
            title=domTitleTy.innerText+title;
        }
    }
    if(domSumm && domSumm.innerText!=''){
        summary=domSumm.innerText.slice(0,80);
    }
    if(turl == ""){
        turl = location.href;
    }
    var p = {
        url: turl,
        showcount:'0',
        desc:'',
        summary:summary,
        title:title,
        site:'十六番',
        pics:'',
        style:'201',
        width:113,
        height:39
    };
    var s = [];
    for(var i in p){
        s.push(i + '=' + encodeURIComponent(p[i]||''));
    }
    aw=window.open();
    aw.location.href=zoneurl+s.join('&')

}

function sharetoweibo(turl,fid,key){
    var weibourl="http://v.t.sina.com.cn/share/share.php?";
    var domTitle=document.getElementsByTagName('title')[0],
        domTitleTy=$('#live_con_'+fid).find('a')[0],
        domfImgs=$('#live_con_'+fid)[0].getElementsByTagName('img');
    // var domTitle=null, domSumm=null, domfImgs=null;
    var title="十六番分享";
    var summary="十六番约伴，直播";
    var picUrl='';
    if(domTitle && domTitle.innerText!=''){
        if(domTitle.innerText.indexOf('直播')){
            title="-十六番直播";
        }else if(domTitle.innerText.indexOf('约伴')){
            title = "-十六番约伴";
        }
        if(domTitleTy && domTitleTy.innerText!=''){
            title=domTitleTy.innerText+title;
        }
    }
    if(domfImgs && domfImgs.length>=1){
        for (var i=0;i<domfImgs.length;i++){
            if(domfImgs[i].getAttribute('aid')!=''){
                picUrl=domfImgs[i].getAttribute('zoomfile');
                break;
            }
        }
    }
    if(turl == ""){
        turl = location.href;
    }
    console.log(picUrl);
    var p = {
        url: turl,
        title:title,
        pic:picUrl,
        searchPic:true,
        appkey:key
    };
    var s = [];
    for(var i in p){
        s.push(i + '=' + encodeURIComponent(p[i]||''));
    }
    aw=window.open();
    aw.location.href=weibourl+s.join('&')
}

function copylink(turl){
    var url="";
    if(turl){
        url=turl;
    }else{
        url=window.location.href;
    }
    _setCopy(url,'复制成功')
}

function _setCopy(text,msg){
    var copyTip = '<div class="copy-tip">'+msg+'</div>';
    var setTip = function(){
        var tip = $('.copy-tip');   
        tip.css({
            top: parseInt($(document).scrollTop()+($(window).height()-tip.height())/2) + "px",
            left: ($(window).width()-tip.width())/2 + "px"
        });
    };
    var tipHide = function(){
        setTimeout(function(){
            $('.copy-tip').fadeOut('3000', function() {
                $(this).remove();
            });
        }, 1000);
    };
    if(window.clipboardData) { //ie
        var r = clipboardData.setData('Text', text);
        if(r) {
            if(msg) {
                $('body').append(copyTip);
                setTip();
                tipHide();
            }
        } else {
            _dialog({title:'提示', closeType: 0, msg:'<div class="c"><div style="text-align: center;">复制失败，请选择“允许访问”</div></div>'});
        }
    } else { //非ie
        var msgcp = '<div class="zclip-copy" style="text-align: center; text-decoration:underline;">点此复制到剪贴板</div>';
        _dialog({title: '提示', closeType: 0, msg: msgcp});
        if (typeof(swfUrl) == "undefined" || swfUrl == "") {
            swfUrl = "../common/swf/ZeroClipboard.swf";
        };
        $('.zclip-copy').zclip({
            path: swfUrl,
            copy: function(){
                return text;
            },
            afterCopy: function(){
                $('.closeDia').click();
                $('body').append(copyTip);
                setTip();
                tipHide();
            }
        });
    }
}

function cmakeCode (turl) {
    var url="";
    if(turl){
        url=turl;
    }else{
        url=window.location.href;
    }
    var msg = '<div class="qarea" align="center"><div class="qarea_t">使用微信扫一扫，扫描后点击右上角图标分享</div><div id="qaream" class="qarea_c" style="margin:20px auto;height:100px;width:100px;"></div></div>';
    _dialog({title:'微信分享', closeType: 0, msg:msg});
    var qarea=$('#qaream')[0];
    var qrcode = new QRCode(qarea, {
        width : 100,
        height : 100
    });
    qrcode.makeCode(url);
}