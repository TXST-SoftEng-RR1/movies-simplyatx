/**
 * @author Borislav S. Sabotinov
 * This class defines the concept of a "show" (movies and TV shows).
 * It encapsulates the properties a show should contain.
 */
class show {

    constructor(_id, _title, _url, _year, _description, _posterUrl, _trailer, _genre) {
        this.titleId = _id;
        console.warn("title id: " + this.titleId);
        this.title = _title;
        this.url = _url;
        this.year = _year;
        this.description = _description;
        this.posterUrl = _posterUrl;
        this.trailer = _trailer;
        this.genre = _genre;
    }

    constructEntry() {
        let result = "";
        result += "<br/>";
        result += "<div class='card flex-row flex-wrap' style=\"margin-right: 10px;\">";
        result +=     "<div class='card-header border-0'>";
        if (this.posterUrl === "/img/svg/ninja.svg") {
            result +=     "<img height='150' width='100' ata-toggle=\"tooltip\" data-placement=\"left\" title=\"We couldn't find a poster, it must've sneaked passed us like a ninja!\" class='floatLeft' src='" + this.posterUrl + "' alt='Movie poster'>";
        } else {
            result +=     "<img height='150' width='100' class='floatLeft' src='" + this.posterUrl + "' alt='Movie poster'>";
        }
        result +=         "<div class='card-block px-2' data-toggle=\"tooltip\" data-placement=\"left\" title='Genre(s): "+ this.genre +"'>";
        result +=             "<h5 class='card-title'>" + this.title + " </h5>";
        result +=             "<em>Released: " + this.year + "</em>";
        result +=             "<p class='card-text'>" + this.description + "</p>";
        result +=         "</div>";
        result +=     "</div>";
        result +=     "<div class='w-100'></div>";
        result +=     "<div class='card-footer w-100 text-muted'>";
        result +=         "<a href='" + this.url + "' class='btn btn-warning' target='_blank'><i class=\"fab fa-imdb fa-lg\"></i></a>";
        result +=         "&nbsp;&nbsp;&nbsp;";
        result +=         "<a href='https://imdb.com" + this.trailer + "' class='btn btn-danger' target='_blank'>Trailer</a>";
        result +=         "<br/>How do you feel about it?<br/>";
        result +=         "<div>";
        result +=             "<button id='" + this.titleId + "-e1-btn' type=\"button\" class=\"btn btn-info\" onclick=\"updateSingleEmojiCountForTitle('" + this.titleId + "', 'e1')\">";
        result +=                 "<img class='nav-item' height='20' src='/img/svg/happy-1.svg'> <span id='" + this.titleId + "-e1-grinBadge' class='badge badge-light'>0</span>";
        result +=             "</button>  &nbsp;";
        result +=             "<button id='" + this.titleId + "-e2-btn' type=\"button\" class=\"btn btn-info\" onclick=\"updateSingleEmojiCountForTitle('" + this.titleId + "', 'e2')\">";
        result +=                 "<img class='nav-item' height='20' src='/img/svg/emoticons.svg'> <span id='" + this.titleId + "-e2-mehBadge' class='badge badge-light'>0</span>";
        result +=             "</button>  &nbsp;";
        result +=             "<button id='" + this.titleId + "-e3-btn' type=\"button\" class=\"btn btn-info\" onclick=\"updateSingleEmojiCountForTitle('" + this.titleId + "', 'e3')\">";
        result +=                 "<img class='nav-item' height='20' src='/img/svg/bored-1.svg'> <span id='" + this.titleId + "-e3-snoreBadge' class='badge badge-light'>0</span>";
        result +=             "</button>  &nbsp;";
        result +=             "<button id='" + this.titleId + "-e4-btn' type=\"button\" class=\"btn btn-info\" onclick=\"updateSingleEmojiCountForTitle('" + this.titleId + "', 'e4')\">";
        result +=                 "<img class='nav-item' height='20' src='/img/svg/confused.svg'> <span id='" + this.titleId + "-e4-expressionlessBadge' class='badge badge-light'>0</span>";
        result +=             "</button>  &nbsp;";
        result +=             "<button id='" + this.titleId + "-e5-btn' type=\"button\" class=\"btn btn-info\" onclick=\"updateSingleEmojiCountForTitle('" + this.titleId + "', 'e5')\">";
        result +=                 "<img class='nav-item' height='20' src='/img/svg/suspicious.svg'> <span id='" + this.titleId + "-e5-hmmBadge' class='badge badge-light'>0</span>";
        result +=             "</button>  &nbsp;";
        result +=             "<button id='" + this.titleId + "-e6-btn' type=\"button\" class=\"btn btn-info\" onclick=\"updateSingleEmojiCountForTitle('" + this.titleId + "', 'e6')\">";
        result +=                 "<img class='nav-item' height='20' src='/img/svg/crying-1.svg'> <span id='" + this.titleId + "-e6-cryBadge' class='badge badge-light'>0</span>";
        result +=             "</button>  &nbsp;";
        result +=             "<button id='" + this.titleId + "-e7-btn' type=\"button\" class=\"btn btn-info\" onclick=\"updateSingleEmojiCountForTitle('" + this.titleId + "', 'e7')\">";
        result +=                 "<img class='nav-item' height='20' src='/img/svg/angry.svg'> <span id='" + this.titleId + "-e7-angryBadge' class='badge badge-light'>0</span>";
        result +=             "</button>  &nbsp;";
        result +=         "</div>";
        result +=     "</div>";
        result += "</div>";

        return result;
    }
}