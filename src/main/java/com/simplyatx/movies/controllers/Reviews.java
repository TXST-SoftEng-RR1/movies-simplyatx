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
 *
 */
class Reviews{
	public String uid;
    public int count;

    public Reviews() {
        // Default constructor required for calls to DataSnapshot.getValue(Post.class)
    }

    public Reviews(String uid, int count) {
        this.uid = uid;
        this.count = count;
    }
}