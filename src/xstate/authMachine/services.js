import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db, loginWithGoogle } from "../../firebase";
import { getDoc, doc, getDocs, query, collection, where } from 'firebase/firestore'

const userMapper = claims => ({
    id: claims.user_id,
    displayName: claims.name,
    email: claims.email,
    phone: claims.phone,
    photoURL: claims.photoURL,

});

export const authServices = {
    checkLogin: (context, event) => new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            if (user) {
                resolve(user)
            } else {
                reject('user not found')
            }
        }, (error) => reject(error));
    }),
    loader: (ctx, _) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                ctx.auth ?
                    ctx.auth
                        .getIdTokenResult()
                        .then(({ claims }) => userMapper(claims))
                        .then(async (claims) => {
                            const docSnap = await getDoc(doc(db, "customers", claims.id))
                            if (docSnap.exists()) {
                                let data = docSnap.data()
                                // console.log(data, docSnap, claims.id)
                                claims['key'] = data['key']
                                claims['secret'] = data['secret']
                                claims['lastSecretGenerated'] = data['lastSecretGenerated']
                                // console.log('claims', claims)
                            } else {
                                reject('Customer not stored on db.')
                            }
                            return claims
                        })
                        .then(resolve) : reject('No User');
            }, 100);
        });
    },
    loginUser: (context, event) => loginWithGoogle(),
    logoutUser: (context, event) => new Promise((resolve, reject) => signOut(auth).then(resolve).catch(reject)),
    checkSecret: (context, event) => new Promise((resolve, reject) => !context.user.lastSecretGenerated || context.user.secret.split('_').map(e => e !== '' && e).filter(e => e).includes('GENERATE') ? reject('secret not set') : resolve()),
    generateNewSecret: (context, event) => new Promise((resolve, reject) => event.data ? resolve(event.data) : reject('No Secret Key Preset')),
    checkInternet: (context, event) => new Promise((resolve, reject) => navigator.onLine ? resolve('online') : reject('offline')),
    GetAPIsFromDB: (context, e) => {
        console.log(context, e);
        return getDocs(
            query(
                collection(db, "api"),
                where("customerId", "==", context.fetchId)
            )
        )
            .then((docSnap) => {
                console.log(docSnap.docs.map(doc => ({ [doc.id]: doc.data() })))
                return !docSnap.empty
                    ? docSnap.docs.map((e) => ({ [e.id]: e.data() }))
                    : "Customer does not exsist.";
            })
            .catch((e) => console.error(e));
    },
    hasData: (context, event) =>
        new Promise((resolve, reject) => {
            if (context.api) {
                console.log('map => ', context.api)
                context.api.map((e, i) => Object.keys(e)[0]
                    === event.id && console.log(Object.keys(e)[0], event.id, e[event.id]) && resolve(event.id))
                // context.api.forEach((data) => {
                //     if (Object.keys(data) === event.id) {
                //         resolve(data[event.id]);
                //     }
                // });
            }
            console.log('getting rejected')
            reject(event.id);
        }),
}
