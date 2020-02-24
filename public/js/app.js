document.addEventListener('DOMContentLoaded', function() {
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

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

    if (!firebase.apps.length) {
        // firebase.initializeApp({});
        firebase.initializeApp(firebaseConfig);
    }


    try {
        let app = firebase.app();
        let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
        document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;



        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());

        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return true;
                },
                uiShown: function() {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '/',
            signInOptions: [
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                },
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            // Terms of service url.
            tosUrl: '/termsOfService',
            // Privacy policy url.
            privacyPolicyUrl: '/privacyPolicy'
        };

        ui.start('#firebaseui-auth-container', uiConfig);

        let displayName;
        let email;
        let emailVerified;
        let photoURL;
        let uid;
        let phoneNumber;
        let providerData;

        initApp = function() {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    displayName = user.displayName;
                    email = user.email;
                    emailVerified = user.emailVerified;
                    photoURL = user.photoURL;
                    uid = user.uid;
                    phoneNumber = user.phoneNumber;
                    providerData = user.providerData;
                    user.getIdToken().then(function(accessToken) {
                        document.getElementById('sign-in-status').textContent = 'Signed in';
                        document.getElementById('sign-in').textContent = 'Sign out';
                        document.getElementById('account-details').textContent = JSON.stringify({
                            displayName: displayName,
                            email: email,
                            emailVerified: emailVerified,
                            phoneNumber: phoneNumber,
                            photoURL: photoURL,
                            uid: uid,
                            accessToken: accessToken,
                            providerData: providerData
                        }, null, '  ');

                        document.getElementById('signInBtn').classList.add("hidden");
                        document.getElementById('acctBtn').classList.remove("hidden");

                        let profileImageElem = document.createElement("img");
                        profileImageElem.src = photoURL;
                        document.getElementById("profileImg").appendChild(profileImageElem);
                    });
                } else {
                    // User is signed out.
                    document.getElementById('sign-in-status').textContent = 'Signed out';
                    document.getElementById('sign-in').textContent = 'Sign in';
                    document.getElementById('account-details').textContent = 'null';
                }
            }, function(error) {
                console.log(error);
            });
        };

        window.addEventListener('load', function() {
            initApp();
        });

    } catch (e) {
        console.error(e);
        document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
});