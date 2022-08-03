const { createHash } = require('crypto');
const has = require('has');
const functions = require("firebase-functions");
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

async function postApi(data, keyData, res) {
    // check if data recieved is ok
    try {
        const req_keys = ['analytics', 'keyStartString', 'name', 'security', 'url'];
        for (let key of req_keys) {
            if (!has(data, key)) {
                throw new Error(`${key} not found, cannot be empty`);
            }
        }
        data['customerId'] = keyData.customerId
        data['lastSuccessfulAttempt'] = null
        data['lastFailedAttempt'] = null
        const apiDocId = createHash('md5').update(`${keyData.key}_${data.url}`).digest('hex');

        functions.logger.debug({ ...data }, { ...keyData });
        // store in firestore db
        const response = await db.collection('api').doc(apiDocId).set({ ...data });
        res.send(response);
    } catch (error) {
        res.sendStatus(500);
        functions.logger.error(error, { structuredData: true });
    }
}
exports.postApi = postApi;

// data['failedAttempts'] = {
    //     all: 0,
    //     day: 0,
    //     hour: 0,
        //     minute: 0,
        //     month: 0,
        //     week: 0
        // }

        // data['failedAttemptsReason'] = {
            //     'key&SecretNotMatches': 0,
        //     'key&SecretNotPresent': 0,
        //     'keyNotMatches': 0,
        //     'keyNotPresent': 0,
        //     'secretNotMatches': 0,
        //     'secretNotPresent': 0
        // }
        // data['successfulAttempts'] = {
            //     all: 0,
            //     day: 0,
        //     hour: 0,
        //     minute: 0,
        //     month: 0,
        //     week: 0
        // }
        // data['customerRef'] = db.doc(`customers/${keyData.id}`);
