var TEST = function(){
	var Test = function(){},
	a = function(){
		return 1;
	},
	b = function(){
		return 2;
	},
	c = {
		c1: 0,
		c2: 1,
		c3: 2
	},
	d = function(){
		return c.c1+c.c2+c.c3;
	};
	Test.run = function(dom){
		var val = a() + b() + d();
		document.getElementById(dom).innerHTML = val;
	};
	return Test;
}();