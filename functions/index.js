const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.api = functions.https.onRequest((request, response) => {
    functions.logger.info("api endpoint requested", { structuredData: true });
    switch (request.method) {
        case 'GET':
            response.send("get all api endpoints connected to user")
            break;
        case 'POST':
            response.send("create a new api")
            break;
        case 'PATCH':
            response.send("update an api")
            break;
        case 'DELETE':
            response.send("delete an api")
            break;
        default:
            break;
    }
})

exports.api_user = functions.https.onRequest((req, res) => {
    functions.logger.info("api_users endpoint requested", { structuredData: true });
    switch (req.method) {
        case 'GET':
            res.send("get all api keys, secret")
            break;
        case 'POST':
            res.send("create a new api key, secret")
            break;
        case 'PATCH':
            res.send("create a new secret or key")
            break;
        case 'DELETE':
            res.send("delete an api key, seceret")
            break;
        default:
            break;
    }
})

exports.verify = functions.https.onRequest((req, res) => {
    functions.logger.info("verify endpoint requested", { structuredData: true });
    switch (req.method) {
        case 'GET':
            res.sendStatus(404)
            break;
        case 'POST':
            res.send("verify api key, and secret")
            break;
        case 'PATCH':
            res.sendStatus(404)
            break;
        case 'DELETE':
            res.sendStatus(404)
            break;
        default:
            break;
    }
})
