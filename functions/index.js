const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue, Timestamp } = require('firebase-admin/firestore');
const { randomBytes, createHash, timingSafeEqual } = require('crypto')

initializeApp();
const db = getFirestore()

const functions = require("firebase-functions");
const { postApi } = require("./src/api/postApi");
const { getApi } = require("./src/api/getApi");
const { postVerify } = require("./src/verify/postVerify");
const { deleteAPI } = require("./src/api/deleteAPI");
const { post } = require("./src/user/post");
const { get } = require("./src/user/get");
const { patch } = require("./src/user/patch");
const has = require('has');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const isValidKey = async (key, secret) => {
    let res, customersRef = db.collection('customers'), keyData = {}, secretHash = createHash('md5').update(secret).digest('hex');
    try {
        res = await customersRef.where("key", "==", `${key}`).get();
        if (res.empty) {
            functions.logger.error(res);
        } else {
            res.forEach(doc => {
                keyData = doc.data()
                console.log(keyData)
                if (!timingSafeEqual(Buffer.from(keyData['secretHash']), Buffer.from(secretHash))) {
                    throw new Error('Secret Does not match.')
                }
                keyData['id'] = doc.id
            });
            return { status: true, keyData }
        }
    } catch (error) {
        return { status: false, error }
    }
}

const getUserDetailsFromToken = async (token) => {
    try {
        const tokenHash = createHash('md5').update(token).digest('hex');
        const resp = await db.collection('tokens').doc(tokenHash).get();

        let keyData

        if (resp.exists) {
            keyData = resp.data()
        } else {
            throw new Error('Token not Found')
        }

        return { status: true, keyData }
    } catch (error) {
        return { status: false, scope: [], error }
    }
}

exports.api = functions.https.onRequest(async (req, res) => {
    const auth = req.headers.authorization
    const token = auth.split('Bearer ')[1]
    const { status, keyData } = await getUserDetailsFromToken(token)
    functions.logger.debug(status, keyData);
    if (!status) {
        res.status(403).send({
            status
        })
        return
    }
    const data = req.body.data
    switch (req.method) {
        case 'GET':
            await getApi(keyData, res);
            break;
        case 'POST':
            await postApi(data, keyData, res);
            break;
        case 'PATCH':
            res.send("update an api")
            break;
        case 'DELETE':
            await deleteAPI(data, keyData, res);
            break;
        default:
            break;
    }
})

exports.user = functions.https.onRequest(async (req, res) => {
    functions.logger.info("api_users endpoint requested", { structuredData: true });
    const auth = req.headers.authorization
    const token = auth.split('Bearer ')[1]
    const { status, keyData } = await getUserDetailsFromToken(token)
    functions.logger.debug(status, keyData);
    if (!status) {
        res.status(403).send({
            status
        })
        return
    }
    let data = req.body.data
    switch (req.method) {
        case 'GET':
            await get(keyData, data, res)
            break;
        case 'POST':
            await post(data, res)
            break;
        case 'PATCH':
            await patch(data, res)
            break;
        case 'DELETE':
            res.send("delete an api key, seceret")
            break;
        default:
            break;
    }
})

exports.verify = functions.https.onRequest(async (req, res) => {
    functions.logger.info("verify endpoint requested", { structuredData: true });
    const auth = req.headers.authorization
    const token = auth.split('Bearer ')[1]
    const { status, keyData } = await getUserDetailsFromToken(token)
    functions.logger.debug(status, keyData);
    if (!status) {
        res.status(403).send({
            status
        })
        return
    }
    let data = req.body.data
    switch (req.method) {
        case 'GET':
            res.sendStatus(404)
            break;
        case 'POST':
            await postVerify(data, req, res);
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

exports.newUserSignup = functions.auth.user().onCreate(async (user) => {
    // create a new customer instance in firestore db,
    // create key, and secret
    // create analytics things.
    try {
        functions.logger.debug(user)
        let data = {}

        let req_keys = ['uid', 'email', 'emailVerified', 'displayName', 'photoUrl', 'phoneNumber']

        for (let key of req_keys) {
            // console.log(key)
            if (has(user, key)) {
                data[key] = user[key]
            }
        }

        data['key'] = randomBytes(99).toString('hex')

        data['secret'] = 'xxxxxx_____GENERATE_____YOUR_____NEW_____SECRET_____NOW_____BY_____CLICKING_____GENERATE_____SECRET_____BUTTON._____xxxxxx'

        data['lastSecretGenerated'] = null

        const resp = await db.collection('customers').doc(user['uid']).set({ ...data })
        functions.logger.debug(resp)
    } catch (error) {
        functions.logger.error(error, { uid: user.uid, name: user.displayName, email: user.email })
    }
})


exports.generateSecret = functions.https.onCall(async (data, context) => {
    try {
        const secret = randomBytes(99).toString('hex')
        const secretHash = createHash('md5').update(secret).digest('hex')
        const secretKey = secret.split('').map((e, i) => i <= 190 ? 'x' : e).join('')
        functions.logger.debug(secret, secretKey, data, context.auth)
        await db.collection('customers').doc(context.auth.uid).update({
            'secret': secretKey,
            'secretHash': secretHash,
            'lastSecretGenerated': FieldValue.serverTimestamp()
        })

        return { secret }
    } catch (error) {
        throw new functions.https.HttpsError('internal', 'Something happened during secret creation.')
    }
})


exports.getToken = functions.https.onRequest(async (req, res) => {
    functions.logger.info("getToken endpoint requested", { structuredData: true });
    const auth = req.headers.authorization
    const [key, secret] = Buffer.from(auth.split('Basic ')[1], 'base64').toString('ascii').split(':')
    const { status, keyData } = await isValidKey(key, secret)
    functions.logger.debug(status, keyData);
    if (!status) {
        res.status(403).send({
            status
        })
        return
    }
    try {
        // delete all previous tokens, if not continue
        let tokensToDelete = []
        const data = await db.collection('tokens').where('customerId', '==', keyData.uid).get();

        if (!data.empty) {
            data.docs.forEach(doc => {
                // console.log(doc.id
                tokensToDelete.push(doc.id)
            })
        }

        functions.logger.info({ tokensToDelete })

        await Promise.allSettled(tokensToDelete.map(token => db.collection('tokens').doc(token).delete()))

        const token = randomBytes(16).toString('hex')
        const tokenHash = createHash('md5').update(token).digest('hex')

        let dataKey = ({ key, secretHash, uid }) => ({ key, secretHash, customerId: uid })

        const resp = await db.collection('tokens').doc(tokenHash).set({
            token,
            ...dataKey(keyData),
            createdAt: FieldValue.serverTimestamp(),
        })

        res.status(200).send({ access_token: token })
    } catch (error) {
        functions.logger.error(error)
        res.status(500).send({ error })
    }
})
