import { createMachine } from "xstate";
import { authActions } from "./actions";
import { authServices } from "./services";

export const authMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEECuAXAFgOgMabFwGsAZAeygEsA7AYgjOrGxoDcyjm0s8Djyq1BGzK4AhukqMA2gAYAuolAAHMrEqTGSkAA9EAdgBMADmzGAnLIBshgKz7zARgDMD4wBoQAT0RXnAFjNnYP1ZYLDnQ38AX2jPbhx8QlIKGlowACcMsgzsZQAbCQAzHIBbbATeZIEaYWp2cU1qOUUkEFV1Ju09BH1HUwtrOwcXN08fBEtsWRnZQzD9YzmbW1j4jBx8sjEIGih6RmYRTgqN7C2dvbqGiSlmhW0OjTvuxEdHOexXW1l32QdnI5bM5xgYlkFgrZHOZzFZQs4rGsQJULrtqPtMtlcgVimVTjxUVcRI07i1Hmpnlo2j0-oYvvofn8AUCQd5ELZ-HTjMFXP5bFC5jE4sizlsoABJOgMJgseocLiiiiS66iW4yB5tJ5dakGExmSwrEaucweNkIEx02ZzfmGaHmfyOJEopV0TE5PKFdAlDLlZ0SoTEtX3VoqCna0A0j7mbD6Ky2KzWNyGKymiY8iHOeMBcyGJyxp2KqAwCCS7CwQgZMDoADSYC8ZarADkwAB3ADKFarta8BxlxwVBIoxdL5dwlZrdYb6Gb7c7E68KpJ6pD7TDLx15uc4PMwNk-jChkMrisVlBCCs-lMsm5AX8xrhfILg6LkBHc+72GoZA7Y67ddoADCABKACiyAACogQA+tWIEAJrkp064Rm8O62Ngjh9MYjj7n4sZ+GeJ76Ngtg3gExjcu8xiIsKfrDtQDa-vOVTED+47dr2RxyicdGvgxo7sZOSSse+daLkGZKamuVIoQgjgJs4JGAv0BrHgRZpQsR16QpExjJjuNHrM+9GMYJ9bCUQbF-j2brYp63q+oWJkCdZLGWaJC6Bk0kmhkhMm6G8ClKVRqn4ayEwJlYJE3ny8YPs45hPpsQ58dgYjKJQAAiEhiG5yAZdl6BiJxsrsDxTmpelWU5XlBU5eJ3kar5lLUK8cmxoEtjmK4oT2KRfThW81jofo-gwlYJr2l1iW0RVJYMVVhW5RZ+XVUV6RZO6OJenivHzWldVFbVa1iA1pJNaufmtRutpRNgKx7osiz+BNp5mh8mHRcELhOEC9iGSKxmVYduUAOJVqtS0lf2+LJS++2LTV4PoJD9VeedK5ashAXmo4d0Pf4T3GC9sJnjmUWjTCo3E-8tr6El5wpQjIPYMjqPrbZHq4j6sOM-DpaI0dbMg2dy6IS1bVHvY0yAoCuY4Smg0IBYnU3iY9r6JreMM2KJmC7lmBiLA7PFTosBFegzBiEUlsZAAFD8sgAJS0HtAss4bxsg+L4Y40CeP3bh1gzCmFH+GefyBNpkR4+YmtwvTs1A8zJ0sBA+RgLQoMgeBUGZRByA+9jNIdSR3Wa7IfXGANEfvIplNxxYO4vasSdw-RtAkAA8qDXcAKrgUX-k9LmwIkTYnLVwylFngyxGkcEfIWBexj8jrFBdxg0PcQOcOb+govBkP12yVh+pDPYTjGqmbyZleasMjYq8puvUD7xtWJcztPN+vvh8+ZdCWG5ASE2mLYOwCcLCkUMGeYEUUog5gSheSwmEZpGXbpAd+3dQbikbMfNqfxoyxnjImE0yYb7mlXhmQmURibDAZmQIoRR8g0EztKLiZVd7YEYcw1h-8LpY2HogW00YgTzGUvyMI-hORnmcJ8K0+5H6VzsAwphLCmAfy2vZXaZweHqLAPwzG0kT44zkbaEisVqJ+ASjhcOGloxdQiDMcBSxryt2FF+CAcBtCVAsjUExgiTEj1CNgQwo0Ty-GwvYGRZobDzxvPYVwOFLCt3QYzS46J8EbjzKE-omsxomD5PaQiR4vg8kccCTCh5X6SiybJCwxEEFx1CGNGEZ4wmyBIrMHCURLzBDQYDDB+0XLMU9lZec4MmAZAkJAOpONkxhPugg2Ol4jyxkIuAr6IRSITRhK-ZyHkpwznGd2OZI8PidLxmNLcJ4ljEMIgiLZ9gbx42rvs1KIyPxfhOXWM5bxsKWgnvMf4w0+SERsNMG8J4Ah7gTI6NufMDlMQ-BZH5Exmq+xpLyUJALaZxjGtREpnTo5yJhLaFMAM3b8Q8n8uSmZOkmDxnijkJo3oTGkehbSijZCwihCohFutgapxWt7KSV0CE5nnnLDWscoQR0TJCxeOEmW-HeSnJarMIaioxcXYRt4MJ9HLlCJuSsPgTS2fJFMLhqLODVe7VOnsTa0tGIERl8wjD4tZfKii2AnAnh3JXUaeNDB2oWizSg6cwDOoiWXb40JnrXPlSaJ5YT+RRhDQKpm9qlrOvpTiplHqWWErNHpOkC8TBbhsXIxOaTBXzVzcmfN7rkxFrZYgVwikuUJicAebqQpa0bwwLSwExMzCXmovael-RbBngop0gU-xpFhO6thNV+9c04Sbcyglba5IJmwPuWY4CjwfGeao3hTBh2ckUvMDk1Fq52GKWaAAtDhTpVhoRhIZMEK18L0HOp3BhcBYR3iSNvDAl9t17qfovJyWM15E6xCAA */
  createMachine({
    context: {
      user: undefined,
      auth: undefined,
      error: undefined,
      api: undefined,
      fetchId: undefined,
    },
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
        type: "parallel",
        states: {
          secretKey: {
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
                      actions: "setKey",
                      target: "hasSecretKeyGenerated",
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
          },
          apiData: {
            initial: "idle",
            states: {
              checkApiData: {
                invoke: {
                  src: "hasData",
                  onDone: [
                    {
                      target: "hasApiData",
                    },
                  ],
                  onError: [
                    {
                      actions: "saveFetchId",
                      cond: "online",
                      target: "GetApiData",
                    },
                    {
                      target: "#Auth.offline",
                    },
                  ],
                },
              },
              GetApiData: {
                invoke: {
                  src: "GetAPIsFromDB",
                  onDone: [
                    {
                      actions: "storeAPI",
                      target: "hasApiData",
                    },
                  ],
                  onError: [
                    {
                      cond: "online",
                      target: "GetApiData",
                      internal: false,
                    },
                    {
                      target: "#Auth.offline",
                    },
                  ],
                },
              },
              hasApiData: {
                after: {
                  "500": {
                    target: "idle",
                  },
                },
              },
              idle: {
                on: {
                  GET_DATA: {
                    target: "checkApiData",
                  },
                },
              },
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
