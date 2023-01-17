import React, { useContext } from "react";
import { GlobalStateContext } from "../../App";
// import apiDetails from "../../images/API_Details_Page.png";
// import keySafeFlow from "../../images/keySafe_Flow.png";
import { Pricing } from "./Pricing";
import { Features } from "./Features";

export const LandingPage = () => {
  const globalServices = useContext(GlobalStateContext);

  return (
    <div style={{ letterSpacing: "-0.025em" }} className='w-full mb-8 bg-background text-primary-text grid grid-cols-1 items-center justify-center divide-y divide-primary-text/10'>
      <div style={{ textShadow: "0px 0px 4px #0000004d" }} className='snap-start w-full h-screen flex flex-col items-center justify-center gap-6'>
        <h1 className='w-fit text-8xl tracking-tight font-bold'>
          <span className='block'>API Authentication</span>
          <span className='block'> Made Simple.</span>
        </h1>
        <button onClick={() => globalServices.authService.send("LOGIN")} className='absolute top-8 right-8 bg-[#FAFDF7] px-8 py-3 rounded-2xl text-lg font-bold hover:underline'>
          Login
        </button>
        <div class='transition-all duration-150 h-fit w-fit backdrop-blur-sm hover:bg-white outline-4 outline-primary-dark/0 hover:outline-primary-light outline hover:outline-offset-4 mt-4 rounded-lg'>
          <button class='bg-primary-light font-bold px-8 py-4 rounded-lg text-lg'>Signup now</button>
        </div>
      </div>
      <Features />
      <Pricing />
      <div className='w-full h-screen flex flex-col items-center justify-center gap-6'>
        <button className='bg-primary-light mt-4 px-8 py-4 rounded-2xl text-lg font-medium hover:underline'>Try for a week now.</button>
      </div>
    </div>
  );
};

/**
 *

basis-1
p-4 px-6
min-w-max
text-sm
font-bold
text-center
text-[#09073a]
bg-[#f2f4ff]/95


backdrop-blur-sm

hover:bg-white
hover:bg-opacity-100

outline-[#09073a]/50
hover:outline-white
outline
hover:outline-offset-4
active:outline-offset-2

active:bg-opacity-90


transition-all
md:text-base
rounded-sm

*/
