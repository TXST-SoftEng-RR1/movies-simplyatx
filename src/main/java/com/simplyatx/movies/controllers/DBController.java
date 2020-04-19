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

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.*;
import com.google.firebase.quickstart.email.MyEmailer;
import com.google.firebase.quickstart.model.Post;
import com.google.firebase.quickstart.model.User;
import java.io.IOException;
import org.knowm.sundial.SundialJobScheduler;

import java.io.FileInputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
public class DBController {
    Logger logger = Logger.getLogger(DBController.class.getName());
	
	private static final String DATABASE_URL = "https://movies-simplyatx.firebaseio.com";

    private static DatabaseReference database;
	
	public DBController(){
		try {
            // [START initialize]
            FileInputStream serviceAccount = new FileInputStream("movies-simplyatx-firebase-adminsdk-si1yn-122b0f8333.json");
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl(DATABASE_URL)
                    .build();
            FirebaseApp.initializeApp(options);
            // [END initialize]
        } catch (IOException e) {
            System.out.println("ERROR: invalid service account credentials. See README.");
            System.out.println(e.getMessage());
        }

        // Shared Database reference
        database = FirebaseDatabase.getInstance().getReference();
	}

	/**
     *
     * @param 
     * @return String
     * @throws
     */
    @GetMapping("/Query")
	String Query(){
		// use ref to access database snapshot....
		database.addListenerForSingleValueEvent(new ValueEventListener() {
		  @Override
		  public void onDataChange(DataSnapshot dataSnapshot) {
			final String reviewId = dataSnapshot.getKey();
			final Reviews reviews = dataSnapshot.getValue(Reviews.class);
			
		  }

		  @Override
		  public void onCancelled(DatabaseError databaseError) {
			System.out.println("Error: " + databaseError.getMessage());
		  }
		});
	}
	
	 /**
     *
     * @param keyName, value
     * @return
     * @throws
     */
	@GetMapping("/Update")
	void Update(String keyName, String value){
		final DatabaseReference update = database.child(keyName);
		// use ref to access database snapshot....
		Map<String, Object> updates = new HashMap<>();
		updates.put(keyName, value);
		update.updateChildrenAsync(updates);
	}
}