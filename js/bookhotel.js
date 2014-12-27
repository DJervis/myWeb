function initDate(sj, type) {
    var objY = sj.getFullYear(), objM = sj.getMonth() + 1, objD = sj.getDate(); 
    if(objM.toString().length < 2){
        var objMstr = "0" + objM.toString();
    }else{
        var objMstr = objM;
    }
    if(objD.toString().length < 2){
        var objDstr = "0" + objD.toString();
    }else{
        var objDstr = objD;
    }
    document.getElementById(type).value = objY + "-" + objMstr + "-" + objDstr;
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

        var inY=strToDate("checkin").getFullYear(), outY=strToDate("checkout").getFullYear();
        var inM=strToDate("checkin").getMonth(), outM=strToDate("checkout").getMonth();
        var inD=strToDate("checkin").getDate(), outD=strToDate("checkout").getDate();
        //console.log(inY+","+inM+","+inD+"--"+outY+","+outM+","+outD);
        function chg(){
            checkoutT.setTime(checkinT.getTime() + 864e5);
            initDate(checkoutT, "checkout");
        }           
        if(inY>=outY){
            if(inY>outY){
                chg();
            }else if(inM>=outM){
                if(inM>outM){
                    chg();
                }else if(inD>=outD){
                    chg();
                }
            }
        }
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
        JTC.setday();
    };
    Ocheckout.onfocus = function() {
        this.style.color = "#333";
        JTC.setday();
    };
    Ocheckin.onblur = function() {
        this.style.color = "#858585";
        checkinChange();
    };
    Ocheckout.onblur = function() {
        this.style.color = "#858585";
    };
    icoIn.onclick = function(){
        Ocheckin.focus();
    }
    icoOut.onclick = function(){
        Ocheckout.focus();
    }
})();