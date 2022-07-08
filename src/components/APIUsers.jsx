import React from "react";
import { Link } from "react-router-dom";
import { DashboardWrapper } from "./DashboardWrapper";

export const ApiUsers = () => {
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

  const users = [
    {
      uid: "80cb3793396a385efb0ca6",
      dateCreatedAt: Date.now(),
      key: "0b4cd815cc39ae678a7bcb1d894209f48af9621c82f221d15c38273fef8cfbe6ef564bb8f7a95b59c117e9afd8c11df6af7a5ea4264f2d729572e587726bbd792ea8579a1dd94147edab735de351e4058207e6eb73938905ac14a77d200cc1105794eb",
      secret:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx399f3c",
    },
    {
      uid: "80cb3793396a385efb0ca6",
      dateCreatedAt: Date.now(),
      key: "0b4cd815cc39ae678a7bcb1d894209f48af9621c82f221d15c38273fef8cfbe6ef564bb8f7a95b59c117e9afd8c11df6af7a5ea4264f2d729572e587726bbd792ea8579a1dd94147edab735de351e4058207e6eb73938905ac14a77d200cc1105794eb",
      secret:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx399f3c",
    },
    {
      uid: "80cb3793396a385efb0ca6",
      dateCreatedAt: Date.now(),
      key: "0b4cd815cc39ae678a7bcb1d894209f48af9621c82f221d15c38273fef8cfbe6ef564bb8f7a95b59c117e9afd8c11df6af7a5ea4264f2d729572e587726bbd792ea8579a1dd94147edab735de351e4058207e6eb73938905ac14a77d200cc1105794eb",
      secret:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx399f3c",
    },
    {
      uid: "80cb3793396a385efb0ca6",
      dateCreatedAt: Date.now(),
      key: "0b4cd815cc39ae678a7bcb1d894209f48af9621c82f221d15c38273fef8cfbe6ef564bb8f7a95b59c117e9afd8c11df6af7a5ea4264f2d729572e587726bbd792ea8579a1dd94147edab735de351e4058207e6eb73938905ac14a77d200cc1105794eb",
      secret:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx399f3c",
    },
    {
      uid: "80cb3793396a385efb0ca6",
      dateCreatedAt: Date.now(),
      key: "0b4cd815cc39ae678a7bcb1d894209f48af9621c82f221d15c38273fef8cfbe6ef564bb8f7a95b59c117e9afd8c11df6af7a5ea4264f2d729572e587726bbd792ea8579a1dd94147edab735de351e4058207e6eb73938905ac14a77d200cc1105794eb",
      secret:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx399f3c",
    },
    {
      uid: "80cb3793396a385efb0ca6",
      dateCreatedAt: Date.now(),
      key: "0b4cd815cc39ae678a7bcb1d894209f48af9621c82f221d15c38273fef8cfbe6ef564bb8f7a95b59c117e9afd8c11df6af7a5ea4264f2d729572e587726bbd792ea8579a1dd94147edab735de351e4058207e6eb73938905ac14a77d200cc1105794eb",
      secret:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx399f3c",
    },
    {
      uid: "80cb3793396a385efb0ca6",
      dateCreatedAt: Date.now(),
      key: "0b4cd815cc39ae678a7bcb1d894209f48af9621c82f221d15c38273fef8cfbe6ef564bb8f7a95b59c117e9afd8c11df6af7a5ea4264f2d729572e587726bbd792ea8579a1dd94147edab735de351e4058207e6eb73938905ac14a77d200cc1105794eb",
      secret:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx399f3c",
    },
    {
      uid: "80cb3793396a385efb0ca6",
      dateCreatedAt: Date.now(),
      key: "0b4cd815cc39ae678a7bcb1d894209f48af9621c82f221d15c38273fef8cfbe6ef564bb8f7a95b59c117e9afd8c11df6af7a5ea4264f2d729572e587726bbd792ea8579a1dd94147edab735de351e4058207e6eb73938905ac14a77d200cc1105794eb",
      secret:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx399f3c",
    },
    {
      uid: "80cb3793396a385efb0ca6",
      dateCreatedAt: Date.now(),
      key: "0b4cd815cc39ae678a7bcb1d894209f48af9621c82f221d15c38273fef8cfbe6ef564bb8f7a95b59c117e9afd8c11df6af7a5ea4264f2d729572e587726bbd792ea8579a1dd94147edab735de351e4058207e6eb73938905ac14a77d200cc1105794eb",
      secret:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx399f3c",
    },
    {
      uid: "80cb3793396a385efb0ca6",
      dateCreatedAt: Date.now(),
      key: "0b4cd815cc39ae678a7bcb1d894209f48af9621c82f221d15c38273fef8cfbe6ef564bb8f7a95b59c117e9afd8c11df6af7a5ea4264f2d729572e587726bbd792ea8579a1dd94147edab735de351e4058207e6eb73938905ac14a77d200cc1105794eb",
      secret:
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx399f3c",
    },
  ];

  return (
    <DashboardWrapper>
      <div className='relative w-full flex flex-row items-stretch justify-center'>
        <Link
          to='/'
          className='absolute left-2 hover:bg-gray-200 rounded-full p-2'>
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
      <table class='border-collapse table-fixed w-full text-sm text-left cursor-pointer'>
        <thead>
          <tr>
            <th class='w-20 border-b dark:border-gray-600 font-medium p-4 pl-8 pt-0 pb-3 text-gray-400 dark:text-gray-200 text-left uppercase text-xs'>
              Index
            </th>
            <th class='border-b dark:border-gray-600 font-medium p-4 pt-0 pb-3 text-gray-400 dark:text-gray-200 text-left uppercase text-xs'>
              uid
            </th>
            <th class='w-36 border-b dark:border-gray-600 font-medium p-4 pt-0 pb-3 text-gray-400 dark:text-gray-200 text-left uppercase text-xs'>
              Date Created At
            </th>
            <th class='border-b dark:border-gray-600 font-medium p-4 pt-0 pb-3 text-gray-400 dark:text-gray-200 text-left uppercase text-xs'>
              key
            </th>
            <th class='border-b dark:border-gray-600 font-medium p-4 pt-0 pb-3 text-gray-400 dark:text-gray-200 text-left uppercase text-xs'>
              secret
            </th>
            <th class='w-4 border-b dark:border-gray-600 font-medium p-4 pr-8 pt-0 pb-3 text-gray-400 dark:text-gray-200 text-left uppercase text-xs'></th>
          </tr>
        </thead>
        <tbody class='bg-white dark:bg-gray-800'>
          {users.map((user, index) => (
            <tr key={user.uid} className='group'>
              <td class='border-b border-gray-100 dark:border-gray-700 p-4 pl-8 text-gray-500 group-hover:text-black dark:text-gray-400'>
                {index}
              </td>
              <td class='border-b border-gray-100 dark:border-gray-700 p-4 text-gray-500 group-hover:text-black dark:text-gray-400 overflow-clip'>
                {user.uid}
              </td>
              <td class='border-b border-gray-100 dark:border-gray-700 p-4 text-gray-500 group-hover:text-black dark:text-gray-400 overflow-clip'>
                {user.dateCreatedAt}
              </td>
              <td class='border-b border-gray-100 dark:border-gray-700 p-4 text-gray-500 group-hover:text-black dark:text-gray-400 overflow-clip'>
                {user.key}
              </td>
              <td class='border-b border-gray-100 dark:border-gray-700 p-4 text-gray-500 group-hover:text-black dark:text-gray-400 overflow-clip'>
                {user.secret}
              </td>
              <td class='border-b border-gray-100 dark:border-gray-700 p-4 pr-8 text-gray-500 group-hover:text-black dark:text-gray-400 overflow-clip'>
                <Link to='/api/string'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 opacity-0 inline-block group-hover:opacity-100 group-hover:animate-pulse'
                    viewBox='0 0 20 20'
                    fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardWrapper>
  );
};
