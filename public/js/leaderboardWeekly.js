$.ajax({
    url: "/api/weekly",
    method: "GET"
}).then(function (data) {
    displayRows(data);
});

function displayRows(data) {
    for (var i = 0; i < data.length; i++) {

        var row = $("<tr>").append("<th scope= 'row'>" + (i + 1) +
            "</th><td>" + data[i].username + "</td><td>" +
            data[i].weekly + "</td>");

        $("#score-table").append(row);
    }
}