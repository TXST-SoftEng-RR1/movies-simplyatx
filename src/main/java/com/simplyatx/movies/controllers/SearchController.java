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
//    @Value("${TARGET:World}")

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
     * @param searchterm
     * @return
     * @throws IOException
     */
    @GetMapping("/search")
    public String search(String searchterm) throws IOException {
        return search(searchterm, "ALL", "sortByTitle");
    }

    /**
     *
     * @param searchterm
     * @param fieldtype
     * @param sorttype
     * @return
     * @throws IOException
     */
    @GetMapping("/focusedSearch")
    public String search(String searchterm, String fieldtype, String sorttype) throws IOException {
        String packet = getStringFromUrl(String.format(afiUrl, URLEncoder.encode(searchterm, "UTF-8"), fieldtype, sorttype));
        JSONParser jp = new JSONParser();
        JSONBuilder jb = new JSONBuilder(jp.parseAfiResults(packet));
        return jb.make();
    }

    /**
     *
     * @param moviename
     * @return
     * @throws IOException
     */
    @GetMapping("/retrieve")
    public String retrieve(String moviename) throws IOException {
        char firstchar = moviename.toLowerCase(Locale.ENGLISH).charAt(0);
        String packet = getStringFromUrl(String.format(imdbIdUrl, firstchar, URLEncoder.encode(moviename, "UTF-8")));
        JSONParser jp = new JSONParser();
        String movieid = jp.parseImdbIdResult(packet);
        String html_string = getStringFromUrl(String.format(imdbUrl, movieid));
        JSONBuilder jb = new JSONBuilder(jp.parseImdbDisplayJson(html_string));
        return jb.make();
    }
}
