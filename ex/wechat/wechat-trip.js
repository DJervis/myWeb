$(function() {
    FastClick.attach(document.body);
    var nextBtn = $('.btn-next'),
    	page = $('.page');
    page.click(function(event) {
    	alert($(this).attr('id'));
    });
    nextBtn.bind('click', function(){
    	alert('aaa');
    	if(!$(this).hasClass('disable')){
    		var active = $('.active');
    		var id = active.id;
    		var idArr = id.split('-');
    		console.log(idArr[1]);
    	}    	
    });
});