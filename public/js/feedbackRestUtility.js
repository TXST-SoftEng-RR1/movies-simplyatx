


$(document).ready(function () {
    let origin = window.location.origin;

    let userName = $("#feedbackName");
    let userEmail = $("#feedbackEmail");
    let subject = $("#feedbackSubject");
    let message = $("#feedbackMessage");

    $("#submitButton").on('click', function () {
        console.log("user name: " + userName.value);
        console.log("user email: " + userEmail.value);
        console.log("subject: " + subject.value);
        console.log("message: " + message.value);

        let response = "";
        // anonymous
        if (userEmail === null) {
            $.get(origin + "/anonFeedback", {
                "feedbackSubject": subject,
                //TODO: add last variable; last line does not have a commma
            }).done(function (data) {
                data = JSON.parse(response);
                console.log("Response: " + data);
            });
        } else {    // anonymous
            $.get(origin + "/searchImdb", {
                "feedbackName": userName,
                //TODO: add 3 other variables; last line does not have a commma
            }).done(function (data) {
                data = JSON.parse(data);
                console.log("Invoking /searchImdb. Result: " + data);
            });
        }

    })
});