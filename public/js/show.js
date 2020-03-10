/**
 * @author Borislav S. Sabotinov
 * This class defines the concept of a "show" (movies and TV shows).
 * It encapsulates the properties a show should contain.
 */
class show {

    constructor(key, title, year, description, posterUrl, mainCast, ) {
        this.key = key;
        this.title = title;
        this.year = year;
        this.description = description;
        this.posterUrl = posterUrl;
        this.mainCast = mainCast;
    }

    constructEntry() {
        let result = "";
        result += "<div class='card flex-row flex-wrap'>";
        result +=   "<div class='card-header border-0'>";
        result +=       "<img src='" + this.posterUrl + "' alt=''>";
        result +=   "</div>";
        result +=       "<div class='card-block px-2'>";
        result +=           "<h4 class='card-title'>" + this.title + "</h4>";
        result +=           "<p class='card-text'>" + this.description + "</p>";
        result +=           "<a href='#' class='btn btn-primary'>BUTTON</a>";
        result +=       "</div>";
        result +=       "<div class='w-100'></div>";
        result +=       "<div class='card-footer w-100 text-muted'>";
        result +=           "Footer stating cats are CUTE little animals";
        result +=       "</div>";
        result += "</div>";

        return result;
    }
}