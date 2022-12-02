import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { ApiDetails } from "./Details";
import { DashboardWrapper } from "./DashboardWrapper";
import { SearchBar } from "./SearchBar";

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
      <React.Fragment>
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
          <div className='w-full text-4xl font-bold'>API : {apiName}</div>
        </div>
        <Routes>
          <Route
            path='/'
            index
            element={
              <React.Fragment>
                <div className='w-[45%]'>
                  <SearchBar />
                </div>
                <table class='border-collapse table-fixed w-full text-sm text-left cursor-pointer font-mono'>
                  <thead>
                    <tr>
                      <th class='w-[4%] border-b-2 font-bold font-sans p-4 pt-0 pb-3 text-primary-text text-center uppercase text-sm'>
                        Index
                      </th>
                      <th class='w-[24%] border-b-2 font-bold font-sans p-4 pt-0 pb-3 text-primary-text text-center uppercase text-sm'>
                        uid
                      </th>
                      <th class='w-[20%] border-b-2 font-bold font-sans p-4 pt-0 pb-3 text-primary-text text-center uppercase text-sm'>
                        Date Created At
                      </th>
                      <th class='w-[24%] border-b-2 font-bold font-sans p-4 pt-0 pb-3 text-primary-text text-center uppercase text-sm'>
                        key
                      </th>
                      <th class='w-[16%] border-b-2 font-bold font-sans p-4 pt-0 pb-3 text-primary-text text-center uppercase text-sm'>
                        name
                      </th>
                      <th class='w-[12%] border-b-2 font-bold font-sans p-4 pt-0 pb-3 text-primary-text text-center uppercase text-sm'>
                        Last Verified
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((userObj, index) =>
                      Object.entries(userObj).map((k) => {
                        let [id, user] = k;
                        console.log(user);
                        return (
                          <tr
                            onClick={() => navigate(`user/${id}`)}
                            key={id}
                            className='group'>
                            <td
                              title={`${index}`}
                              class='border-b border-primary-text-60 p-4 text-primary-text-60 font-bold group-hover:text-primary-text text-center whitespace-nowrap overflow-hidden text-ellipsis'>
                              {index}
                            </td>
                            <td
                              title={`${user.uid}`}
                              class='border-b border-primary-text-60 p-4 text-primary-text-60 font-bold group-hover:text-primary-text text-center whitespace-nowrap overflow-hidden text-ellipsis'>
                              {user.uid}
                            </td>
                            <td
                              title={`${new Date(
                                user.createdAt.seconds * 1000
                              ).toUTCString()}`}
                              class='border-b border-primary-text-60 p-4 text-primary-text-60 font-bold group-hover:text-primary-text text-center whitespace-nowrap overflow-hidden text-ellipsis'>
                              {new Date(
                                user.createdAt.seconds * 1000
                              ).toUTCString()}
                            </td>
                            <td
                              title={`${user.key}`}
                              class='border-b border-primary-text-60 p-4 text-primary-text-60 font-bold group-hover:text-primary-text text-center whitespace-nowrap overflow-hidden text-ellipsis'>
                              {user.key}
                            </td>
                            <td
                              title={`${user.name}`}
                              class='border-b border-primary-text-60 p-4 text-primary-text-60 font-bold group-hover:text-primary-text text-center whitespace-nowrap overflow-hidden text-ellipsis'>
                              {user.name}
                            </td>
                            <td
                              title={`${user.lastVerified}`}
                              class='border-b border-primary-text-60 p-4 text-primary-text-60 font-bold group-hover:text-primary-text text-center whitespace-nowrap overflow-hidden text-ellipsis'>
                              {user.lastVerified}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </React.Fragment>
            }></Route>
          <Route path='user'>
            <Route
              path=':key'
              element={<ApiDetails apiName={apiName} apiId={apiId} />}
            />
          </Route>
        </Routes>
      </React.Fragment>
    </DashboardWrapper>
  );
};
