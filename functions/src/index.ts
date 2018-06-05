
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.createUser = functions.firestore
    .document('photostream/{photoId}')
    .onCreate((snap, context) => {

        return admin.messaging().send({
            notification: {
                title: 'There\'s a new photostream image!',
                body: 'Go and check it out in the app.'
            },
            condition: "'photostream' in topics"
        });
    });