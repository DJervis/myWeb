var JTC = function() {
    var j = function() {}, b = {
        dayBgColor:[ "#fdab00", "#FFFFFF", "#edf5fa", "#6899ff" , "#37a"],
        dayColor:[ "#cacaca", "#555555", "#cacaca" ],
        format:"yyyy-MM-dd",
        outObject:null,
        startDay:null,
        minDate:0,
        maxDate:0,
        ranged:1,
        showClear:true,
        today:null,
        bgDivID:"JTC_BG_DIV",
        dayPanelId:"JTC_TheCurDay",
        yearCell:"JTC_TheCurYear",
        monthCell:"JTC_TheCurMonth",
        clearButtonId:"JTC_ClearButton",
        monthSelector:"JTC_MonthSelector",
        yearSelector:"JTC_YearSelector"
    }, a = {
        monthText:{
            zh:[ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ],
            en:[ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ]
        },
        weekDay:{
            zh:[ "日", "一", "二", "三", "四", "五", "六" ],
            en:[ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
        },
        clearBn:{
            zh:"清空",
            en:"Clear"
        },
        todayBn:{
            zh:"今天",
            en:"Today"
        },
        closeBn:{
            zh:"关闭",
            en:"Close"
        },
        yearCell:{
            zh:"单击选择年份",
            en:"Click to select the year"
        },
        monthCell:{
            zh:"单击选择月份",
            en:"Click to select the month"
        }
    }, c = function(k) {//去除空格
        return k.replace(/(\s*$)|(^\s*)/g, "");
    }, d = function(l, k) {
        var k = k || document;
        return k.getElementById(l);
    }, h = function(k, l) {
        var l = l || document;
        return l.createElement(k);
    }, e = function() {
        var k = navigator.userAgent.toLowerCase();
        return {
            VERSION:parseInt(k.match(/(msie|firefox|webkit|opera)[\/:\s](\d+)/) ? RegExp.$2 :"0"),
            IE:k.indexOf("msie") > -1 && k.indexOf("opera") == -1,
            GECKO:k.indexOf("gecko") > -1 && k.indexOf("khtml") == -1,
            WEBKIT:k.indexOf("applewebkit") > -1,
            OPERA:k.indexOf("opera") > -1
        };
    }(), f = {
        today:function() {
            if (b.today != null) {
                return b.today;
            }
            return new Date();
        },
        getLangText:function(k) {
            var l = navigator.appName == "Netscape" ? navigator.language :navigator.browserLanguage;
            return k[l.indexOf("en-") >= 0 ? "en" :"zh"];
        },
        createTable:function(l) {
            var k = h("table", l);
            k.cellPadding = 0;
            k.cellSpacing = 0;
            k.border = 0;
            k.style.cursor = "default";
            return k;
        },
        createButton:function(n, l, m, o) {
            var k = h("input");
            k.setAttribute("type", "button");
            k.value = n;
            if (o) {
                k.id = o;
            }
            f.setObjectStyle(k, l + "cursor:pointer;border:0px;");
            k.onclick = m;
            return k;
        },
        copyConfig:function() {
            var k = [ "format", "outObject", "minDate", "maxDate", "ranged", "showClear", "startDay" ];
            var m = {};
            for (var l = 0; l < k.length; l++) {
                m[k[l]] = b[k[l]];
            }
            b.set = m;
            return b.set;
        },
        formatDate:function(k, m) {
            var n = {
                "M+":k.getMonth() + 1,
                "d+":k.getDate()
            };
            if (/(y+)/.test(m)) {
                m = m.replace(RegExp.$1, (k.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var l in n) {
                if (new RegExp("(" + l + ")").test(m)) {
                    m = m.replace(RegExp.$1, RegExp.$1.length == 1 ? n[l] :("00" + n[l]).substr(("" + n[l]).length));
                }
            }
            return m;
        },
        getCoords:function(k) {
            k = k || window.event;
            return {
                x:k.clientX,
                y:k.clientY
            };
        },
        getDocumentElement:function(k) {
            k = k || document;
            return k.compatMode != "CSS1Compat" ? k.body :k.documentElement;
        },
        getScrollPos:function() {
            var k, m;
            if (e.IE || e.OPERA) {
                var l = this.getDocumentElement();
                k = l.scrollLeft;
                m = l.scrollTop;
            } else {
                k = window.scrollX;
                m = window.scrollY;
            }
            return {
                x:k,
                y:m
            };
        },
        getElementPos:function(m) {
            var k = 0, p = 0;
            if (m.getBoundingClientRect) {
                var n = m.getBoundingClientRect();
                var m = this.getDocumentElement();
                var o = this.getScrollPos();
                k = n.left + o.x - m.clientLeft;
                p = n.top + o.y - m.clientTop;
            } else {
                k = m.offsetLeft;
                p = m.offsetTop;
                var l = m.offsetParent;
                while (l) {
                    k += l.offsetLeft;
                    p += l.offsetTop;
                    l = l.offsetParent;
                }
            }
            return {
                x:k,
                y:p
            };
        },
        setObjectStyle:function(l, k) {
            l.setAttribute("style", k);
            l.style.cssText = k;
        },
        setDate:function(l) {
            if (l == null || l == undefined) {
                return null;
            }
            var m = null;
            var k = typeof l;
            try {
                if (k == "string") {
                    m = new Date(c(l).replace(/[^0-9: ]+/g, "/"));
                } else {
                    if (k == "object") {
                        if (l.getTime()) {
                            m = new Date(l.getTime());
                        }
                    }
                }
            } catch (n) {
                m = null;
            }
            return m;
        },
        isLeapYear:function(k) {
            return 0 == k % 4 && (k % 100 != 0 || k % 400 == 0);
        },
        getMonthCount:function(n, l) {
            var k = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
            var m = k[l - 1];
            if (l == 2 && f.isLeapYear(n)) {
                m++;
            }
            return m;
        },
        getNYearMonth:function(m, k, l) {
            if (l > 0) {
                if (k + l > 12) {
                    k = 1;
                    m++;
                } else {
                    k++;
                }
            } else {
                if (k + l <= 0) {
                    m--;
                    k = 12;
                } else {
                    k--;
                }
            }
            return {
                YY:m,
                MM:k
            };
        },
        getDateNumbers:function(k) {
            return {
                year:k.getFullYear(),
                month:k.getMonth() + 1,
                day:k.getDate()
            };
        },
        getIntegerOfDay:function(n, m, l) {
            if (n == null) {
                return 0;
            }
            if (arguments.length == 1) {
                var k = f.getDateNumbers(n);
                return k.year * 1e4 + k.month * 100 + k.day;
            } else {
                return n * 1e4 + m * 100 + l;
            }
        },
        checkDateRange:function(k) {
            var l = b.set;
            if (l.maxDate == 0 && l.minDate == 0) {
                return true;
            }
            if (l.minDate == 0) {
                return l.ranged == 1 ? k <= l.maxDate :k < l.maxDate;
            } else {
                if (l.maxDate == 0) {
                    return l.ranged == 1 ? k >= l.minDate :k > l.minDate;
                }
            }
            if (l.ranged == 1) {
                return k >= l.minDate && k <= l.maxDate;
            } else {
                return k > l.minDate && k < l.maxDate;
            }
        },
        getEventSrcObject:function() {
            var l = window.event;
            if (l == undefined) {
                var k = arguments.callee.caller;
                while (k.caller != null) {
                    k = k.caller;
                }
                l = k.arguments[0];
            }
            return l.srcElement ? l.srcElement :l.target;
        },
        outObjectValue:function(k) {
            var l = b.set.outObject;
            if (arguments.length < 1) {
                return c(l.tagName.toLowerCase() == "input" ? l.value :l.innerHTML);
            }
            var m = typeof k == "object" ? f.formatDate(k, b.set.format) :"";
            if (l.tagName.toLowerCase() == "input") {
                l.value = m;
            } else {
                l.innerHTML = m;
            }
        }
    }, i = {
        addEvent:function(k, l, m) {
            if (k.addEventListener) {
                k.addEventListener(l, m, false);
            } else {
                if (k.attachEvent) {
                    k.attachEvent("on" + l, m);
                }
            }
        },
        removeEvent:function(k, l, m) {
            if (k.removeEventListener) {
                k.removeEventListener(l, m, false);
            } else {
                if (k.detachEvent) {
                    k.detachEvent("on" + l, m);
                }
            }
        },
        show:function(o, n) {
            var k = "";
            var m = f.today();
            if (b.set.startDay == null) {
                k = f.outObjectValue();
                if (k != "") {
                    k = k.replace(/[^0-9:]/gi, "/");
                    if (new Date(k).toString().toLowerCase() != "invalid date") {
                        m = new Date(k);
                    }
                }
            } else {
                m = b.set.startDay;
            }
            var p = d(b.bgDivID);
            if (p == null || p == undefined) {
                g();
                p = d(b.bgDivID);
            }
            var l = f.getDateNumbers(m);
            i.createDay(l.year, l.month, l.day);
            p.style.top = o + "px";
            p.style.left = n + "px";
            p.style.display = "";
            i.addEvent(document, "keydown", i.keyDown);
            i.addEvent(document, "mousedown", i.mouseDown);
            d(b.clearButtonId).style.display = b.set.showClear ? "" :"none";
        },
        setHeaderYM:function(l, k) {
            d(b.yearCell).innerHTML = l + "年";
            d(b.monthCell).innerHTML = f.getLangText(a.monthText)[k - 1];
            d(b.monthCell).axis = k;
        },
        createDay:function(s, o, v) {
            this.dayRangeEv = function(A, y, w) {
                var z = f.checkDateRange(y);
                A.axis = w;
                A.className = "";
                A.style.backgroundColor = b.dayBgColor[1];
                A.style.color = z === true ? b.dayColor[w === 0 ? 1 :0] :b.dayColor[2];
                A.style.cursor = z === true ? "pointer" :"default";
                A.onmousemove = z === true ? i.dayOnMouseMove :i.emptyFunc;
                A.onmouseout = z === true ? i.dayOnMouseOut :i.emptyFunc;
                A.onclick = z === true ? i.dayOnClick :i.emptyFunc;
            };
            var v = v || 0;
            i.setHeaderYM(s, o);
            var m = new Date(s, o - 1, 1);
            var l = m.getDay();
            l = l < 2 ? l + 7 :l;
            var n = f.getNYearMonth(s, o, -1);
            var u = f.getMonthCount(n.YY, n.MM);
            var q = null;
            for (var p = l - 1; p >= 0; p--) {
                q = d(b.dayPanelId + p);
                q.innerHTML = u - l + p + 1;
                this.dayRangeEv(q, f.getIntegerOfDay(n.YY, n.MM, u - l + p + 1), -1);
            }
            var t = f.getMonthCount(s, o);
            for (var p = 0; p < t; p++) {
                q = d(b.dayPanelId + (l + p));
                q.innerHTML = p + 1;
                this.dayRangeEv(q, f.getIntegerOfDay(s, o, p + 1), 0);
                if (v != p + 1 || q.style.cursor == "default") {
                    q.style.backgroundColor = b.dayBgColor[1];
                    q.className = "";
                } else {
                    q.style.backgroundColor = b.dayBgColor[4];
                    q.style.color = "#fff";
                    q.className = "JTC_CHOOSEDAY";
                }
            }
            var k = l + t;
            var r = f.getNYearMonth(s, o, 1);
            for (var p = 0; p < 42 - l - t; p++) {
                q = d(b.dayPanelId + (k + p));
                q.innerHTML = p + 1;
                this.dayRangeEv(q, f.getIntegerOfDay(r.YY, r.MM, p + 1), 1);
            }
        },
        dayOnMouseMove:function() {
            this.style.backgroundColor = b.dayBgColor[0];
        },
        dayOnMouseOut:function() {
            if (this.className != "JTC_CHOOSEDAY") {
                this.style.backgroundColor = b.dayBgColor[1];
            }else if(this.className == "JTC_CHOOSEDAY"){
                this.style.backgroundColor = b.dayBgColor[4];
            }
        },
        dayOnClick:function() {
            var o = parseInt(d(b.yearCell).innerHTML.match(/\d+/g)), p = parseInt(d(b.monthCell).axis), k = parseInt(this.innerHTML);
            if (this.axis != "0") {
                var q = k > 20 ? -1 :1;
                var m = f.getNYearMonth(o, p, q);
                o = m.YY;
                p = m.MM;
            }
            var l = new Date(o + "/" + p + "/" + k);
            f.outObjectValue(l);
            i.hideLayout();
        },
        emptyFunc:function() {},
        turnMonth:function(o) {
            var l = parseInt(d(b.yearCell).innerHTML.match(/\d+/g)), m = parseInt(d(b.monthCell).axis);
            if (o != 0) {
                var k = f.getNYearMonth(l, m, o);
                l = k.YY;
                m = k.MM;
            }
            i.createDay(l, m);
        },
        showSelector:function(r) {
            var r = r || 1;
            i.hideSelector(r == 1 ? 2 :1);
            var k = r == 1 ? d(b.yearSelector) :d(b.monthSelector);
            var n = k == undefined || k == null;
            if (n) {
                k = h("div");
            } else {
                if (k.style.display != "none") {
                    i.hideSelector(r);
                    return;
                }
                var l = k.childNodes;
                for (var p = l.length - 1; p >= 0; p--) {
                    k.removeChild(l[p]);
                }
            }
            var q = {
                x:parseInt(d(b.bgDivID).style.left.match(/\d+/g)) + (r == 1 ? 32 :85),
                y:parseInt(d(b.bgDivID).style.top.match(/\d+/g)) + 25
            };
            k.id = r == 1 ? b.yearSelector :b.monthSelector;
            var o = "position:absolute; z-index:20010; background-color:#FFFFFF; width:78px; height:120px; top:" + q.y + "px; left:" + q.x + "px; border:1px solid #A77AEB; padding:2px 2px;";
            f.setObjectStyle(k, o);
            var s = f.createTable();
            if (r == 1) {
                var m = parseInt(d(b.yearCell).innerHTML.match(/\d+/g)) - 5;
                i.yearSelector(s, m);
            } else {
                i.monthSelector(s);
            }
            k.appendChild(s);
            if (n) {
                document.body.appendChild(k);
            } else {
                k.style.display = "";
            }
        },
        yearSelector:function(s, k, p) {
            var t = [ "JTC_YEATSELECTOR_PRET", "JTC_YEATSELECTOR_NEXT", "JTC_YEARSELECTOR" ];
            var p = p || 0;
            if (p == 1) {
                for (var n = 0; n < 10; n++) {
                    d(t[2] + n).innerHTML = k + n;
                }
                d(t[0]).onclick = function() {
                    i.yearSelector(s, k - 10, 1);
                };
                d(t[1]).onclick = function() {
                    i.yearSelector(s, k + 10, 1);
                };
                return;
            }
            var u, q;
            for (var n = 0; n < 5; n++) {
                u = s.insertRow(n);
                for (var m = 0; m < 2; m++) {
                    q = u.insertCell(m);
                    q.id = t[2] + (m == 0 ? n :n + 5);
                    q.innerHTML = k + n + m * 5;
                    var l = "width:37px;;height:20px; text-align:center;font-size:12px;cursor:pointer;";
                    f.setObjectStyle(q, l);
                    q.onmousemove = i.dayOnMouseMove;
                    q.onmouseout = i.dayOnMouseOut;
                    q.onclick = function() {
                        d(b.yearCell).innerHTML = this.innerHTML;
                        i.turnMonth(0);
                        i.hideSelector(1);
                    };
                }
            }
            u = s.insertRow(5);
            q = u.insertCell(0);
            q.colSpan = 2;
            var r = "border:0px;background-color:#FFFFFF;width:24px;height:20px; margin:0px 0px;";
            var o = f.createButton("←", r, function() {
                var v = k - 10;
                i.yearSelector(s, v, 1);
            }, t[0]);
            q.appendChild(o);
            o = f.createButton("×", r, function() {
                i.hideSelector(1);
            });
            q.appendChild(o);
            o = f.createButton("→", r, function() {
                var v = k + 10;
                i.yearSelector(s, v, 1);
            }, t[1]);
            q.appendChild(o);
        },
        monthSelector:function(o) {
            var q = f.getLangText(a.monthText);
            for (var m = 0; m < 6; m++) {
                var p = o.insertRow(m);
                for (var l = 0; l < 2; l++) {
                    var k = p.insertCell(l);
                    k.innerHTML = q[m + l * 6];
                    k.axis = m + 1 + l * 6;
                    var n = "width:37px;;height:20px; text-align:center;font-size:12px;cursor:pointer;";
                    f.setObjectStyle(k, n);
                    k.onmousemove = i.dayOnMouseMove;
                    k.onmouseout = i.dayOnMouseOut;
                    k.onclick = function() {
                        d(b.monthCell).axis = this.axis;
                        i.turnMonth(0);
                        i.hideSelector(2);
                    };
                }
            }
        },
        hideSelector:function(k) {
            if (k == 2) {
                if (d(b.monthSelector)) {
                    d(b.monthSelector).style.display = "none";
                }
            } else {
                if (d(b.yearSelector)) {
                    d(b.yearSelector).style.display = "none";
                }
            }
        },
        hideLayout:function() {
            var k = d(b.bgDivID);
            i.hideSelector(1);
            i.hideSelector(2);
            k.style.display = "none";
            i.removeEvent(document, "keydown", i.keyDown);
            i.removeEvent(document, "mousedown", i.mouseDown);
        },
        keyDown:function(k) {
            k = k || window.event;
            if (k.keyCode == 27) {
                i.hideLayout();
            }
        },
        mouseDown:function(u) {
            var k = d(b.bgDivID);
            if (k.style.display == "none") {
                return;
            }
            var q = 0;
            if (d(b.yearSelectCtrl)) {
                q = 1;
            }
            if (d(b.monthSelectCtrl)) {
                q = 1;
            }
            var n, m, l, o;
            var t = f.getElementPos(k);
            n = t.x;
            m = t.y;
            l = n + 170;
            o = m + 190;
            var r = f.getScrollPos();
            var p = f.getCoords(u);
            var v = r.x + p.x;
            var s = r.y + p.y;
            if (q == 1) {
                if (v < n || v > l) {
                    i.hideLayout();
                }
                return;
            }
            if (v < n || v > l || s < m || s > o) {
                i.hideLayout();
            }
        }
    }, g = function() {
        this.getHeaderPanel = function() {
            var t = f.createTable();
            var v = t.insertRow(0);
            var q = v.insertCell(0);
            q.style.width = "30px";
            q.style.height = "23px";
            var s = "width:30px; height:23px; cursor: pointer; border: 0px none; background-color:#37a; color:#fff;";
            var u = f.createButton("<", s, function() {
                i.turnMonth(-1);
            }, "bn_preMonth");
            q.appendChild(u);
            q = v.insertCell(1);
            var r = "cursor:pointer;width:54px; line-height:20px;background-color:#37a; color:#fff;";
            f.setObjectStyle(q, r);
            q.id = b.yearCell;
            q.title = f.getLangText(a.yearCell);
            q.onmousemove = function() {
                this.style.color = "#444";
                this.style.backgroundColor = b.dayBgColor[2];
            };
            q.onmouseout = function() {
                this.style.color = b.dayBgColor[1];
                this.style.backgroundColor = b.dayBgColor[4];
            };
            q.onclick = function() {
                i.showSelector(1);
            };
            q = v.insertCell(2);
            f.setObjectStyle(q, r);
            q.id = b.monthCell;
            q.title = f.getLangText(a.monthCell);
            q.onmousemove = function() {
                this.style.color = "#444";
                this.style.backgroundColor = b.dayBgColor[2];
            };
            q.onmouseout = function() {
                this.style.color = b.dayBgColor[1];
                this.style.backgroundColor = b.dayBgColor[4];
            };
            q.onclick = function() {
                i.showSelector(2);
            };
            q = v.insertCell(3);
            q.style.width = "30px";
            u = f.createButton(">", s, function() {
                i.turnMonth(1);
            });
            q.appendChild(u);
            return t;
        };
        this.getWeekDayPanel = function() {
            var x = f.createTable();
            q = "width:23px; height:20px; cursor:pointer; border-right:1px solid #dfdfdf; border-bottom:1px solid #dfdfdf; line-height:16px;";
            var u = 0;
            var y = null;
            for (var t = 0; t < 6; t++) {
                y = x.insertRow(t);
                for (var s = 0; s < 7; s++) {
                    w = y.insertCell(s);
                    w.id = b.dayPanelId + u;
                    f.setObjectStyle(w, q);
                    u++;
                }
            }
            y = x.insertRow(0);
            var r = f.getLangText(a.weekDay);
            var q = "height:23px; border-top:0px; border-bottom:1px solid #bababa; border-right:0px; border-left:0px;background-color:#FFFFFF;";
            for (var v = 0; v < 7; v++) {
                var w = y.insertCell(v);
                f.setObjectStyle(w, q);
                w.innerHTML = r[v];
            }
            return x;
        };
        this.getBottomPanel = function() {
            var q = f.createTable();
            var r = q.insertRow(0);
            return q;
        };
        var l = f.createTable();
        var n = "border:1px solid #bababa; font-size:12px; text-align:center;";
        f.setObjectStyle(l, n);
        var o = l.insertRow(0);
        var k = o.insertCell(0);
        k.appendChild(this.getHeaderPanel());
        o = l.insertRow(1);
        k = o.insertCell(0);
        k.appendChild(this.getWeekDayPanel());
        o = l.insertRow(2);
        k = o.insertCell(0);
        k.appendChild(this.getBottomPanel());
        var p = h("div");
        p.id = b.bgDivID;
        _style = "position:absolute; width:171px; height:190px;z-index:20000; font-size:12px;display:none;font:arial,simsun,sans-serif;";
        f.setObjectStyle(p, _style);
        if (e.IE && e.VERSION < 7) {
            var m = h("iframe");
            _style = "position:absolute; width:170px; height:185px;z-index:-1;";
            f.setObjectStyle(m, _style);
            m.frameBorder = 0;
            m.scrolling = "no";
            m.src = "about:blank";
            p.appendChild(m);
        }
        p.appendChild(l);
        document.body.appendChild(p);
    };
    j.setday = function(m) {
        var n = f.getEventSrcObject();
        var l = f.copyConfig();
        l.outObject = n;
        this.checkObj = function(p) {
            return d(p) != null && d(p) != undefined;
        };
        if (m) {
            if (typeof m == "string" && this.checkObj(m)) {
                l.outObject = d(m);
            } else {
                if (typeof m.outObject == "string" && this.checkObj(m.outObject)) {
                    l.outObject = d(m.outObject);
                } else {
                    if (typeof m.outObject == "object") {
                        l.outObject = m.outObject;
                    }
                }
            }
            l.showClear = (m.showClear || b.showClear) === false ? false :true;
            l.format = m.format || b.format;
            if (m.today) {
                j.setToday(m.today);
            }
            if (m.minDate != undefined || m.maxDate != undefined) {
                l.minDate = f.getIntegerOfDay(f.setDate(m.minDate));
                l.maxDate = f.getIntegerOfDay(f.setDate(m.maxDate));
                l.ranged = (m.ranged || b.ranged) === false ? 0 :1;
            }
            if (m.readOnly === true) {
                l.outObject.readOnly = true;
            }
            if (m.startDay) {
                l.startDay = f.setDate(m.startDay);
            }
        }
        var o = {
            top:n.offsetTop,
            left:n.offsetLeft,
            height:n.clientHeight
        };
        while (n = n.offsetParent) {
            o.top += n.offsetTop;
            o.left += n.offsetLeft;
        }
        var k = typeof n == "image" ? o.top + o.height :o.top + o.height + 5;
        i.show(k, o.left);
    };
    j.setToday = function(k) {
        b.today = f.setDate(k);
    };
    j.setDateRange = function(l, m, k) {
        b.minDate = f.getIntegerOfDay(f.setDate(l));
        b.maxDate = f.getIntegerOfDay(f.setDate(m));
        b.ranged = k === false ? 0 :1;
    };
    j.setDateFormat = function(k) {
        b.format = k || b.format;
    };
    j.setStartDay = function(k) {
        b.startDay = f.setDate(k);
    };
    return j;
}();