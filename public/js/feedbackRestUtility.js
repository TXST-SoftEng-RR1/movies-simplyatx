


$(document).ready(function () {
    let origin = window.location.origin;
    let userName = document.getElementById("feedbackName");
    let userEmail = document.getElementById("feedbackEmail");
    let subject = document.getElementById("feedbackSubject");
    let message = document.getElementById("feedbackMessage");
    let successNotice = $("#feedbackSuccessNotice");
    let spinner = $("#feedbackSpinner")

    $("#submitButton").on('click', function () {
        successNotice.addClass('hidden');
        spinner.removeClass('hidden');
        console.log("user name: " + userName.value);
        console.log("user email: " + userEmail.value);
        console.log("subject: " + subject.value);
        console.log("message: " + message.value);

        // anonymous
        if (userEmail.value === "" ) {
        console.log("in anonymous");
            $.get(origin + "/anonFeedback", {
                "feedbackSubject": subject.value,
                "feedbackMessage": message.value
            }).done(function (data) {
                console.log("Response from sending anonymous feedback: " + data);
                $("#feedbackSuccessNotice").removeClass('hidden');
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
                spinner.addClass('hidden');
                successNotice.removeClass('hidden');
            });
        }

    })
});