import { useInterpret } from "@xstate/react";
import { createContext, useEffect } from "react";
import { createMachine } from "xstate";
import { authActions } from "./actions";
import { authServices } from "./services";

export const authMachine = createMachine({
    id: 'Auth',
    initial: 'checkLogin',
    context: {
        user: undefined,
        auth: undefined,
        error: undefined
    },
    states: {
        checkLogin: {
            invoke: {
                src: 'checkLogin',
                onDone: {
                    target: 'loading',
                    actions: 'setAuth'
                },
                onError: {
                    target: 'loggedOut',
                }
            },
        },
        loading: {
            invoke: {
                src: 'loader',
                onDone: { target: 'loggedIn', actions: 'setUser' },
                onError: {
                    target: 'loggedOut',
                    actions: ['setError', 'clearAuth']
                }
            }
        },
        logIn: {
            invoke: {
                src: 'loginUser',
                onDone: {
                    target: 'checkLogin',
                    actions: 'clearError',
                },
                onError: {
                    target: 'loggedOut',
                    actions: 'setError'
                }
            }
        },
        loggedIn: {
            on: {
                LOGOUT: 'logOut'
            }
        },
        logOut: {
            invoke: {
                src: 'logoutUser',
                onDone: 'checkLogin',
                onError: 'loggedIn'
            },
        },
        loggedOut: {
            on: {
                LOGIN: 'logIn'
            }
        },
    }
}, {
    actions: authActions,
    services: authServices,
});
