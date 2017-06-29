$(document).ready(function(){
    $("#start").click(function(){
        ajaxRequest();
    });
});


var ajaxRequest = function() {
    $.post("/api/articles", function(data, status){
        dataObj = JSON.parse(data);
        console.log(status);
        console.log(dataObj);
        if (status == 'success') {
            generateTable(dataObj);
        } else {
            console.log('Something wrong!')
        }
    });
}


var generateTable = function(dataObj) {
        console.log('generateTable');

    let tableHeader = "<table><thead><tr><th>ID</th><th>Image</th><th>Title</th><th>Language</th><th>Status</th></tr></thead><tbody>";
    let tableFooter = "</tbody></table>";

    let tableContent = "";

    dataObj.forEach(function(item, index) {
        let content = JSON.parse(item.content);
        
        tableContent += 
                "<tr><td>"
                + item.id
                + "</td><td>"
                + content.title.title_image
                + "</td><td>"
                + content.title.title 
                + "</td><td>" 
                + item.lang
                + "</td><td>"
                + item.status
                + "</td></tr>";

    });

    $("#table").html(tableHeader + tableContent + tableFooter);

}

