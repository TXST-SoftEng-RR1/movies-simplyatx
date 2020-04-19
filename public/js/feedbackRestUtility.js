


$(document).ready(function () {
    let origin = window.location.origin;
    let userName = document.getElementById("feedbackName");
    let userEmail = document.getElementById("feedbackEmail");
    let subject = document.getElementById("feedbackSubject");
    let message = document.getElementById("feedbackMessage");

    $("#submitButton").on('click', function () {
        console.log("user name: " + userName.value);
        console.log("user email: " + userEmail.value);
        console.log("subject: " + subject.value);
        console.log("message: " + message.value);

    console.log("Finish console log");
        let response = "";
        // anonymous
        if (userEmail.value === "" ) {
        console.log("in anonymous");
            $.get(origin + "/anonFeedback", {
                "feedbackSubject": subject.value,
                "feedbackMessage": message.value
            }).done(function (data) {
                console.log("Response from sending anonymous feedback: " + data);
            });
        } else {    // non-anonymous
        console.log("in non-anonymous");
            $.get(origin + "/feedback", {
                "feedbackName": userName.value,
                "feedbackEmail": userEmail.value,
                "feedbackSubject": subject.value,
                "feedbackMessage": message.value
            }).done(function (data) {
                console.log("Response from sending non-anonymous feedback: " + data);
            });
        }

    })
});