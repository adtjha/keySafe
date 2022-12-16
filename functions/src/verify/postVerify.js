const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { createHash, timingSafeEqual } = require('crypto');
const has = require('has');
const functions = require("firebase-functions");
const { saveReqRes } = require('../saveReqRes');
const db = getFirestore();



async function postVerify(data, req, res) {
    try {
        functions.logger.debug(data, { structuredData: true });
        const req_keys = ['key', 'secret', 'url'];
        for (let key of req_keys) {
            if (!has(data, key)) {
                throw new Error(`${key} not found, cannot be empty`);
            }
        }
        const keyHash = createHash('md5').update(`${data['key']}`).digest('hex');

        const resp = await db.collection('users').doc(keyHash).get();

        if (!resp.exists) {
            throw new Error(`key does not match. ${data['key']} ${keyHash}`);
        }

        // apiRef = db.collection(resp.data().api);

        // const secretHash = createHash('md5').update(`${data['secret']}`).digest('hex');
        const result = timingSafeEqual(Buffer.from(createHash('md5').update(`${data['secret']}`).digest('hex')), Buffer.from(resp.data().secret));

        if (result) {
            saveReqRes(req, res, { ...data, secret: data['secret'], lastCheckedAt: Timestamp.now(), isVerified: true });
            res.json({ ...data, secret: data['secret'], lastCheckedAt: Timestamp.now(), isVerified: true });
        } else {
            throw new Error('secret does not match.');
        }
    } catch (error) {
        functions.logger.error(error, { structuredData: true });
        // const batch = db.batch();
        // switch (error.message) {
        //     case 'url not found, cannot be empty':
        //         // no key present
        //         batch.set(customerRef, { 'failedAttempts': FieldValue.increment(1) })
        //         break;
        //     case 'key not found, cannot be empty':
        //         // no key present
        //         batch.set(apiRef,)
        //         break;
        //     case 'key does not match':
        //         // key present, but does not match
        //         batch.set(userRef, { ''})
        //         break;
        //     case 'secret not found, cannot be empty':
        //         batch.set(userRef,)
        //         break;
        //     case 'secret does not match':

        //         break;
        //     default:
        //         break;
        // }
        res.status(404).send({ error: error.message });
        return;
    }
}
exports.postVerify = postVerify;
