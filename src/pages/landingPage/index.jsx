import React, { useContext } from "react";
import { GlobalStateContext } from "../../App";
import apiDetails from "../../images/API_Details_Page.png";
import keySafeFlow from "../../images/keySafe_Flow.png";
import { Pricing } from "./Pricing";
import { Features } from "./Features";

export const LandingPage = () => {
  const globalServices = useContext(GlobalStateContext);

  return (
    <div
      style={{ letterSpacing: "-0.025em" }}
      className='w-full mb-8 bg-background text-primary-text grid grid-cols-1 items-center justify-center divide-y divide-primary-text/10'>
      <div
        style={{ textShadow: "0px 0px 4px #0000004d" }}
        className='snap-start w-full h-screen flex flex-col items-center justify-center gap-6'>
        <h1 className='w-fit text-8xl tracking-tight font-bold'>
          <span className='block'>API Authentication</span>
          <span className='block'> Made Simple.</span>
        </h1>
        <button
          onClick={() => globalServices.authService.send("LOGIN")}
          className='absolute top-8 right-8 bg-[#FAFDF7] px-8 py-3 rounded-2xl text-lg font-medium hover:underline'>
          Login
        </button>
        <button className='bg-primary-light mt-4 px-8 py-4 rounded-2xl text-lg font-medium hover:underline'>
          Signup
        </button>
      </div>
      <Features />
      <div className='w-full h-screen flex flex-col items-center justify-start px-40 py-32 gap-12'>
        <h1 className='w-fit text-6xl font-bold tracking-[-3px]'>
          <span className='block'>maintain keys and secret</span>
          <span className='block'>for each user.</span>
        </h1>
        <img
          src={apiDetails}
          alt='Screenshot of import page'
          className='max-w-[90%] shadow-lg'
        />
      </div>
      <div className='w-full h-screen flex flex-col items-center justify-start px-40 py-32 gap-12'>
        <h1 className='w-fit text-6xl font-bold tracking-[-3px]'>
          <span className='block'>random person tries to</span>
          <span className='block'>access your api</span>
        </h1>
        <img
          src={keySafeFlow}
          alt='Screenshot of import page'
          className='max-w-[60%]'
        />
      </div>
      <Pricing />
      <div className='w-full h-screen flex flex-col items-center justify-center gap-6'>
        <button className='bg-primary-light mt-4 px-8 py-4 rounded-2xl text-lg font-medium hover:underline'>
          Try for a week now.
        </button>
      </div>
    </div>
  );
};
