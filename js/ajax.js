//-------------------原生 Ajax-----------------------
function createXHR() {
	/*if (typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	} else if (typeof ActiveXObject != "undefined") {
		if (typeof arguments.callee.activeXString != "string") {
			var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"], i, len;
			for (i = 0, len = versions.length; i < len; i++) {
				try {
					new ActiveXObject(versions[i]);
					arguments.callee.activeXString = versions[i];
					break;
				} catch (ex) {
					//跳过
				}
			}
		}
		return new ActiveXObject(arguments.callee.activeXString);
	} else {
		throw new Error("No XHR object available.");
	}*/
	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		return new XMLHttpRequest();
	} else { // code for IE6, IE5
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
}
var myDiv=document.getElementById('my_div');
var xhr = createXHR();
function myAjax(url, cfunc){	
	xhr.onreadystatechange = cfunc;	
	xhr.open("post", url, true);
	xhr.setRequestHeader("MyHeader", "MyValue");
	xhr.send();
	//myDiv.innerHTML=xhr.responseText; //当同步请求时
	//xhr.abort(); //取消异步请求
}
/*function myFunction(){
	myAjax("example.txt", function(){
		if (xhr.readyState == 4) {
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
				myDiv.innerHTML=xhr.responseText;
			} else {
				myDiv.innerHTML="Request was unsuccessful: " + xhr.status;
			}
		}
	});
}
document.getElementById('btn_ajax').onclick=function(){
	myFunction();
}*/
//----------------------jQ Ajax------------------------
$(document).ready(function() {
	$("#btn_ajax").click(function(){
		//$("#my_div").load("example.txt");
		$.ajax({
			type: "post",
			async: true,
			url: "example.txt",
			beforeSend: function(){
				$("#my_div").append('<span class="loading"></span>');
			},
			success: function(url){
				$("#my_div").html(url);
			}
		});
	});
});
