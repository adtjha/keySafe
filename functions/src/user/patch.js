const { FieldValue, getFirestore } = require('firebase-admin/firestore');
const { randomBytes, createHash } = require('crypto');
const has = require('has');
const functions = require("firebase-functions");
const db = getFirestore();

async function patch(data, res) {
    try {
        functions.logger.debug({ ...data }, typeof data, { structuredData: true });
        const req_keys = ['key', 'resetKey', 'resetSecret'];
        for (let key of req_keys) {
            if (!has(data, key)) {
                throw new Error(`${key} not found, cannot be empty`);
            }
        }
        const keyHash = createHash('md5').update(`${data['key']}`).digest('hex');
        const resp = await db.collection('users').doc(keyHash).get();

        let apiUser;
        if (!resp.exists) {
            throw new Error('API does not exsist.');
        } else {
            functions.logger.debug(resp.data(), { structuredData: true });
            apiUser = resp.data();
        }
        const batch = db.batch();
        const apiUserRef = db.collection('users').doc(keyHash);

        let secretKey, update = {};
        if (data['resetSecret']) {
            secretKey = randomBytes(99).toString('hex');
            update['secret'] = createHash('md5').update(`${secretKey}`).digest('hex');
            batch.update(apiUserRef, { 'lastSecretRegenerate': FieldValue.serverTimestamp() });
        }

        if (data['resetKey']) {
            let keyStartString = apiUser.split('_')[0];
            update['key'] = `${keyStartString}_${randomBytes(99 - keyStartString.length).toString('hex')}`;
            batch.update(apiUserRef, { 'lastKeyRegenerate': FieldValue.serverTimestamp() });
        }
        batch.update(apiUserRef, { ...update });
        await batch.commit();

    } catch (error) {
        functions.logger.error(error, { structuredData: true });
        res.sendStatus(500);
        return;
    }
}
exports.patch = patch;
