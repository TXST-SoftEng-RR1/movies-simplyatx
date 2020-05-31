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

    let db;

    try {
        let app = firebase.app();
        db = firebase.database();

        firebase.database.enableLogging(function(message) {
            console.log("[FIREBASE-DB]", message);
        });

        let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
        // document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;

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
                    requireDisplayName: true
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

                    console.log("uid: " + uid);

                    user.getIdToken().then(function(accessToken) {
                        document.getElementById('userLogInNavItem').classList.add("hidden");
                        document.getElementById('userAccountNavItem').classList.remove("hidden");
                        document.getElementById('userName').innerHTML = displayName;
                        document.getElementById('userNameForNav').innerHTML = displayName;

                        if (photoURL !== null) {
                            let acctImgPreview = document.getElementById('myAcctImgPreview');
                            let userProfilePic = document.getElementById('userProfilePic');
                            acctImgPreview.classList.remove("far", "fa-user");
                            acctImgPreview.height = 30;
                            acctImgPreview.width = 30;
                            acctImgPreview.src = photoURL;
                            userProfilePic.src = photoURL;
                            userProfilePic.height = 150;
                            userProfilePic.width = 150;
                        }

                        document.getElementById('userEmail').placeholder = email;
                        if (emailVerified) {
                            document.getElementById('userEmailVerified').checked = true;
                        } else {
                            user.sendEmailVerification().then(function() {
                                // Email sent.
                            }).catch(function(error) {
                                // An error happened.
                            });
                        }

                    });
                } else {
                    // User is signed out.
                    document.getElementById('userAccountNavItem').classList.add("hidden");
                    document.getElementById('userLogInNavItem').classList.remove("hidden");
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

    function logout(event) {
        firebase.auth().signOut()
            .then(function() {
                // Sign-out successful.
                console.log("sign out success");
            })
            .catch(function(error) {
                console.log("sign out error");
            });
        initApp();
    }

    document.getElementById('signOutBtn').addEventListener('click', logout);
    $('[data-toggle="tooltip"]').tooltip(); // initialize all tooltips

    return firebase.database().ref('/Reviews/tt0241527').on('value', function(snapshot) {
        console.log(snapshot.val());
    });
});