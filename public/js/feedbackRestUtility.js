


$(document).ready(function () {

    let jsName = document.getElementById("feedbackName");
    let jqName = $("#feedbackName");

    document.getElementById('submitButton').addEventListener('click', function () {
        console.log("JS name: " + jsName.value);
        console.log("JQ name: " + jqName.value);
    })
});