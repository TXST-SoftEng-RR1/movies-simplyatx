
// Go here for a complete refernece specification for this implementation:
// https://firebase.google.com/docs/reference/js/firebase.database.Reference.html

/**
 * returns a JSON of all emojiIds and their respective counts
 * @param titeId
 */
function getAllEmojiCountsForTitle(titeId){
	// TODO: given a titleId, query the database and retrive the JSON object if it exists
	//  otherwise return: empty
}

/**
 * returns a numeric type representing the count for a given emojiId
 *
 * @param titleId
 * @param emojiId
 */
function getSingleEmojiCountForTitle(titleId, emojiId) {
	// TODO: query the DB and retrieve the number of reviews for a given emojiId
	//  if titleId is not in DB, return 0
}

/**
* https://firebase.google.com/docs/reference/js/firebase.database.Reference#transaction
* "transaction() is used to modify the existing value to a new value, ensuring there are no conflicts with other
* clients writing to the same location at the same time."
*
* @param titleId
* @param emojiId
*/
function updateSingleEmojiCountForTitle(titleId, emojiId) {
    // Try to create a record for a titleId (e.g., tt0241527), but only if not already there
    let titleRef = firebase.database().ref('Reviews/' + titleId);
    titleRef.transaction(function(currentData) {
        if (currentData === null) {
            return { e1: 0, e2: 0, e3: 0, e4: 0, e5: 0, e6: 0, e7: 0, e8: 0, e9: 0 };
        }
        else {
            console.log('Title' + titleId + ' already exists. Updating emojiId only.');
            return; // Abort the transaction.
        }
    }, function(error, committed, snapshot) {
        if (error) {
            console.error('Transaction failed abnormally!', error);
        } else if (!committed) {
            console.warn('We aborted create transaction. Title already exists.');
        } else {
            console.log(titleId + ' created with default 0 values for emojiIds.');
        }
    });

    // Increment title's emoji count by 1.
    var incrementEmojiCount = firebase.database().ref('Reviews/' + titleId + '/' + emojiId);
    incrementEmojiCount.transaction(function(currentCount) {
        // If Reviews/title/emoji has never been set, currentCount will be `null`.
        return currentCount + 1;
    }, function(error, committed, snapshot) {
        if (error) {
            console.error('Transaction failed abnormally!', error);
        } else if (!committed) {
            console.warn('We aborted create transaction.');
        } else {
            console.log(titleId + ' for emoji ' + emojiId + ' incremented +1!');
        }
        console.log(titleId + " data: ", snapshot.val());
    });
}