/*
 * Copyright (c) 2020. FilmsReel.com
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

package com.filmsreel.movies.controllers;

/**
 * @author Justin Franz
 */
class JSONParser {

    /**
     *
     * @param json raw AFI results
     * @return
     */
    public String parseAfiResults(String json) {
        // Need to add checks for null results
        if (json.indexOf("\"Results\":null") != -1)
            return "\"Results\":[], \"Count\":0";
        int fi = json.indexOf("\"Results");
        String start = json.substring(fi);
        int li = start.indexOf("},\"PeopleSearch\"");
        return start.substring(0, li);
    }

    /**
     *
     * @param json raw IMDB results
     * @return
     */
    public String parseImdbIdResult(String json) {
        int idi = json.indexOf("\"id\":");
        if (idi == -1)
            return null;
//        String id_parse = json.substring(idi + 6);
//        return id_parse.substring(0, id_parse.indexOf("\",\""));
        return json;
    }

    /**
     *
     * @param htmlString
     * @return
     */
    public String parseImdbDisplayJson(String htmlString) {
        int jsoni = htmlString.indexOf("<script type=\"application/ld+json\">");
        String start = htmlString.substring(jsoni + 36);
        int end = start.indexOf("}</script>");
        return start.substring(0, end);
    }
}
