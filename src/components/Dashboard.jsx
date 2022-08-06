import { useActor, useMachine } from "@xstate/react";
// import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import { GlobalStateContext } from "../App";
// import { db } from "../firebase";
// import { ApiFetcherMachine } from "../xstate/FetcherMachine";

export const Dashboard = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.authService);

  // const [fetchState, fetchSend, fetchService] = useMachine(ApiFetcherMachine, {
  //   actions: {
  //     notifySuccess: (ctx) => toast("Data has been fetched."),
  //   },
  //   services: {
  //     fetchData: (context, e) => {
  //       console.log(context, e);
  //       return getDocs(
  //         query(
  //           collection(db, "api"),
  //           where("customerId", "==", context.error.id)
  //         )
  //       )
  //         .then((docSnap) => {
  //           return !docSnap.empty
  //             ? docSnap.docs.map((e) => e.data())
  //             : "Customer does not exsist.";
  //         })
  //         .catch((e) => console.error(e));
  //     },
  //     hasData: (context, event) =>
  //       new Promise((resolve, reject) => {
  //         if (context.data) {
  //           context.data.forEach((data) => {
  //             if (Object.keys(data) === event.id) {
  //               resolve(data[event.id]);
  //             }
  //           });
  //         }
  //         reject({ id: event.id });
  //       }),
  //   },
  // });

  useEffect(() => {
    send({ type: "GET_DATA", id: state.context.user.id });
  }, [state.context]);

  // useEffect(() => {
  //   const subscription = fetchService.subscribe((state, event) => {
  //     // simple state logging
  //     console.log(state.context, event);
  //   });

  //   return subscription.unsubscribe;
  // }, [fetchService]); // note: service should never change

  return (
    <React.Fragment>
      <div className='text-2xl font-bold'>
        {state.context.user.displayName} API's
      </div>
      {/* <div className='w-fit rounded-md space-y-4'>
        <Link
          to='api/new'
          className='bg-white hover:bg-stone-100 py-2 px-4 rounded-lg border border-transparent border-gray-400'>
          Create new API
        </Link>
      </div> */}
      <div className='w-full'>
        <ul className='w-full p-2 rounded-md flex flex-wrap items-center justify-between gap-4'>
          {state.value?.loggedIn?.apiData !== "idle" && <li>Loading...</li>}
          {state.value?.loggedIn?.apiData === "idle" &&
            !state.context.error &&
            state.context.api &&
            state.context.api.map((a, i) => (
              <li
                key={`${Object.values(a)[0].name}_${i}`}
                className='hover:bg-white p-4 rounded-lg border border-transparent hover:border-gray-400'>
                <Link
                  to={`api/${Object.keys(a)[0]}/${Object.values(a)[0].name}`}
                  className='flex flex-col items-start justify-start'>
                  {" "}
                  <span className='hover:underline text-xl font-medium'>
                    {Object.values(a)[0].name}
                  </span>{" "}
                  <span className='p-2 mt-2 bg-stone-200 text-blue-900 rounded-md'>
                    {Object.values(a)[0].url}
                  </span>
                </Link>
              </li>
            ))}
          {state.value?.loggedIn?.apiData === "idle" && state.context.error && (
            <li>{state.context.error}</li>
          )}
        </ul>
      </div>
    </React.Fragment>
  );
};
