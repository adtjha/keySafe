import { useActor } from "@xstate/react";
import { useContext } from "react";
import { GlobalStateContext } from "../App";
import { DashboardWrapper } from "./DashboardWrapper";

export const Profile = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.authService);

  const splitNames = (name) => name.findIndex();

  return (
    <DashboardWrapper>
      <div className='px-8 py-4 w-full flex flex-col items-start justify-evenly space-y-4'>
        <div className='text-4xl font-bold mb-6'>Profile</div>
        <div className=' w-full flex flex-col items-start justify-evenly space-y-4'>
          {Object.keys(state.context.user).map(
            (key, i) =>
              state.context.user[key] && (
                <div
                  key={`${i}`}
                  className='flex flex-col items-start justify-center'>
                  <div className='lowercase text-sm font-semibold'>
                    {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
                  </div>
                  <div className='text-lg font-mono break-all text-left'>
                    {key === "lastSecretGenerated"
                      ? new Date(
                          state.context.user[key].seconds * 1000
                        ).toUTCString()
                      : state.context.user[key]}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </DashboardWrapper>
  );
};
