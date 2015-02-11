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