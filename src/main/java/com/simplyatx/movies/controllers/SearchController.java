/*
 * Copyright (c) 2020. SimplyATX.com
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package com.simplyatx.movies.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Author: Justin Franz
 * Obtain results based on user search criteria in JSON format
 */
@RestController
public class SearchController {
    Logger logger = Logger.getLogger(SearchController.class.getName());

    @Value("${afiUrl}")
    private String afiUrl;
    @Value("${imdbIdUrl}")
    private String imdbIdUrl;
    @Value("${imdbUrl}")
    private String imdbUrl;

    /**
     *
     * @param rd
     * @return
     * @throws IOException
     */
    private static String getString(Reader rd) throws IOException {
        StringBuilder sb = new StringBuilder();
        int cp;
        while ((cp = rd.read()) != -1) {
            sb.append((char) cp);
        }
        return sb.toString();
    }

    /**
     *
     * @param url
     * @return
     * @throws IOException
     */
    private String getStringFromUrl(String url) throws IOException {
        logger.log(Level.INFO, url);
        URLConnection urlc = new URL(url).openConnection();
        urlc.setRequestProperty("User-Agent",
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36");
        try (InputStream instr = urlc.getInputStream()) {
            BufferedReader rdr = new BufferedReader(new InputStreamReader(instr, StandardCharsets.UTF_8));
            return getString(rdr);
        }
    }

    /**
     *
     * @param userInput
     * @return
     * @throws IOException
     */
    @GetMapping("/searchAfi")
    public String search(String userInput) throws IOException {
        return search(userInput, "ALL", "sortByRelevance");
    }

    /**
     *
     * @param userInput
     * @param fieldtype
     * @param sorttype
     * @return
     * @throws IOException
     */
    @GetMapping("/searchAfiFocused")
    public String search(String userInput, String fieldtype, String sorttype) throws IOException {
        String packet = getStringFromUrl(String.format(afiUrl, URLEncoder.encode(userInput, "UTF-8"), fieldtype, sorttype));
        JSONParser jp = new JSONParser();
        JSONBuilder jb = new JSONBuilder(jp.parseAfiResults(packet));
        return jb.make();
    }

    /**
     *
     * @param userInput
     * @return
     * @throws IOException
     */
    @GetMapping("/searchImdb")
    public String retrieve(String userInput) throws IOException {
        char firstChar = userInput.toLowerCase(Locale.ENGLISH).charAt(0);
        String packet = getStringFromUrl(String.format(imdbIdUrl, firstChar, URLEncoder.encode(userInput, "UTF-8")));
        JSONParser jp = new JSONParser();
        String movieId = jp.parseImdbIdResult(packet);

        // parseImdbIdResult returns null if 'id:' does not exist in the JSON response
        // so, do not error out but instead indicate no results are available for search parameter
        if (movieId == null) {
            return "null";
        }

        String html_string = getStringFromUrl(String.format(imdbUrl, movieId));
        JSONBuilder jb = new JSONBuilder(jp.parseImdbDisplayJson(html_string));
        return jb.make();
    }
}
