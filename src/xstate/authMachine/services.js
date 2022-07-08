import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, loginWithGoogle } from "../../firebase";

const userMapper = claims => ({
    id: claims.user_id,
    displayName: claims.name,
    email: claims.email,
    phone: claims.phone,
    photoURL: claims.photoURL
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
                        .then(resolve) : reject('No User');
            }, 100);
        });
    },
    loginUser: (context, event) => loginWithGoogle(),
    logoutUser: (context, event) => new Promise((resolve, reject) => signOut(auth).then(resolve).catch(reject))
}
