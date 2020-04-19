
  // Set the configuration for your app
  
const firebaseConfig = {
  apiKey: "AIzaSyDtt3Yuz864i09jw5bztgfB_1Q4OQ54ZM0",
  authDomain: "movies-simplyatx.firebaseapp.com",
  databaseURL: "https://movies-simplyatx.firebaseio.com",
  projectId: "movies-simplyatx",
  storageBucket: "movies-simplyatx.appspot.com",
  messagingSenderId: "357033553685",
  appId: "1:357033553685:web:6a9768c02f0b907f11831c",
  measurementId: "G-FHBLZJVSQ2"
};
var Database = null;
var UserID = null;
  
function connectDatabase(){
  firebase.initializeApp(firebaseConfig);
  // Get a reference to the database service
  Database = firebase.database();
  UserID = firebase.auth().currentUser.uid;
}

function queryDatabase(uid, table, key=null){
	var dataobject =  Database.ref(table).once('value');
	if(key){
		return dataobject[key];
	}
	else{
		return dataobject;
	}
}

function updateDatabase(table, key, value) {
	Database.ref(table).set({key: value)});
}