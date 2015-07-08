function log(v) {
    console.log(v);
    if(typeof v == 'object'){
        v = JSON.stringify(v);
    }
    if ($("#log").children().length >= 20) {
        $("#log").children().first().remove();
    }
    $("#log").append("<p>" + v + "</p>");
}
function dateToString(val){
    var d = new Date(parseInt(val));
    return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}