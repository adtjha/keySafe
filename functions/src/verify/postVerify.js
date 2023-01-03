const { getFirestore, Timestamp } = require('firebase-admin/firestore');
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

        const userRes = await db.collection('users').doc(keyHash).get();

        if (!userRes.exists) {
            throw new Error(`key does not match. ${data['key']} ${keyHash}`);
        }

        // apiRef = db.collection(resp.data().api);

        // const secretHash = createHash('md5').update(`${data['secret']}`).digest('hex');
        const result = timingSafeEqual(Buffer.from(data['secret']), Buffer.from(userRes.data().secret));
        let has_scope = false

        const apiRes = await db.collection('api').where('url', '==', data['url']).get()

        if (!apiRes.empty) {
            apiRes.docs(doc => {
                has_scope = doc.scopes.every(scope => userRes['allowed_scopes'].contains(scope))
            })
        } else {
            // no such api exsits with the given url.
            throw new Error('no such api exsits with the given url');
        }

        if (result && has_scope) {
            saveReqRes(req, res, { ...data, secret: data['secret'], lastCheckedAt: Timestamp.now(), isVerified: true });
            res.json({ ...data, secret: data['secret'], lastCheckedAt: Timestamp.now(), isVerified: true });
        } else if (!has_scope) {
            throw new Error('required scope not allowed');
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
