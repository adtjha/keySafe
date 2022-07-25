const { FieldValue, getFirestore } = require('firebase-admin/firestore');
const { randomBytes, createHash } = require('crypto');
const has = require('has');
const functions = require("firebase-functions");
const db = getFirestore();

/**
 * need new user uid, if not present, generate a md5 hash
 * generate new (99 char length),
 *      key with prefix (if provided, else use keySafe_),
 *      secret,
 * date created at,
 * last verified on,
 * times verfied,
 *      in a minute,
 *      in a hour,
 *      in 24 hours,
 *      in a week,
 *      in a month,
 *      all time,
 * failed attempts,
 *      incorrect key,
 *      incorrect secret,
 *      no secret,
 * last secret regenerate,
 * secret regenerate count,
*/


async function postApiUser(data, res) {
    try {
        // functions.logger.debug({ ...data }, typeof data, { structuredData: true });
        const req_keys = ['url'];
        for (let key of req_keys) {
            if (!has(data, key)) {
                throw new Error(`${key} not found, cannot be empty`);
            }
        }
        if (!has(data, 'uid')) {
            data['uid'] = randomBytes(16).toString('hex');
        }
        let resApi = await db.collection('api').where('url', '==', data['url']).get();
        let api = undefined;
        let apiDocId = '';
        if (resApi.empty) {
            res.status(404).send('API does not exsist.');
        } else {
            resApi.docs.forEach(doc => {
                functions.logger.debug(doc.data(), { structuredData: true });
                api = doc.data();
                apiDocId = doc.id;
            });
        }

        if (api['keyStartString'] === '' || !has(api, 'keyStartString')) {
            api['keyStartString'] = 'keySafe';
        }

        data['key'] = `${api['keyStartString']}_${randomBytes(99 - api['keyStartString'].length).toString('hex')}`;

        data['api'] = db.doc(`api/${apiDocId}`);

        let secretKey = randomBytes(99).toString('hex');
        data['secret'] = createHash('md5').update(`${secretKey}`).digest('hex');
        // data['createdAt'] = Timestamp.now()
        data['createdAt'] = FieldValue.serverTimestamp();
        data['lastVerified'] = null;
        data['timesVerified'] = {
            'minute': 0,
            'hour': 0,
            'day': 0,
            'week': 0,
            'month': 0,
            'all': 0
        };
        data['lastSecretRegenerate'] = FieldValue.serverTimestamp();
        data['secretRegenerationCount'] = {
            'minute': 0,
            'hour': 0,
            'day': 0,
            'week': 0,
            'month': 0,
            'all': 0
        };
        data['lastKeyRegenerate'] = FieldValue.serverTimestamp();
        data['keyRegenerationCount'] = {
            'minute': 0,
            'hour': 0,
            'day': 0,
            'week': 0,
            'month': 0,
            'all': 0
        };

        const keyHash = createHash('md5').update(`${data['key']}`).digest('hex');

        const resp = await db.collection('users').doc(keyHash).set({ ...data });
        // resApi
        res.status(200).send({ ...data, secret: secretKey, db_response: resp });
    } catch (error) {
        functions.logger.error(error, { structuredData: true });
        res.sendStatus(500);
        return;
    }
}
exports.postApiUser = postApiUser;
