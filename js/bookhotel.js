//function initDate(sj,type){var objY=sj.getFullYear(),objM=sj.getMonth()+1,objD=sj.getDate();document.getElementById(type).value=objY+"-"+objM+"-"+objD;document.getElementById(type+"_year_month").value=objY+"-"+objM;document.getElementById(type+"_monthday").value=objD};function checkoutDate(){initDate(strToDate("checkin"),"checkin");initDate(strToDate("checkout"),"checkout")};function strToDate(objid){var objt=new Date();var dateStr=document.getElementById(objid).value;if(dateStr&&dateStr!=""){var dateArr=dateStr.split("-")};objt.setFullYear(dateArr[0]);objt.setMonth(dateArr[1]-1);objt.setDate(dateArr[2]);return objt};function checkinChange(){setTimeout(function(){var checkinT=strToDate("checkin");var checkoutT=new Date();checkoutT.setTime(checkinT.getTime()+86400000);initDate(checkoutT,"checkout")},200)}(function(){var Dest=document.getElementById('destination');var Ocheckin=document.getElementById('checkin');var Ocheckout=document.getElementById('checkout');var tod=new Date(),mon=new Date();mon.setTime(tod.getTime()+86400000);initDate(tod,"checkin");initDate(mon,"checkout");Dest.onfocus=function(){this.value=""};Dest.onblur=function(){this.value="Âü¹È"};Ocheckin.onfocus=function(){JTC.setday()};Ocheckout.onfocus=function(){JTC.setday()};Ocheckin.onblur=function(){checkinChange()}})()
function initDate(sj, type) {
    var objY = sj.getFullYear(), objM = sj.getMonth() + 1, objD = sj.getDate();
    document.getElementById(type).value = objY + "-" + objM + "-" + objD;
    document.getElementById(type + "_year_month").value = objY + "-" + objM;
    document.getElementById(type + "_monthday").value = objD;
}

function checkoutDate() {
    initDate(strToDate("checkin"), "checkin");
    initDate(strToDate("checkout"), "checkout");
	document.charset="utf-8";
}

function strToDate(objid) {
    var objt = new Date();
    var dateStr = document.getElementById(objid).value;
    if (dateStr && dateStr != "") {
        var dateArr = dateStr.split("-");
    }
    objt.setFullYear(dateArr[0]);
    objt.setMonth(dateArr[1] - 1);
    objt.setDate(dateArr[2]);
    return objt;
}

function checkinChange() {
    setTimeout(function() {
        var checkinT = strToDate("checkin");
        var checkoutT = new Date();
        checkoutT.setTime(checkinT.getTime() + 864e5);
        initDate(checkoutT, "checkout");
    }, 200);
}

(function() {
    var Dest = document.getElementById("destination");
    var Ocheckin = document.getElementById("checkin");
    var Ocheckout = document.getElementById("checkout");
	var icoIn = document.getElementById("ico_in");
	var icoOut = document.getElementById("ico_out");
    var tod = new Date(), mon = new Date();
    mon.setTime(tod.getTime() + 864e5);
    initDate(tod, "checkin");
    initDate(mon, "checkout");
    Dest.onfocus = function() {
        this.value = "";
		this.style.color = "#333";
    };
    Dest.onblur = function() {
		this.style.color = "#858585";
		if(this.value == "" || this.value == this.defaultValue){
			this.value = this.defaultValue;
		}
    };
    Ocheckin.onfocus = function() {
		this.style.color = "#333";
		icoIn.style.backgroundPosition = "0 -14px";
        JTC.setday();
    };
    Ocheckout.onfocus = function() {
		this.style.color = "#333";
		icoOut.style.backgroundPosition = "0 -14px";
        JTC.setday();
    };
    Ocheckin.onblur = function() {
		this.style.color = "#858585";
		icoIn.style.backgroundPosition = "0 0";
        checkinChange();
    };
	Ocheckout.onblur = function() {
		this.style.color = "#858585";
		icoOut.style.backgroundPosition = "0 0";
    };
	icoIn.onclick = function(){
		Ocheckin.focus();
	}
	icoOut.onclick = function(){
		Ocheckout.focus();
	}
})();