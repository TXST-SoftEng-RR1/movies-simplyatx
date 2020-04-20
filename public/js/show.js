/**
 * @author Borislav S. Sabotinov
 * This class defines the concept of a "show" (movies and TV shows).
 * It encapsulates the properties a show should contain.
 */
class show {

    constructor(_id, _title, _url, _year, _description, _posterUrl, _trailer) {
        this.titleId = _id;
        this.title = _title;
        this.url = _url;
        this.year = _year;
        this.description = _description;
        this.posterUrl = _posterUrl;
        this.trailer = _trailer;
    }

    constructEntry() {
        let result = "";
        result += "<div class='card flex-row flex-wrap'>";
        result +=     "<div class='card-header border-0'>";
        result +=         "<img height='150' width='100' class='floatLeft' src='" + this.posterUrl + "' alt='Movie poster'>";
        result +=         "<div class='card-block px-2' data-toggle=\"tooltip\" data-placement=\"left\" title='"+ this.description +"'>";
        result +=             "<h4 class='card-title'>" + this.title + " - " + this.year +" </h4>";
        result +=             "<p class='card-text'>" + this.description + "</p>";
        result +=         "</div>";
        result +=     "</div>";
        result +=     "<div class='w-100'></div>";
        result +=     "<div class='card-footer w-100 text-muted'>";
        result +=         "<a href='" + this.url + "' class='btn btn-warning' target='_blank'><i class=\"fab fa-imdb fa-large\"></i></a>";
        result +=         "&nbsp;&nbsp;&nbsp;";
        result +=         "<a href='https://imdb.com" + this.trailer + "' class='btn btn-warning' target='_blank'>Trailer</a>";
        result +=         "<br/>";
        result +=         "<div>";
        result +=             "<button id='" + this.titleId + "-e1-btn' type=\"button\" class=\"btn btn-light\" onclick=\"updateSingleEmojiCountForTitle(this.titleId, 'e1')\">";
        result +=                 "<img class='nav-item' src='/img/emojis/lol.png'>'<span id='" + this.titleId + "-e1-lolBadge' class='badge badge-light'>0</span>'";
        result +=             "</button> &nbsp;";
        result +=             "<button id='" + this.titleId + "-e2-btn' type=\"button\" class=\"btn btn-light\" onclick=\"updateSingleEmojiCountForTitle(this.titleId, 'e2')\">";
        result +=                 "<img class='nav-item' src='/img/emojis/grin.png'>'<span id='" + this.titleId + "-e2-grinBadge' class='badge badge-light'>0</span>'";
        result +=             "</button>  &nbsp;";
        result +=             "<button id='" + this.titleId + "-e3-btn' type=\"button\" class=\"btn btn-light\" onclick=\"updateSingleEmojiCountForTitle(this.titleId, 'e3')\">";
        result +=                 "<img class='nav-item' src='/img/emojis/smile.png'>'<span id='" + this.titleId + "-e3-smileBadge' class='badge badge-light'>0</span>'";
        result +=             "</button>  &nbsp;";
        result +=             "<button id='" + this.titleId + "-e4-btn' type=\"button\" class=\"btn btn-light\" onclick=\"updateSingleEmojiCountForTitle(this.titleId, 'e4')\">";
        result +=                 "<img class='nav-item' src='/img/emojis/meh.png'>'<span id='" + this.titleId + "-e4-mehBadge' class='badge badge-light'>0</span>'";
        result +=             "</button>  &nbsp;";
        result +=             "<button id='" + this.titleId + "-e5-btn' type=\"button\" class=\"btn btn-light\" onclick=\"updateSingleEmojiCountForTitle(this.titleId, 'e5')\">";
        result +=                 "<img class='nav-item' src='/img/emojis/snore.png'>'<span id='" + this.titleId + "-e5-snoreBadge' class='badge badge-light'>0</span>'";
        result +=             "</button>  &nbsp;";
        result +=             "<button id='" + this.titleId + "-e6-btn' type=\"button\" class=\"btn btn-light\" onclick=\"updateSingleEmojiCountForTitle(this.titleId, 'e6')\">";
        result +=                 "<img class='nav-item' src='/img/emojis/expressionless.png'>'<span id='" + this.titleId + "-e6-expressionlessBadge' class='badge badge-light'>0</span>'";
        result +=             "</button>  &nbsp;";
        result +=             "<button id='" + this.titleId + "-e7-btn' type=\"button\" class=\"btn btn-light\" onclick=\"updateSingleEmojiCountForTitle(this.titleId, 'e7')\">";
        result +=                 "<img class='nav-item' src='/img/emojis/hmm.png'>'<span id='" + this.titleId + "-e7-hmmBadge' class='badge badge-light'>0</span>'";
        result +=             "</button>  &nbsp;";
        result +=             "<button id='" + this.titleId + "-e8-btn' type=\"button\" class=\"btn btn-light\" onclick=\"updateSingleEmojiCountForTitle(this.titleId, 'e8')\">";
        result +=                 "<img class='nav-item' src='/img/emojis/cry.png'>'<span id='" + this.titleId + "-e8-cryBadge' class='badge badge-light'>0</span>'";
        result +=             "</button>  &nbsp;";
        result +=             "<button id='" + this.titleId + "-e9-btn' type=\"button\" class=\"btn btn-light\" onclick=\"updateSingleEmojiCountForTitle(this.titleId, 'e9')\">";
        result +=                 "<img class='nav-item' src='/img/emojis/angry.png'>'<span id='" + this.titleId + "-e9-angryBadge' class='badge badge-light'>0</span>'";
        result +=             "</button>  &nbsp;";
        result +=         "</div>";
        result +=     "</div>";
        result += "</div>";

        return result;
    }
}