### How Data is Structured in BCAI

This project contains a `studioBCAI/` directory that contains all the schemas and cofiguration for questions that will be featured on the app. To change any of the fields for a question card, go to `studioBCAI/schemas/card`. This studio also contains definitions for a control panel that allows the admin to choose which deck is active and whether or not it should be currently published to the app.

All changes in Sanity are listened to by a Cloud Function in Firebase called `sanityWebhookHandler`. This can be found in the functions tab of the Firebase console. All of the data in the Firestore therefore mirrors all of the data inputted in Sanity. This is what the app itself is reading when it needs to get current questions.

All user donations are pushed to the Realtime Database of the Firebase project. I did this because the Realtime Databse is effectively a big JSON object and is easily exported as one. This should make dealing with the data easier for whatever you end up wanting to do with it.

## Important to note on how to parse data stored in the Realtime Database:

Each of the ids you will see on the top level of the Realtime Database refer to a question in the Firestore. For example, you might see an id of the form `4ce2d66769fc`. All of the children of `4ce2d66769fc` will be individual donations from anonymous users. To find which question `4ce2d66769fc` refers to, simply go into the Firestore and find which card has that key. This card will have the question that all of the donations were in response to.
