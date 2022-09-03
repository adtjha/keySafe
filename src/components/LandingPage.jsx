import { useContext } from "react";
import { GlobalStateContext } from "../App";
import importPage from "../images/Import_API_page.png";
import apiDetails from "../images/API_Details_Page.png";
import keySafeFlow from "../images/keySafe_Flow.png";

export const LandingPage = () => {
  const globalServices = useContext(GlobalStateContext);

  return (
    <div className='w-full mb-8 bg-background text-primary-text grid grid-cols-1 items-center justify-center gap-64'>
      <div className='snap-start w-full h-screen flex flex-col items-center justify-center gap-6'>
        <h1 className='w-fit text-8xl font-bold'>
          <span className='block'>Secure your api</span>
          <span className='block'>without any hassle.</span>
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
      <div className='w-full h-full flex flex-col items-center justify-start pt-24 gap-12'>
        <h1 className='w-fit text-8xl font-bold'>
          <span className='block'>create api collections,</span>
          <span className='block'>or import from yaml file.</span>
        </h1>
        <img
          src={importPage}
          alt='Screenshot of import page'
          className='max-w-[90%] shadow-lg'
        />
      </div>
      <div className='w-full h-full flex flex-col items-center justify-start pt-24 gap-12'>
        <h1 className='w-fit text-8xl font-bold'>
          <span className='block'>maintain keys and secret</span>
          <span className='block'>for each user.</span>
        </h1>
        <img
          src={apiDetails}
          alt='Screenshot of import page'
          className='max-w-[90%] shadow-lg'
        />
      </div>
      <div className='w-full h-full flex flex-col items-center justify-start pt-24 gap-12'>
        <h1 className='w-fit text-8xl font-bold'>
          <span className='block'>random person tries to</span>
          <span className='block'>access your api</span>
        </h1>
        <img
          src={keySafeFlow}
          alt='Screenshot of import page'
          className='max-w-[60%]'
        />
      </div>
      <div className='w-full h-full flex flex-col items-center justify-start pt-24 gap-12'>
        <h1 className='w-fit text-8xl font-bold'>
          <span className='block'>Pricing</span>
        </h1>
        <h1 className='w-fit text-8xl bg-primary-light px-12 py-6 rounded-2xl font-bold'>
          Free For Now
        </h1>
        <h1 className='w-fit text-4xl font-bold text-primary-text-60'>
          Chargeable in Future
        </h1>
      </div>
      <div className='w-full h-screen flex flex-col items-center justify-center gap-6'>
        <button className='bg-primary-light mt-4 px-8 py-4 rounded-2xl text-lg font-medium hover:underline'>
          Try for a week now.
        </button>
      </div>
    </div>
  );
};
