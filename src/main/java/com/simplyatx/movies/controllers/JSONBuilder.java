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

/**
 * @author Justin Franz
 */
class JSONBuilder {
    private final StringBuilder sb = new StringBuilder("{");

    /**
     *
     * @param json
     */
    public JSONBuilder(String json) {
        sb.append(json);
    }

    public void add(String key, String value) {
        sb.append(key).append(":").append(value);
    }

    /**
     * Appends closing bracket to IMDb object to make it a valid JSON.
     * @return
     */
    public String make() {
        return sb.append("}").toString();
    }

    /**
     *
     */
    public void empty() {
        sb.delete(0, sb.length());
    }
}
