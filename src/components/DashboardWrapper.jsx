import { useContext } from "react";
import { useActor } from "@xstate/react";
import { GlobalStateContext } from "../App";

export const DashboardWrapper = ({ children }) => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.authService);

  return (
    <div className='m-auto w-2/3 h-full bg-stone-50 p-4 flex flex-col items-center justify-start space-y-4 text-gray-600'>
      <div className='relative w-full flex flex-row items-center justify-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-8 w-8 absolute left-2'
          viewBox='0 0 20 20'
          fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
            clipRule='evenodd'
          />
        </svg>
        <div className='text-2xl font-bold'>Dashboard</div>
        <button
          onClick={() => send("LOGOUT")}
          className='absolute right-2 flex flex-row items-center justify-evenly gap-2 border border-transparent hover:border-gray-200 p-2 rounded-md'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
              clipRule='evenodd'
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>
      {children}
    </div>
  );
};
