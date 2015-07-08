function ls(key,val) {
    var ls = window.localStorage;
    if(val){
        ls.setItem(key, val);
    }
    return ls.getItem(key);
}

var totalPoints = ls("totalPoints") ? ls("totalPoints") : 10;
$("#updatePoints").val(totalPoints).change(function () {
    var v = $(this).val();
    if (v && !isNaN(+v)) {
        totalPoints = +v;
        if (totalPoints < 5) {
            totalPoints = 5;
        }
        $(this).val("" + totalPoints);
        ls("totalPoints", totalPoints);
    }
});
var showPoint = ls("showPoint") ? ls("showPoint") : "false";
$("#showPoint").val(showPoint).change(function () {
    var v = $(this).val();
    if (v != null) {
        showPoint = v;
        $(this).val("" + showPoint);
        ls("showPoint", showPoint);
    }
});

var updateInterval = ls("updateInterval") ? ls("updateInterval") : 1 * 1000;
$("#updateInterval").val(updateInterval).change(function () {
    var v = $(this).val();
    if (v && !isNaN(+v)) {
        updateInterval = +v;
        if (updateInterval < 1) {
            updateInterval = 1;
        }
        $(this).val("" + updateInterval);
        ls("updateInterval", updateInterval);
    }
});
var apiUrl = ls("updateAPI") ? ls("updateAPI") : "http://localhost:8080/";
$("#updateAPI").val(apiUrl).change(function () {
    var v = $(this).val();
    if (v) {
        apiUrl = v;
        $(this).val(apiUrl);
        ls("updateAPI", apiUrl);
        if(restart){
            restart();
        }
    }
});

$("#debug").click(function () {
    if ($("#log").css("display") == 'none') {
        $(this).html("隐藏日志");
        $("#log").show();
    } else {
        $(this).html("显示日志");
        $("#log").hide();
    }
});