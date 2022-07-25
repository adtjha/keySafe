import { useActor } from "@xstate/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { GlobalStateContext } from "../App";
import { ApiDetails } from "./ApiDetails";

export const Dashboard = () => {
  const apis = [1, 2, 3];
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.authService);

  return (
    <React.Fragment>
      <div className='text-2xl font-bold'>
        {state.context.user.displayName} API's
      </div>
      <div className='w-fit rounded-md space-y-4'>
        <Link
          to='/api/new'
          className='bg-white py-2 px-4 rounded-lg border border-transparent border-gray-400'>
          Create new API
        </Link>
      </div>
      <div>
        <ul className='w-fit p-2 rounded-md space-y-4'>
          {apis.map((a, i) => (
            <li
              key={i}
              className='hover:bg-white p-4 rounded-lg border border-transparent hover:border-gray-400'>
              <Link
                to='/api'
                className='flex flex-col items-start justify-start'>
                {" "}
                <span className='hover:underline text-xl font-medium'>
                  String Concatenator
                </span>{" "}
                <span className='p-2 mt-2 bg-stone-200 text-blue-900 rounded-md'>
                  https://somerandomserver.com/youfunction/stringConcatenator
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};
