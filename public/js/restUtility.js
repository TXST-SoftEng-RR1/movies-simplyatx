$(document).ready(function () {
    let origin = window.location.origin;
    let body = $("body");

    document.getElementById('searchBtn').addEventListener('click', function () {
        let jsonData = "";
        let searchCriteria = document.getElementById('searchInput').value;
        $('#cover').modal({backdrop: 'static', keyboard: false}) ;
        $.get(origin + "/search", {
            "searchterm": searchCriteria,
        }) .done(function(data) {
            console.log( "Invoking /search. Result: " + data);
            jsonData = JSON.parse(data);

            $('#cover').modal('toggle');
        });
        console.log(jsonData);
    });
});