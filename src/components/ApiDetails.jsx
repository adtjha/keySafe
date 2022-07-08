import React from "react";
import { Link } from "react-router-dom";
import { DashboardWrapper } from "./DashboardWrapper";

export const ApiDetails = () => {
  const new_secret =
    "80cb3793396a385efb0ca6b571ec9de5f0c64fbbf52aa4d1e9d14a356075efa08d739270fe74907ad52639076217a67bdd28c66201ab46e9219be82699100cb1e3418f9eace6bccd39844db8454ae57995c12352c21678dc1255dec3e4034ef5b2db84";
  const api = {
    key: "0b4cd815cc39ae678a7bcb1d894209f48af9621c82f221d15c38273fef8cfbe6ef564bb8f7a95b59c117e9afd8c11df6af7a5ea4264f2d729572e587726bbd792ea8579a1dd94147edab735de351e4058207e6eb73938905ac14a77d200cc1105794eb",
    secret:
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx399f3c",
    name: "String Concatenator",
    url: "https://somerandomserver.com/youfunction/stringConcatenator",
    timesCalled: "29",
    secretGenerationCount: 0,
    lastCall: Date.now(),
  };

  const names = {
    name: "Name",
    url: "URL",
    key: "API Key",
    secret: "API Secret",
    timesCalled: "API Call Count",
    secretGenerationCount: "API Secret Regeneration Count",
    lastCall: "Last Call",
  };

  return (
    <DashboardWrapper>
      <div className='relative w-full flex flex-row items-stretch justify-center'>
        <Link
          to='/api'
          className='absolute left-10 hover:bg-gray-200 rounded-full p-2'>
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
        </Link>
        <div className='text-2xl font-bold'>API : {api.name}</div>
      </div>
      <div className='w-11/12 overflow-hidden flex flex-wrap items-stretch justify-between gap-2'>
        {Object.keys(api).map((k) => (
          <div
            key={k}
            className='w-auto flex-grow flex flex-col items-start p-4 border-2 border-gray-200 hover:bg-gray-200 rounded-md cursor-copy'>
            <h1 className='text-gray-600 text-sm mb-1'>{names[k]}</h1>
            <h3 className='break-all text-left'>{api[k]}</h3>
          </div>
        ))}
      </div>
    </DashboardWrapper>
  );
};
