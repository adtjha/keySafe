import { useActor } from "@xstate/react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalStateContext } from "../App";

export const Navbar = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.authService);

  return (
    <div className='p-2 w-full flex flex-row items-center justify-center content-center space-x-8 bg-secondary-dark text-secondary-text'>
      <div className='w-fit px-4 flex-grow flex flex-row items-center justify-start space-x-8'>
        <Link
          to='/'
          className='text-base font-bold font-mono flex flex-row items-center justify-evenly hover:underline px-2 hover:bg-primary-light hover:text-primary-text rounded-lg'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
            viewBox='0 0 20 20'
            fill='currentColor'>
            <path d='M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z' />
          </svg>
          <span className='p-1'>Dashboard</span>
        </Link>
        <button className='group relative px-2 text-base font-bold font-mono flex flex-row items-center justify-evenly hover:underline hover:bg-primary-light hover:text-primary-text rounded-lg'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
            viewBox='0 0 20 20'
            fill='currentColor'>
            <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z' />
          </svg>
          <span className='p-1'>Create</span>
          <div className='before:-top-2 before:block before:h-2 before:w-full before:absolute absolute top-10 left-0 z-50 w-max p-2 rounded-b-md hidden group-hover:flex flex-col items-start justify-center gap-2 bg-secondary-dark text-primary-text-30'>
            <Link
              to='/api/new'
              className='min-w-fit text-base font-bold font-mono p-2 flex flex-row items-center justify-evenly gap-1 hover:bg-primary-light hover:text-primary-text rounded-lg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-4 h-4'>
                <path
                  fillRule='evenodd'
                  d='M6.28 5.22a.75.75 0 010 1.06L2.56 10l3.72 3.72a.75.75 0 01-1.06 1.06L.97 10.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0zm7.44 0a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 010-1.06zM11.377 2.011a.75.75 0 01.612.867l-2.5 14.5a.75.75 0 01-1.478-.255l2.5-14.5a.75.75 0 01.866-.612z'
                  clipRule='evenodd'
                />
              </svg>

              <span className=' hover:underline'>new api</span>
            </Link>
            <Link
              to='/user/new'
              className='min-w-fit text-base font-bold font-mono p-2 flex flex-row items-center justify-evenly gap-1 hover:bg-primary-light hover:text-primary-text rounded-lg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-4 h-4'>
                <path d='M11 5a3 3 0 11-6 0 3 3 0 016 0zM2.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 018 18a9.953 9.953 0 01-5.385-1.572zM16.25 5.75a.75.75 0 00-1.5 0v2h-2a.75.75 0 000 1.5h2v2a.75.75 0 001.5 0v-2h2a.75.75 0 000-1.5h-2v-2z' />
              </svg>

              <span className=' hover:underline'>new user</span>
            </Link>
          </div>
        </button>
        <Link
          to='/profile'
          className='px-2 rounded-lg text-base font-bold font-mono flex flex-row items-center justify-evenly hover:underline hover:bg-primary-light hover:text-primary-text'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
            viewBox='0 0 20 20'
            fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
              clipRule='evenodd'
            />
          </svg>
          <span className='p-1'>Profile</span>
        </Link>
      </div>
      <button
        onClick={() => send("LOGOUT")}
        className='px-2 rounded-lg text-base font-bold font-mono flex flex-row items-center justify-evenly hover:underline hover:bg-primary-light hover:text-primary-text'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4'
          viewBox='0 0 20 20'
          fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
            clipRule='evenodd'
          />
        </svg>
        <span className='p-1'>Logout</span>
      </button>
    </div>
  );
};
