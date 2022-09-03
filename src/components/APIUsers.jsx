import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { ApiDetails } from "./ApiDetails";
import { DashboardWrapper } from "./DashboardWrapper";

export const ApiUsers = () => {
  let { apiId, apiName } = useParams();
  console.log({ apiId, apiName });

  let navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const names = {
    uid: "UID",
    createdAt: "Created At",
    lastVerified: "Last Verfied",
    lastSecretRegenerate: "Last Secret Regenerate",
    email: "Email",
    lastKeyRegenerate: "Last Key Regenerate",
    apiId: "API ID",
    name: "Name",
    url: "URL",
    key: "API Key",
    secret: "API Secret",
    timesCalled: "API Call Count",
    secretGenerationCount: "API Secret Regeneration Count",
    lastCall: "Last Call",
  };

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "users"), where("apiId", "==", apiId)),
      (doc) => {
        setUsers(doc.docs.map((doc) => ({ [doc.id]: doc.data() })));
      }
    );
    return () => unsub();
  }, []);

  return (
    <DashboardWrapper>
      <div className='relative pt-10 w-full flex flex-row items-center'>
        <div className='fixed top-16 inset-x-0 w-full flex flex-row items-stretch justify-center'>
          <button
            onClick={() => navigate(-1)}
            className='absolute left-2 hover:bg-stone-200 rounded-full p-2'>
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
          <div className='text-2xl font-bold'>API : {apiName}</div>
        </div>
        <Routes>
          <Route
            path='/'
            index
            element={
              <div className='w-full flex flex-wrap items-stretch justify-evenly gap-4'>
                <SearchBar />
                <table class='border-collapse table-fixed w-full text-sm text-left cursor-pointer font-mono'>
                  <thead>
                    <tr>
                      <th class='w-[6%] border-b dark:border-stone-600 font-medium p-4 pl-8 pt-0 pb-3 text-stone-400 dark:text-stone-200 text-left uppercase text-xs'>
                        Index
                      </th>
                      <th class='w-[24%] border-b dark:border-stone-600 font-medium p-4 pt-0 pb-3 text-stone-400 dark:text-stone-200 text-left uppercase text-xs'>
                        uid
                      </th>
                      <th class='w-[14%] border-b dark:border-stone-600 font-medium p-4 pt-0 pb-3 text-stone-400 dark:text-stone-200 text-left uppercase text-xs'>
                        Date Created At
                      </th>
                      <th class='w-[24%] border-b dark:border-stone-600 font-medium p-4 pt-0 pb-3 text-stone-400 dark:text-stone-200 text-left uppercase text-xs'>
                        key
                      </th>
                      <th class='w-[16%] border-b dark:border-stone-600 font-medium p-4 pt-0 pb-3 text-stone-400 dark:text-stone-200 text-left uppercase text-xs'>
                        name
                      </th>
                      <th class='w-[16%] border-b dark:border-stone-600 font-medium p-4 pt-0 pb-3 text-stone-400 dark:text-stone-200 text-left uppercase text-xs'>
                        Last Verified
                      </th>
                    </tr>
                  </thead>
                  <tbody class='bg-white dark:bg-stone-800'>
                    {users.map((userObj, index) =>
                      Object.entries(userObj).map((k) => {
                        let [id, user] = k;
                        console.log(user);
                        return (
                          <tr
                            onClick={() => navigate(`user/${id}`)}
                            key={id}
                            className='group'>
                            <td class='border-b border-stone-100 dark:border-stone-700 p-4 pl-8 text-stone-500 group-hover:font-medium group-hover:text-stone-900 dark:text-stone-400'>
                              {index}
                            </td>
                            <td class='border-b border-stone-100 dark:border-stone-700 p-4 text-stone-500 group-hover:font-medium group-hover:text-stone-900 dark:text-stone-400 overflow-clip'>
                              {user.uid}
                            </td>
                            <td class='border-b border-stone-100 dark:border-stone-700 p-4 text-stone-500 group-hover:font-medium group-hover:text-stone-900 dark:text-stone-400 overflow-clip'>
                              {new Date(
                                user.createdAt.seconds * 1000
                              ).toUTCString()}
                            </td>
                            <td class='border-b border-stone-100 dark:border-stone-700 p-4 text-stone-500 group-hover:font-medium group-hover:text-stone-900 dark:text-stone-400 overflow-clip'>
                              {user.key}
                            </td>
                            <td class='border-b border-stone-100 dark:border-stone-700 p-4 text-stone-500 group-hover:font-medium group-hover:text-stone-900 dark:text-stone-400 overflow-clip'>
                              {user.name}
                            </td>
                            <td class='border-b border-stone-100 dark:border-stone-700 p-4 text-stone-500 group-hover:font-medium group-hover:text-stone-900 dark:text-stone-400 overflow-clip'>
                              {user.lastVerified}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            }></Route>
          <Route path='user'>
            <Route
              path=':key'
              element={<ApiDetails apiName={apiName} apiId={apiId} />}
            />
          </Route>
        </Routes>
      </div>
    </DashboardWrapper>
  );
};

const SearchBar = () => {
  return (
    <div className='w-full mb-4'>
      <form className='flex items-center'>
        <label htmlFor='simple-search' className='sr-only'>
          Search
        </label>
        <div className='relative w-full'>
          <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <svg
              aria-hidden='true'
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <input
            type='text'
            id='simple-search'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search'
            required=''
          />
        </div>
        <button
          type='submit'
          className='p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
          <span className='sr-only'>Search</span>
        </button>
      </form>
    </div>
  );
};
