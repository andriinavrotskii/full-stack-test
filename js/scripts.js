var start = function() {
    console.log('HELLO');
}


var ajaxRequest = function() {
    $.get("/api/articles", function(data, status){
        console.log(status);
        console.log(data);
    });
}


$(document).ready(function(){
    $("#start").click(function(){
        start();
        ajaxRequest();
    });
});