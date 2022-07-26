import { createMachine } from "xstate";
import { authActions } from "./actions";
import { authServices } from "./services";

export const authMachine =

    /** @xstate-layout N4IgpgJg5mDOIC5QEECuAXAFgOgMabFwGsAZAeygEsA7AYgjOrGxoDcyjm0s8Djyq1BGzK4AhukqMA2gAYAuolAAHMrEqTGSkAA9EAWgDMADgAs2WQFYAnNdnXTARmMA2MwCYANCACeiR47YbtaO7u4A7Ma2prKmli4Avgne3Dj4hKQUNLRgAE65ZLnYygA2EgBmhQC22Km8GQI0wtTs4prUcopIIKrq7dp6CPrxhhaR4eHWZo7WhuEu3n5DLuGBlrLGxqFbLu6WlkkpGDglZGIQNFD0jMwinLXH2Kfnl82tElIdCtq9Gp8DBkcbiCUxi1nm7kcpkMUMWiHcW2wNnC7jilnchms8XmhxAdWeF2oVzyBSKpQq1QePAJrxEbU+nR+aj+Wm6gwigVMUUmW3cLmsu0s4ThQ0csnCSPWmJcQsMljm9lx+IoAEk6AwmCwWhwuI9TlA1W9RB8ZN9ur9+myDPFLNgnKspi5HJiTI4RfoAu4kZtLJtds5kcYlXrVXQSYVimV0JVcjVlQahHSTV8uipmZbQINTMDIY5fTLjHNIbF3SZRjMXBsua5LKZJolkniQ1AYBA1dhYGB0AA5MAAdwAyoRcl2ANJgHzXTV3XXUiit9udnv9oe4Efocc+I3002pnrp-5WhD86wWGyyWIXmIYkUuTFBKIhSvGYsbYNzluQdvUMir9eb2gAGEACUAFFkAAFVAgB9UdQIATSZPpD0zRBs1tNw+Q2AN9jvEUQlPQw9lrOtZBcJ1wXfE55y-ah6mIP8xwnKdbm1e54wXOj0gY4cmK3JN2kZc0D1ZVCEBRW0NmwpxDBiDYFl8RB1mMbBNnmQxYhmQwVn2KinhotsuL4IhGI3ZjwzJKMYzjZtOPokzeLM-jtR3FMkJZagAQQEIVOcYJ9jLGI3UU8SVmwVZTC5FxIvcDZtL0-VONoEgAHkAHEUoAVQg9yM10RBotGdZYoVT0YpFAJTzFWRISiOVnARdwEooFKMBYrV2HY5tWvQbdkyEtNkNE-LxNscKnCfKwVnmawKrmbBZkFMj7G0vZmqgHqcnyCNyWjSl4x6vrBLNQaPK8gJ5WwUILyxUxUXid0plUzZYuhFZs0rcJ1tbTbUrSlVu1ylCRssZ1VJsWxwiFPYatMd0Pqu8UMXCLk5RdUw9LIcpyhKGgwHamcqRwLGcbxo6GRO-chs8o8jBlcKoQFMIbDFOGQrCQI7ChKxSNMEJMex3GmC20lIwpWMiewEmhbAcndyB4bBn0KGvVkOVoqdbn7EsfDjFkbAMVk6rwiI+Ug1xH8IDgbQ6m4zJBAVmmxP0cjT3WFEXrFcF9gqqEghWMJIlcFGZnNo45xeIlHa8j0hQW2TNmMCY3GilHHpcJEBVutXUSig5G3jNVo6Pfl9fiRxJlrFG9i2d0wnMNwYTIuwYWI-Pw+oz9DOwTAxFgUzNzSsAmFyCRIGLsS7ttSKhSsWGYQCEV4i9SJ7WMdZYg0pqC9s2iOy7XtB0czcJ5GsEkUizF4nFdEnVvawvRMNX5UbzEoe+vefwHidT8GcJxTPPPAIzgYSGBFIWW0WwJjglsBeM2H9u522-ksU6eUswaQsBiHYAoZQfTASFV0Bs7zkQiCHQwcoMY7w-JxX+iATC2hIlfT6t9gpLA0ipPk2lKxXg0nWdaPVaEIE2KeGUy9ZJ7DzHEd0noghV3BLsWI9ZKEd30l3ARwlqZeWIkif+JsayTGzCiOuNgkRijCOKAOfIvpUOJoLPGgigTzHCnMB+D9CxRHItImqXp3ACliHWaEWw7pUUEcrJxz8NYBDkliLxWIDZYlsHrdEThKFJCAA */
    createMachine({
        context: { user: undefined, auth: undefined, error: undefined },
        id: "Auth",
        initial: "checkLogin",
        states: {
            checkLogin: {
                invoke: {
                    src: "checkLogin",
                    onDone: [
                        {
                            actions: "setAuth",
                            target: "loading",
                        },
                    ],
                    onError: [
                        {
                            cond: "online",
                            target: "loggedOut",
                        },
                        {
                            target: "offline",
                        },
                    ],
                },
            },
            loading: {
                invoke: {
                    src: "loader",
                    onDone: [
                        {
                            actions: "setUser",
                            target: "loggedIn",
                        },
                    ],
                    onError: [
                        {
                            actions: ["setError", "clearAuth"],
                            cond: "online",
                            target: "loggedOut",
                        },
                        {
                            target: "offline",
                        },
                    ],
                },
            },
            logIn: {
                invoke: {
                    src: "loginUser",
                    onDone: [
                        {
                            actions: "clearError",
                            target: "checkLogin",
                        },
                    ],
                    onError: [
                        {
                            actions: "setError",
                            cond: "online",
                            target: "loggedOut",
                        },
                        {
                            target: "offline",
                        },
                    ],
                },
            },
            loggedIn: {
                initial: "checkSecretKey",
                states: {
                    hasSecretKeyGenerated: {
                        type: "final",
                    },
                    setNewSecretKey: {
                        invoke: {
                            src: "generateNewSecret",
                            onDone: [
                                {
                                    target: "hasSecretKeyGenerated",
                                    actions: 'setKey'
                                },
                            ],
                        },
                    },
                    noSecretKey: {
                        on: {
                            CREATE_KEY: {
                                target: "setNewSecretKey",
                            },
                        },
                    },
                    checkSecretKey: {
                        invoke: {
                            src: "checkSecret",
                            onDone: [
                                {
                                    target: "hasSecretKeyGenerated",
                                },
                            ],
                            onError: [
                                {
                                    cond: "online",
                                    target: "noSecretKey",
                                },
                                {
                                    target: "#Auth.offline",
                                },
                            ],
                        },
                    },
                },
                on: {
                    LOGOUT: {
                        target: "logOut",
                    },
                },
            },
            logOut: {
                invoke: {
                    src: "logoutUser",
                    onDone: [
                        {
                            target: "checkLogin",
                        },
                    ],
                    onError: [
                        {
                            cond: "online",
                            target: "loggedIn",
                        },
                        {
                            target: "offline",
                        },
                    ],
                },
            },
            loggedOut: {
                on: {
                    LOGIN: {
                        target: "logIn",
                    },
                },
            },
            offline: {
                invoke: {
                    src: "checkInternet",
                    onDone: [
                        {
                            target: "checkLogin",
                        },
                    ],
                    onError: [
                        {
                            actions: "setError",
                        },
                    ],
                },
            },
        },
    }, {
        actions: authActions,
        services: authServices,
        guards: {
            online: () => new Promise((resolve, reject) => navigator.onLine ? resolve('online') : reject('offline'))
        }
    });
