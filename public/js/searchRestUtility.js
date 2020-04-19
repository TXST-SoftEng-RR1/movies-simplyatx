function searchAfiFocused(origin, searchCriteria, type, sort) {
    let jsonData = "";
    $.get(origin + "/searchAfiFocused", {
        "userInput": searchCriteria, "fieldtype": type, "sorttype": sort,
    }).done(function (data) {
        jsonData = JSON.parse(data);
        console.log("Invoking /searchAfiFocused. Result: " + jsonData);
    });
    return jsonData;
}

function searchAfi(origin, searchCriteria) {
    let jsonData = "";
    $.get(origin + "/searchAfi", {
        "userInput": searchCriteria,
    }).done(function (data) {
        jsonData = JSON.parse(data);
        console.log("Invoking /searchAfi. Result: " + jsonData);
        if (jsonData === "{\"Results\":[],\"Count\":0}") {
            console.warn("No AFI data available.");
        }
    });
    return jsonData;
}

async function searchImdb(origin, searchCriteria) {

    let jsonData = "";
    $.get(origin + "/getDetailedImdbResults", {
        "userInput": searchCriteria,
    }).done(function (data) {
        jsonData = JSON.parse(data);
        console.log("Invoking /searchImdb. Result: " + jsonData);
        console.log("Title: " + jsonData.results[0].name);

        let titleHtmlElement = null;
        for (let i = 0; i < jsonData.results.length; i++) {
            titleHtmlElement = getTitleElement(jsonData.results[i]);
            // TODO: append to main screen
            $("#movieReelImg").addClass("hidden");
            $("#searchResults").append(titleHtmlElement);
        }
        $("#cover").modal('hide');
    });
}

//id, title, url, year, description, posterUrl
function getTitleElement(imdbResult) {
    let id = imdbResult.id;
    let title = imdbResult.name;
    let url = "https://www.imdb.com" + imdbResult.url;
    let releaseDate = imdbResult.datePublished;
    let description = imdbResult.description;
    let poster = imdbResult.image;
    let trailer = imdbResult.trailer.embedUrl;

    let titleObj = new show(id, title, url, releaseDate, description, poster, trailer);
    return titleObj.constructEntry();
}

$(document).ready(function () {
    let origin = window.location.origin;
    let loadingCover = $("#cover");

    document.getElementById('searchBtn').addEventListener('click', function () {
        let searchCriteria = document.getElementById('searchInput').value;
        loadingCover.modal({backdrop: 'static', keyboard: false});
        searchAfi(origin, searchCriteria);
        searchImdb(origin, searchCriteria).then(r => console.log(r));
    });
});