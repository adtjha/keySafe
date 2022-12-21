import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { ApiDetails } from "../details";
import { DashboardWrapper } from "../../../components/DashboardWrapper";
import { SearchBar } from "../../../components/SearchBar";
import { Chart } from "../../../components/chart";

export const Users = () => {
  let { apiId, apiName } = useParams();
  console.log({ apiId, apiName });

  let navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "users"), where("apiId", "==", apiId)),
      (doc) => {
        setUsers(doc.docs.map((doc) => ({ [doc.id]: doc.data() })));
      }
    );
    return () => unsub();
  }, [apiId]);

  return (
    <DashboardWrapper>
      <React.Fragment>
        <div className='sticky top-0 w-full'>
          <div className='w-full relative flex flex-row items-center justify-between'>
            <button
              onClick={() => navigate(-1)}
              className='absolute -left-12 group hover:bg-primary-light-30 rounded-full p-2 w-min'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 opacity-30 group-hover:opacity-100'
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
            <div className='w-auto text-2xl font-bold'>API : {apiName}</div>
            <div className='w-[45%]'>
              <SearchBar />
            </div>
          </div>
        </div>

        <Routes>
          <Route
            path='/'
            index
            element={
              <React.Fragment>
                <div className='w-full h-64 grid grid-cols-4 grid-flow-row-dense items-center justify-center gap-8'>
                  {new Array(8).fill("a").map((e, i, ar) => (
                    <React.Fragment>
                      <Chart filename={"aapl.csv"}></Chart>
                    </React.Fragment>
                  ))}
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
