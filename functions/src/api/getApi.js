const { getFirestore } = require("firebase-admin/firestore");
const functions = require("firebase-functions");
const db = getFirestore();



async function getApi(keyData, res) {
    /**
     * api users failing frequently
     *      key
     *      secret
     *      key & secret both
     */
    try {
        functions.logger.info(`api : get all api endpoints connected to user`);
        const userRef = db.doc(`users/${keyData.id}`);
        const response = await db.collection('api').where('user', '==', userRef).get();
        if (response.empty) {
            res.status(404).send({
                userRef,
                message: 'No api\'s connected to this user'
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
exports.getApi = getApi;
