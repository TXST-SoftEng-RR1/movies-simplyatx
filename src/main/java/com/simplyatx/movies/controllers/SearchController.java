package com.simplyatx.movies.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.Charset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
public class SearchController {
Logger logger = Logger.getLogger(SearchController.class.getName());
    @Value("${TARGET:World}")
    private String afiurl = "https://catalog.afi.com/Search/Search?searchText=%s&searchField=%s&sortType=%s&logSearch=false&moviesOnly=true&peopleOnly=false";
    private String imdbidurl = "https://v2.sg.media-imdb.com/titles/%c/%s.json";
    private String imdburl = "https://m.imdb.com/title/%s";

    private static String getstring(Reader rd) throws IOException {
        StringBuilder sb = new StringBuilder();
        int cp;
        while ((cp = rd.read()) != -1) {
            sb.append((char) cp);
        }
        return sb.toString();
    }

    private String getstringfromurl(String url) throws IOException {
        logger.log(Level.INFO, url);
        URLConnection urlc = new URL(url).openConnection();
        urlc.setRequestProperty("User-Agent",
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36");
        InputStream instr = urlc.getInputStream();
        try {
            BufferedReader rdr = new BufferedReader(new InputStreamReader(instr, Charset.forName("UTF-8")));
            return getstring(rdr);
        } finally {
            instr.close();
        }
    }

@GetMapping("/search")
    public String search(String searchterm) throws IOException {
        return search(searchterm, "ALL", "sortByTitle");
    }

@GetMapping("/search")
    public String search(String searchterm, String fieldtype, String sorttype) throws IOException {
        String packet = getstringfromurl(String.format(afiurl, searchterm, fieldtype, sorttype));
        JSONParser jp = new JSONParser();
        JSONBuilder jb = new JSONBuilder(jp.parse_AFI_results(packet));
        return jb.make();
    }

@GetMapping("/retrieve")
    public String retrieve(String moviename) throws IOException {
        char firstchar = moviename.toLowerCase().charAt(0);
        String packet = getstringfromurl(String.format(imdbidurl, firstchar, URLEncoder.encode(moviename, "UTF-8")));
        JSONParser jp = new JSONParser();
        String movieid = jp.parse_IMDB_ID_result(packet);
        String html_string = getstringfromurl(String.format(imdburl, movieid));
        JSONBuilder jb = new JSONBuilder(jp.parse_IMDB_DisplayJson(html_string));
        return jb.make();
    }
}
