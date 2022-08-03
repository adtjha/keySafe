const { getFirestore } = require("firebase-admin/firestore");
const { createHash } = require('crypto');
const functions = require("firebase-functions");
const db = getFirestore();



async function getApiUser(keyData, data, res) {
    /**
     * api users failing frequently
     *      key
     *      secret
     *      key & secret both
     */
    try {
        functions.logger.info(`api : get all users connected to api endpoints`);
        const apiDocId = createHash('md5').update(`${keyData.key}_${data.url}`).digest('hex');
        const apiDocIdRef = db.collection('api').doc(apiDocId)
        const response = await db.collection('users').where('api', '==', apiDocIdRef).get();
        if (response.empty) {
            res.status(404).send({
                apiDocId,
                message: 'No user connected to this endpoint'
            });
        } else {
            let docResponse = [];
            response.docs.forEach(doc => {
                docResponse.push({
                    [doc.id]: doc.data()
                });
            });
            res.status(200).send({
                apis: docResponse,
            });
        }
    } catch (error) {
        functions.logger.error(error, { structuredData: true });
        res.status(500).send({ error });
    }
}
exports.getApiUser = getApiUser;
