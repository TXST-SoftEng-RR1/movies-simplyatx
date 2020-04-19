/**
 * @author Borislav S. Sabotinov
 * This class defines the concept of a "show" (movies and TV shows).
 * It encapsulates the properties a show should contain.
 */
class show {

    constructor(id, title, url, year, description, posterUrl, trailer) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.year = year;
        this.description = description;
        this.posterUrl = posterUrl;
        this.trailer = trailer;
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
        result +=             "<img class='nav-item' src='/img/emojis/lol.png'>";
        result +=             "<img class='nav-item' src='/img/emojis/grin.png'>";
        result +=             "<img class='nav-item' src='/img/emojis/smile.png'>";
        result +=             "<img class='nav-item' src='/img/emojis/meh.png'>";
        result +=             "<img class='nav-item' src='/img/emojis/snore.png'>";
        result +=             "<img class='nav-item' src='/img/emojis/expressionless.png'>";
        result +=             "<img class='nav-item' src='/img/emojis/hmm.png'>";
        result +=             "<img class='nav-item' src='/img/emojis/cry.png'>";
        result +=             "<img class='nav-item' src='/img/emojis/angry.png'>";
        result +=         "</div>";
        result +=     "</div>";
        result += "</div>";

        return result;
    }
}