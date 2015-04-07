var TIP = (function(){
    var Tip = function(){},
        config = {
            style: 'position:absolute;padding:5px 10px;font-size:12px;line-height:1.5;color:#fff;border-radius:3px;background:#444;background:rgba(0,0,0,0.7);',
            style_arrow: 'left: 10px;position: absolute;width: 0;height: 0;border-left: 6px solid transparent;border-right: 6px solid transparent;',
            tipDiv: 'tipDiv',
            otips: ''
        },
        trim = function(str) {
                return str.replace(/(\s*$)|(^\s*)/g, '');
        },
        $ = function(id, doc) {
            var doc = doc || document;
            return doc.getElementById(id);
        },
        $$ = function(name, doc) {
            var doc = doc || document;
            return doc.createElement(name);
        },
        $C = function(classname, ele, tag) {
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
        },
        browser = (function() {
            var ua = navigator.userAgent.toLowerCase();
            return {
                VERSION: parseInt(ua.match(/(msie|firefox|webkit|opera)[\/:\s](\d+)/) ? RegExp.$2 :'0'),
                IE: (ua.indexOf('msie') > -1 && ua.indexOf('opera') == -1),
                GECKO: (ua.indexOf('gecko') > -1 && ua.indexOf('khtml') == -1),
                WEBKIT: (ua.indexOf('applewebkit') > -1),
                OPERA: (ua.indexOf('opera') > -1)
            };
        })(),
        util = {
            getElementPos: function(el) {
                var x = 0,
                    y = 0;
                if (el.getBoundingClientRect) {
                    var box = el.getBoundingClientRect();
                    var el = this.getDocumentElement();
                    var pos = this.getScrollPos();
                    x = box.left + pos.x - el.clientLeft;
                    y = box.top + pos.y - el.clientTop;
                } else {
                    x = el.offsetLeft;
                    y = el.offsetTop;
                    var parent = el.offsetParent;
                    while (parent) {
                        x += parent.offsetLeft;
                        y += parent.offsetTop;
                        parent = parent.offsetParent;
                    }
                }
                return {
                    x: x,
                    y: y
                };
            },
            setObjectStyle: function(obj, style) {
                obj.setAttribute('style', style);
                obj.style.cssText = style;
            }
        },
        events = {};
    var showTips = function(){}
    return Tip;
})();