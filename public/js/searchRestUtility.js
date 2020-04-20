/**
 *
 * @param origin
 * @param searchCriteria
 * @param type
 * @param sort
 * @returns {string}
 */
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

/**
 *
 * @param origin
 * @param searchCriteria
 * @returns {string}
 */
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

/**
 *
 * @param origin
 * @param searchCriteria
 * @returns {Promise<void>}
 */
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

/**
 * id, title, url, year, description, posterUrl
 * @param imdbResult
 * @returns {{top: *, left: *, width, height}|{width, height}|{top: *, left: *, width, height}|{top: *, left: number,
 * width, height}|{top: *, left: number, width, height}|{top: *, left: number, width, height}|*}
 */
function getTitleElement(imdbResult) {
    let id = imdbResult.id ? imdbResult.id : "0";
    let title = imdbResult.name ? imdbResult.name : "No title available";
    let url = imdbResult.url ? "https://www.imdb.com" + imdbResult.url : "#";
    let releaseDate = imdbResult.datePublished ? imdbResult.datePublished : "N/A";
    let description = imdbResult.description ? imdbResult.description : "No description is available for this title.";
    let poster = imdbResult.image ? imdbResult.image : "";
    let trailer = imdbResult.trailer.embedUrl ? imdbResult.trailer.embedUrl : "#";

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