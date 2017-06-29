$(document).ready(function(){
    $("#start").click(function(){
        $("#content").show();
        ajaxRequest();
    });
});


var ajaxRequest = function() {
    $.post("/api/articles", function(data, status){
        dataObj = JSON.parse(data);

        if (status == 'success') {
            generateTable(dataObj);
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
                "<tr><td>"
                + item.id
                + "</td><td>"
                + "<img src='"
                + content.title.title_image
                + "'>"
                + "</td><td>"
                + content.title.title 
                + " <a href='" + content.url + "'>Read more</a>"
                + "</td><td>" 
                + "<img src='/images/flags/"
                + item.lang
                + ".gif'>"
                + "</td><td>"
                + "<img src='/images/icons/"
                + statusName
                + ".gif'>"
                + "</td></tr>";

    });

    $("#table").html(tableHeader + tableContent + tableFooter);

}

