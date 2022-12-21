import { useActor } from "@xstate/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from "../../App";
import { DashboardWrapper } from "../../components/DashboardWrapper";

export const Profile = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state] = useActor(globalServices.authService);

  let navigate = useNavigate();

  return (
    <DashboardWrapper>
      <div className='px-8 w-full flex flex-col items-center justify-evenly space-y-4'>
        <div className='w-full relative flex flex-row items-center justify-center'>
          <button
            onClick={() => navigate(-1)}
            className='absolute left-0 hover:bg-primary-light-30 rounded-full p-2 w-min'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M11 17l-5-5m0 0l5-5m-5 5h12'
              />
            </svg>
          </button>
          <div className='w-full text-4xl font-bold'>Profile</div>
        </div>
        <div className=' w-full flex flex-wrap items-start justify-evenly gap-4'>
          {Object.entries(state.context.user).map(([key, value]) => {
            console.log(key, value);
            if (
              [
                "createdAt",
                "lastSecretGenerated",
                "lastSecretGenerated",
              ].includes(key)
            ) {
              value = new Date(value["seconds"] * 1000).toUTCString();
            } else if (!value) {
              value = "-";
            }
            return (
              <div
                key={key}
                className='group relative w-auto flex-grow flex flex-col items-start p-4 font-mono text-primary-text bg-primary-light-30 rounded-md cursor-pointer'>
                <h1 className='text-primary-text-60 tracking-wider text-xs uppercase font-sans'>
                  {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </h1>
                <h3 className='break-all text-primary-text group-hover:font-bold text-left group-hover:underline'>
                  {value}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardWrapper>
  );
};
