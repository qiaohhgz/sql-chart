function log(v) {
    console.log(v);
    if (typeof v == 'object') {
        v = JSON.stringify(v);
    }
    if ($("#log").children().length >= 20) {
        $("#log").children().first().remove();
    }
    $("#log").append("<p>" + v + "</p>");
}
function dateToString(val) {
    var d = new Date(parseInt(val));
    var h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
    if (h < 10) h = "0" + h;
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    return h + ":" + m + ":" + s;
}