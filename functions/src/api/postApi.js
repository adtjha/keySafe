const { createHash } = require('crypto');
const has = require('has');
const functions = require("firebase-functions");
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

async function postApi(data, keyData, res) {
    // check if data recieved is ok
    try {
        // functions.logger.debug(data, { structuredData: true });
        const req_keys = ['analytics', 'keyStartString', 'name', 'security', 'url'];
        for (let key of req_keys) {
            if (!has(data, key)) {
                throw new Error(`${key} not found, cannot be empty`);
            }
        }
        data['user'] = db.doc(`customers/${keyData.id}`);
        const apiDocId = createHash('md5').update(`${keyData.key}_${data.url}`).digest('hex');
        // store in firestore db
        const response = await db.collection('api').doc(apiDocId).set(data);
        res.send(response);
    } catch (error) {
        res.sendStatus(500);
        functions.logger.error(error, { structuredData: true });
    }
}
exports.postApi = postApi;
