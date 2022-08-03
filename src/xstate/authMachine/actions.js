import { toast } from "react-toastify";
import { assign } from "xstate";

export const authActions = {
    setUser: assign({ user: (_, event) => event.data }),
    setError: assign({ error: (_, event) => event.data }),
    clearError: assign({ error: null }),
    setAuth: assign({ auth: (_, event) => event.data }),
    clearAuth: assign({ user: null, auth: null }),
    setKey: assign({
        user: (context, event) => {
            return { ...context.user, secret: event.data }
        }
    }),
    storeAPI: assign({ api: (_, event) => event.data, fetchId: null }),
    notifySuccess: (ctx) => toast("Data has been fetched."),
    saveFetchId: assign({ fetchId: (_, event) => event.data })
}
