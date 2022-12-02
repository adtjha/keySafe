import { useActor } from "@xstate/react";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalStateContext } from "../App";
import { SearchBar } from "./SearchBar";

export const Dashboard = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.authService);

  useEffect(() => {
    send({ type: "GET_DATA", id: state.context.user.id });
  }, [state.context, send]);

  return (
    <React.Fragment>
      <div className='text-4xl font-bold'>
        {state.context.user.displayName} API's
      </div>
      <div className='w-[45%]'>
        <SearchBar />
      </div>
      <div className='w-full'>
        <ul className='w-full p-2 rounded-md grid grid-cols-3 items-center justify-between gap-4'>
          {state.value?.loggedIn?.apiData !== "idle" && <li>Loading...</li>}
          {state.value?.loggedIn?.apiData === "idle" &&
            !state.context.error &&
            state.context.api &&
            state.context.api.map((a, i) => (
              <li
                key={`${Object.values(a)[0].name}_${i}`}
                className='group w-full bg-primary-light-30  border-2 border-transparent hover:border-primary-text p-4 rounded-lg'>
                <Link
                  to={`api/${Object.keys(a)[0]}/${Object.values(a)[0].name}`}
                  className='w-full flex flex-col items-start justify-start font-medium'>
                  {" "}
                  <span className='hover:underline text-xl font-bold'>
                    {Object.values(a)[0].name}
                  </span>{" "}
                  <span className='w-full py-2 group-hover:underline rounded-md text-start whitespace-nowrap overflow-hidden text-ellipsis'>
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
