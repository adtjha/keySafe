const { createHash } = require('crypto');
const has = require('has');
const functions = require("firebase-functions");
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();



async function deleteAPI(data, keyData, res) {
    try {
        const req_keys = ['url'];
        for (let key of req_keys) {
            if (!has(data, key)) {
                throw new Error(`${key} not found, cannot be empty`);
            }
        }
        data['user'] = db.doc(`users/${keyData.id}`);
        const apiDocId = createHash('md5').update(`${keyData.key}_${data.url}`).digest('hex');
        const response = await db.collection('api').doc(apiDocId).delete();
        res.send(response);
    } catch (error) {
        functions.logger.error(error, { structuredData: true });
        res.sendStatus(500);
    }
}
exports.deleteAPI = deleteAPI;
