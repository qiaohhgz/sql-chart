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