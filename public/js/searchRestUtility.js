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
 */
function searchImdb(origin, searchCriteria) {
    let jsonData = "";
    let searchResultsDiv = $("#searchResults");
    let movieReelImg = $("#movieReelImg");
    $.get(origin + "/getDetailedImdbResults", {
        "userInput": searchCriteria,
    }).done(function (data) {
        jsonData = JSON.parse(data);
        console.log("Invoking /searchImdb. Result: " + jsonData);
        console.log("Title: " + jsonData.results[0].name);

        // clear any previous search results
        searchResultsDiv.empty();

        let titleHtmlElement = null;
        for (let i = 0; i < jsonData.results.length; i++) {
            titleHtmlElement = getTitleElement(jsonData.results[i]);
            movieReelImg.addClass("hidden");
            $("#searchPromptId").addClass("hidden");
            searchResultsDiv.append(titleHtmlElement);
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
    let id = "";
    let title = "";
    let url = "";
    let releaseDate = "";
    let description = "";
    let poster = "";
    let trailer = "";
    let genre = "";

    if (imdbResult) {
        id = imdbResult.url.toString().substring(7, 16);
        if (typeof imdbResult.name !== 'undefined') {
            title = imdbResult.name;
        } else {
            console.warn("No title available - cannot display.");
            return "";
        }

        url = imdbResult.url ? "https://www.imdb.com" + imdbResult.url : "#";
        releaseDate = imdbResult.datePublished ? imdbResult.datePublished : "N/A";
        description = imdbResult.description ? imdbResult.description : "No description is available for this title.";

        poster = typeof imdbResult.image !== 'undefined' ? imdbResult.image : "/img/svg/ninja.svg";
        trailer = ((imdbResult.trailer) && (imdbResult.trailer.embedUrl)) !== undefined ? imdbResult.trailer.embedUrl : "#";

        if (typeof imdbResult.genre !== undefined) {
            for (let aGenre of imdbResult.genre) {
                genre += aGenre;
                genre += "; "
            }
        }
        let titleObj = new show(id, title, url, releaseDate, description, poster, trailer, genre);
        return titleObj.constructEntry();
    } else {
        return "No results.";
    }
}

$(document).ready(function () {
    let origin = window.location.origin;
    let loadingCover = $("#cover");
    let searchBtn = $("#searchBtn");
    let searchInput = $("#searchInput");
    const ENTER_KEY_CODE = 13;

    searchBtn.on('click', function () {
        let searchCriteria = document.getElementById('searchInput').value;
        loadingCover.modal({backdrop: 'static', keyboard: false});
        searchAfi(origin, searchCriteria);
        searchImdb(origin, searchCriteria);
    });

    searchInput.on('keypress', function (event) {
        if (event.which === ENTER_KEY_CODE) {
            searchBtn.click();
        }
    })
});