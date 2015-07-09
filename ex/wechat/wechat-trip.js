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
var rightAnswer = {
	1: "A",
	2: "B",
	3: "C"
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
    	}, 400);
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
    			}
    		} else if(n == 10) {
    			sharePage.addClass('active');
    			nextBtn.fadeOut('fast');
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
    		}, 400);	
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
});