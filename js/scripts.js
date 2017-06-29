$(document).ready(function(){
    $("#start").click(function(){
        $("#content").show();
        ajaxRequest();
    });

    $("#selectLang").change(function(){
        ajaxRequest({
            'lang': $("#selectLang option:selected").val()
        });
    });

    $("img.status").click(function(){
        let id = $(this).parent().find('.id').text();
        ajaxRequestUpdateStatus(id);
    });    
});


var ajaxRequestUpdateStatus = function(id) {
    $.get("/api/articles/id", function(data, status){
        dataObj = JSON.parse(data);

        if (status == 'success') {
            // update img
        } else {
            console.log('Something wrong!')
        }
    });    
}


var ajaxRequest = function(data) {
    $.post("/api/articles", data, function(data, status){
        dataObj = JSON.parse(data);

        if (status == 'success') {
            if (dataObj.length > 0) {
                generateTable(dataObj);
            } else {
                alert('No data for selected language');
            }
        } else {
            console.log('Something wrong!')
        }
    });
}


var generateTable = function(dataObj) {
        console.log('generateTable');

    let tableHeader = "<table class='table table-striped'><thead><tr><th>ID</th><th>Image</th><th>Title</th><th>Language</th><th>Status</th></tr></thead><tbody>";
    let tableFooter = "</tbody></table>";

    let tableContent = "";

    dataObj.forEach(function(item, index) {
        let content = JSON.parse(item.content);

        if (item.status == '0') {
            var statusName = 'eye-red';
        } else if (item.status == '1') {
            var statusName = 'eye-yellow';
        } else if (item.status == '2') {
            var statusName = 'eye-green';
        } else {
            var statusName = 'eye-red';
        }

        tableContent += 
                "<tr><td class='id'>"
                + item.id
                + "</td><td class='title_image'>"
                + "<img src='"
                + content.title.title_image
                + "'>"
                + "</td><td class='title'>"
                + content.title.title 
                + " <a href='" + content.url + "'>Read more</a>"
                + "</td><td class='lang'>" 
                + "<img src='/images/flags/"
                + item.lang
                + ".gif'>"
                + "</td><td class='status'>"
                + "<img class='status' src='/images/icons/"
                + statusName
                + ".gif'>"
                + "</td></tr>";

    });

    $("#table").html(tableHeader + tableContent + tableFooter);

}

