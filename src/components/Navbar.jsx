import { useActor } from "@xstate/react";
import { useContext } from "react";
import { GlobalStateContext } from "../App";

export const Navbar = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.authService);

  return (
    <div className='w-[360px] flex flex-col items-start justify-center content-center space-y-8 bg-stone-50'>
      <button className='w-full p-4 text-2xl font-bold font-mono bg-stone-100 text-stone-700 hover:text-stone-800 flex flex-col items-start justify-evenly'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-16 w-16'
          viewBox='0 0 20 20'
          fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
            clipRule='evenodd'
          />
        </svg>
        <span className='p-2 mt-1'>{state.context.user.displayName}</span>
      </button>
      <div className='px-4 flex-grow flex flex-col items-start justify-evenly'>
        <button className='text-4xl font-bold font-mono text-stone-500 hover:text-stone-800 flex flex-row items-center justify-evenly'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10'
            viewBox='0 0 20 20'
            fill='currentColor'>
            <path d='M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z' />
          </svg>
          <span className='p-2 mt-1'>Dashboard</span>
        </button>
        <button className='text-4xl font-bold font-mono text-stone-500 hover:text-stone-800 flex flex-row items-center justify-evenly'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10'
            viewBox='0 0 20 20'
            fill='currentColor'>
            <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z' />
          </svg>
          <span className='p-2 mt-1'>Create</span>
        </button>
        <button className='text-4xl font-bold font-mono text-stone-500 hover:text-stone-800 flex flex-row items-center justify-evenly'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10'
            viewBox='0 0 20 20'
            fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z'
              clipRule='evenodd'
            />
          </svg>
          <span className='p-2 mt-1'>Analytics</span>
        </button>
        <button className='text-4xl font-bold font-mono text-stone-500 hover:text-stone-800 flex flex-row items-center justify-evenly'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10'
            viewBox='0 0 20 20'
            fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
              clipRule='evenodd'
            />
          </svg>
          <span className='p-2 mt-1'>Settings</span>
        </button>
      </div>
      <button
        onClick={() => send("LOGOUT")}
        className='px-4 text-4xl font-bold font-mono text-stone-500 hover:text-stone-800 flex flex-row items-center justify-evenly'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-10 w-10'
          viewBox='0 0 20 20'
          fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
            clipRule='evenodd'
          />
        </svg>
        <span className='p-2 mt-1'>Logout</span>
      </button>
    </div>
  );
};
