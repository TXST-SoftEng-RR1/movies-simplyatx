
  // Set the configuration for your app
  
var config = {
	  "type": "service_account",
	  "project_id": "movies-simplyatx",
	  "private_key_id": "122b0f8333c8db55b10e8b3e2cc9ad313c218a49",
	  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCQVxRSZr8qiMrL\ncrv2gFDviAqndBsG6BoXywxvD0pYnR/m0N8qil6gqeootFoml8XU1i2DqXjtgfje\nwJ5XCXoJlJqgfxqhrrRELJp+F449WlgLLd60CEMB/NcE0VVplZe0bOezDd8UD0zc\nYUVGZOkldJCgu9xdRgxwWz08w61px3F/g/hESD6AiP8r6dSWmKzOZdA6uARgNF1O\nTbO4c1dBo3BShcVvIL1mX7jgm9lXlBgCsJ2vayDAQxuizKPsxY0yYROygW+7+s+x\nXs9Bvr+OFvcxBMwOISnLj/OBfYeYkDTesSoNoqmIyFP93F4yZtpGa9T20yHH/wiX\nEV72CLQTAgMBAAECggEAQA0ETZSenCdbpnBhjH9gawq5f5l8LNJuUcSe3eGxIiWH\ndIuXnG8OkskTycBOiPWsqkfoppZbvTmB0Ic1PHZOG1ZAT5xXmwvFnsMUQ4P8cKlY\njI1sWAOaiJVEbTTfbB0f1sbFAqXTKjmn59uaPCSneSGC1HDI1vMwreMvB3nlyBw4\nRFbu+hNWUA9BeFjPMrC3QNbpU8wDw0NeYqQr6H5iS+DzxjSZdCAZTJ+vLutFDWHU\n2ZnbRHCnZB+Fu8eKHouHDdtiQytri9I8DP24KTr7N1gmNRtOmkhu3gJf+MxQy6OH\nGcHmTF2elmy/0xcop1Y+ziL132w6Rz59L3gdR8xGcQKBgQDGxogok1oNaE1Xtg2u\n+i+ZksNPdaxvSdMp+HMyIpHeo5+Mdi9J1NZR7NUTkJR0iQrvhqYLqK4x+9RCcQQd\n8E1ZKlx4DPHo9KPMvfvXOyxnCtpl6i77bK6SpFkOuXPajT2hwt/by/t05Z+aCFgq\nnQH3kB/Ih6vyvO1Cn35eQ9eo1wKBgQC55L11gedXAR72JHM9ioYtZgJu7eDAmMFY\nvyoB3r80QNGhNs8DKGfF6EVVxCHoYjy7KPkLn8hKJmqkWWbd/qxfHfxVGNfy4eiJ\n8CYz1yZ5PPqjpUrbsMFUSLTgxk9YFL0UrEvWtqjIHghvmGSRHdz4gRP5rlsEREw8\nrjyANnJ7JQKBgHyU47Ointc2XvsxNCRN09WJ4XWEyB08BOgSOojal9gVbyMG056P\nkf/o0qcff5wGZF85Ygp+nybesesukCj/ekr/PNNVMa0S3zKshBIimTK/35/uhaG5\nPTTVYqfS3eTFjzI6RDmrACAE5uIQhsm2fAwgPXteZQuPE5klA3urQ5gjAoGAG1Cv\nPjsOYUx63jRQ8rQOL1GT/fTaV7Kaho3ggFHYyrbTltrU5GPli8ErnwSo7tqwjdfh\ncIHUDoFCnk+8u9YWQgvH7kEuSjRD1TECjA+LSblaIv3A2DNK1TWxzm2Vbx3tAsKm\nijBg8LbpCmzcKi63L5TX+JJUMXZPtYLsxPI7NDkCgYEArgMmvmJMZhc7iFKkq/FQ\ntwESjoNC2j+310wCK7z+0pDQpaPmcAI2mZurjEydu5a4AaUeDEBzqrCUY/ZQDJ8c\nkG1c/b96U5wzLm3HoT333cxsmvxTH5SDe0fOMx+2UQ9s1BbdkfZCv4w7UZ7cjmVt\nM2dPeac4sw3I+9HdQ0O1ihs=\n-----END PRIVATE KEY-----\n",
	  "client_email": "firebase-adminsdk-si1yn@movies-simplyatx.iam.gserviceaccount.com",
	  "client_id": "111508396141317257647",
	  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
	  "token_uri": "https://oauth2.googleapis.com/token",
	  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-si1yn%40movies-simplyatx.iam.gserviceaccount.com"
};
var Database = null;
  
function connectDatabase(){
  firebase.initializeApp(config);
  // Get a reference to the database service
  Database = firebase.database();
}
  
function writeUserData(userId, name, email, imageUrl) {
  Database.ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
function queryDatabase(){
	var userId = firebase.auth().currentUser.uid;
	return Database.ref('/users/' + userId).once('value').then(
		function(snapshot) {
		  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
		  // ...
	});
}
function writeNewPost(uid, value) {
  // A post entry.
  var data = {
    key:value
  };

  // Get a key for a new Post.
  var newKey = Database.ref().child('').push().key;

  // Write the new data simultaneously in the list and the user's list.
  var updates = {};
  updates[newKey] = data;

  return Database.ref().update(updates);
}