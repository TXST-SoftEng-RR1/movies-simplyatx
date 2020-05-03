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

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONObject;
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
    @GetMapping("/getBasicImdbResutls")
    public String retrieve(String userInput) throws IOException {
        char firstChar = userInput.toLowerCase(Locale.ENGLISH).charAt(0);
        String packet = getStringFromUrl(String.format(imdbIdUrl, firstChar, URLEncoder.encode(userInput, "UTF-8")));

        int idi = packet.indexOf("\"id\":");
        if (idi == -1)
            return "No results";
        else
            return packet;
    }

    @GetMapping("/getDetailedImdbResults")
    public String getDetailedImdbResults(String userInput) throws IOException {
        String packet = retrieve(userInput);

        if ("No results".equals(packet))
            return "No results";

        int start = packet.indexOf("(");
        int end = packet.indexOf(")");
        packet = packet.substring(start + 1, end);

        JSONObject obj = new JSONObject(packet);
        JSONArray arr = obj.getJSONArray("d");
        JSONParser jp = new JSONParser();
        JSONBuilder jb = null;

        StringBuilder aggregatedResults = new StringBuilder(1000);
        aggregatedResults.append("{ \"results\": [");

        for (int i = 0; i < arr.length(); i++) {
            String id = arr.getJSONObject(i).getString("id");
            System.out.println("id: " + id);
            String html_string = getStringFromUrl(String.format(imdbUrl, id));
            jb = new JSONBuilder(jp.parseImdbDisplayJson(html_string));
            aggregatedResults.append(jb.make());
            if (i != arr.length() - 1) aggregatedResults.append(",");
        }
        aggregatedResults.append("]}");

        return aggregatedResults.toString();
    }
}
