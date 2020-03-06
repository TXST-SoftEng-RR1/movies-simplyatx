class JSONBuilder {
    private StringBuilder sb = new StringBuilder("{");

    public JSONBuilder() {
    }

    public JSONBuilder(String json) {
        sb.append(json);
    }

    public void add(String key, String value) {
        sb.append(key + ":" + value);
    }

    public String make() {
        return sb.append("}").toString();
    }

    public void empty() {
        sb.delete(0, sb.length());
    }
}
