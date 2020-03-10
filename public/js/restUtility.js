function searchAfi(origin, searchCriteria) {
    let jsonData = "";
    $.get(origin + "/searchAfi", {
        "userInput": searchCriteria,
    }).done(function (data) {
        jsonData = JSON.parse(data);
        console.log("Invoking /searchAfi. Result: " + jsonData);
    });
    return jsonData;
}

function searchImdb(origin, searchCriteria) {
    let jsonData = "";
    $.get(origin + "/searchImdb", {
        "userInput": searchCriteria,
    }).done(function (data) {
        jsonData = JSON.parse(data);
        console.log("Invoking /searchImdb. Result: " + jsonData);
    });
}

$(document).ready(function () {
    let origin = window.location.origin;
    let coverModal = document.getElementById('cover');

    document.getElementById('searchBtn').addEventListener('click', function () {
        let searchCriteria = document.getElementById('searchInput').value;
        coverModal.modal({backdrop: 'static', keyboard: false}) ;
        let afiData = searchAfi(origin, searchCriteria);
        let imdbData = searchImdb(origin, searchCriteria);

        if (afiData === "{\"Results\":[],\"Count\":0}") {
            console.warn("No AFI data available.");
        }


        coverModal.modal('toggle');
    });
});