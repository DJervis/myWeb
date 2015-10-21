define(function(require, exports, module){	
    var $ = require('jquery');
	module.exports = {
		"say": say
	};
	function say(str){
		alert('say: '+str);
	}
});

seajs.use('seajs_test', function(test){
    // test.say();
    var btn = $('.btn');
    for(var i=0; i<btn.length; i++){
        btn[i].onmouseover = function(num){
            return function(){
                test.say('mousevoer '+num);
            };
        }(i);
        btn[i].onclick = function(num){
            return function(){
                test.say('click '+num);
            };
        }(i);
    }
});