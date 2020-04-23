/**
* https://firebase.google.com/docs/reference/js/firebase.database.Reference#transaction
* "transaction() is used to modify the existing value to a new value, ensuring there are no conflicts with other
* clients writing to the same location at the same time."
*
* @param titleId
* @param emojiId
*/
function updateSingleEmojiCountForTitle(titleId, emojiId) {
    // check if user is authenticated
    let user = firebase.auth().currentUser;
    let userEmojiReview = firebase.database().ref('UserReviews/' + user.uid + '/' + titleId);
    let notSameReview = "true";
    localStorage.setItem("notSameReview", notSameReview);

    let myFirstPromise = new Promise((resolve, reject) => {
        // first check - user is logged in
        if (user) {
            // Try to create a record for a titleId (e.g., tt0241527), but only if not already there
            let titleRef = firebase.database().ref('Reviews/' + titleId);
            titleRef.transaction(function (currentData) {
                if (currentData === null) {
                    return {e1: 0, e2: 0, e3: 0, e4: 0, e5: 0, e6: 0, e7: 0};
                } else {
                    console.log('Title' + titleId + ' already exists. Updating emojiId only.');
                    return; // Abort the transaction.
                }
            }, function (error, committed, snapshot) {
                if (error) {
                    console.error('Transaction failed abnormally!', error);
                } else if (!committed) {
                    console.warn('We aborted create transaction. Title already exists.');
                } else {
                    console.log(titleId + ' created with default 0 values for emojiIds.');
                }
            });

            // user review is not null, so
            // 1. if the user's previous review is the same as the current attempted review - return. We are done.
            // 2. if the user's previous review is different than the current
            //   a) decrement the title's count for the user's previous review type
            //   b) update the user's previous review type to the current type

            userEmojiReview.transaction(function (reviewEmojiType) {
                if (reviewEmojiType === null) {
                    return emojiId; // user has never reviewed this title
                } else if (reviewEmojiType === emojiId) {
                    console.warn("review emoji type for user: %s; new emoji type: %s", reviewEmojiType, emojiId);
                    return; // Abort the transaction, user has reviewed this title already in the same way
                } else {
                    let decrementPrevReviewType = firebase.database().ref('Reviews/' + titleId + '/' + reviewEmojiType);
                    decrementPrevReviewType.transaction(function (prevReviewTypeCount) {
                        return prevReviewTypeCount - 1; // remove the user's previous review
                    });
                    return emojiId; // update user's old review to the new type
                }
            }, function (error, committed, snapshot) {
                if (error) {
                    console.error('Transaction failed abnormally!', error);
                } else if (!committed) {
                    localStorage.setItem("notSameReview", "false");
                    console.warn('We aborted update transaction. Reviews are same');
                } else {
                    console.log(titleId + ' for emoji ' + emojiId + ' decremented by -1!');
                }
                console.log(titleId + " data: ", snapshot.val());
            });
        } else {
            $("#logInModal").modal('toggle');
        }

    setTimeout( function() {
        resolve(titleId, emojiId);
    }, 100)});

    myFirstPromise.then((titleId, emojiId) => {
        // successMessage is whatever we passed in the resolve(...) function above.
        // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
        let notSameReview = localStorage.getItem("notSameReview");

        if (notSameReview === "true") {
            console.log("is same review? " + notSameReview);
            // Increment title's new emoji review count by 1 unconditionally.
            let incrementEmojiCount = firebase.database().ref('Reviews/' + titleId + '/' + emojiId);
            incrementEmojiCount.transaction(function (currentCount) {
                // If Reviews/title/emoji has never been set, currentCount will be `null`.
                return currentCount + 1;
            }, function (error, committed, snapshot) {
                if (error) {
                    console.error('Transaction failed abnormally!', error);
                } else if (!committed) {
                    console.warn('We aborted create transaction.');
                } else {
                    console.log(titleId + ' for emoji ' + emojiId + ' incremented +1!');
                }
                console.log(titleId + " data: ", snapshot.val());
            });
        } else {
            $("#sameReviewModal").modal('show');
            console.warn("User attempted to leave the same review more than once. Request is denied. ")
        }
    });

    // when it's all said and done, update the counts
    updateAllReviewCountsOnScreen();
}

function updateAllReviewCountsOnScreen() {
    console.log("Updating review counts on screen.");
}