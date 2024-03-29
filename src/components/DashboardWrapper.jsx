import { useContext } from "react";
import { useActor } from "@xstate/react";
import { GlobalStateContext } from "../App";
import { generateSecret } from "../firebase";
import { Navbar } from "./Navbar";

export const DashboardWrapper = ({ children }) => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.authService);

  const generateSecretHandler = () => {
    generateSecret({ hello: "world" })
      .then((e) =>
        send({
          type: "CREATE_KEY",
          data: e.data.secret,
        })
      )
      .catch((e) => console.error(e));
  };

  return (
    <div className='h-full bg-background overflow-x-hidden flex flex-col items-stretch justify-evenly space-y-2'>
      {state.context.user.lastSecretGenerated === null && (
        <div className=''>
          <div className='absolute z-30 inset-0 w-full lg:w-1/2 h-fit m-auto bg-white py-4 px-8 rounded-md flex flex-col items-center space-y-4'>
            <div className='text-2xl font-bold'>Generate Your Secret Now!</div>
            <div className='text-left text-sm'>
              Once generated, copy it and keep it somewhere safe. You won't be
              able to see/copy this secret key, as for security purpose we don't
              store your secret key.
            </div>
            <div className='w-auto flex-grow flex flex-col items-start p-4 border-2 border-gray-200 hover:bg-gray-200 rounded-md cursor-copy'>
              <h3 className='break-all text-left'>
                {state.context.user.secret}
              </h3>
            </div>
            <div className='text-left text-sm'>
              If, for some reason, you misplace the key, you can regenerate it
              anytime (secret key regeneration is limited to 15 keys per month).
            </div>
            <button
              onClick={generateSecretHandler}
              className='bg-stone-500 text-white py-2 px-4 rounded-md border-2 border-transparent hover:border-stone-900'>
              Generate New Secret
            </button>
          </div>
          <div className='z-20 w-full h-full bg-black/60 blur-sm absolute inset-0 m-auto'></div>
        </div>
      )}
      <Navbar />
      <div className='relative m-auto w-full h-full bg-white py-4 px-16 mb-16 flex flex-col items-center justify-start space-y-16 text-primary-text'>
        {children}
      </div>
    </div>
  );
};
