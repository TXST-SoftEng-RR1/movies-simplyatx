/**
 * @author Borislav S. Sabotinov
 * This class defines the concept of a "show" (movies and TV shows).
 * It encapsulates the properties a show should contain.
 */
class show {

    constructor(id, title, url, year, description, posterUrl ) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.year = year;
        this.description = description;
        this.posterUrl = posterUrl;
    }

    constructEntry() {
        let result = "";
        result += "<div class='card flex-row flex-wrap'>";
        result +=   "<div class='card-header border-0'>";
        result +=       "<img height='150' width='100' src='" + this.posterUrl + "' alt=''>";
        result +=   "</div>";
        result +=       "<div class='card-block px-2'>";
        result +=           "<h4 class='card-title'>" + this.title + " - " + this.year +" </h4>";
        result +=           "<p class='card-text'>" + this.description + "</p>";
        result +=           "<a href=" + this.url + " class='btn btn-primary'>Link to Imdb</a>";
        result +=       "</div>";
        result +=       "<div class='w-100'></div>";
        result +=       "<div class='card-footer w-100 text-muted'>";
        result +=           "Footer stating cats are CUTE little animals";
        result +=       "</div>";
        result += "</div>";

        return result;
    }
}