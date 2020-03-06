class JSONParser {

    public String parse_AFI_results(String json) {// Need to add checks for null results
        if (json.indexOf("\"Results\":null") != -1)
            return "\"Results\":[], \"Count\":0";
        int fi = json.indexOf("\"Results");
        String start = json.substring(fi);
        int li = start.indexOf("},\"PeopleSearch\"");
        return start.substring(0, li);
    }

    public String parse_IMDB_ID_result(String json) {
        int idi = json.indexOf("\"id\":");
        if (idi == -1)
            return null;
        String id_parse = json.substring(idi + 6);
        String id = id_parse.substring(0, id_parse.indexOf("\",\""));
        return id;
    }

    public String parse_IMDB_DisplayJson(String html_string) {
        int jsoni = html_string.indexOf("<script type=\"application/ld+json\">");
        String start = html_string.substring(jsoni + 36);
        int end = start.indexOf("}</script>");
        String json = start.substring(0, end);
        return json;
    }
}
