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
          </button>
          <div className='text-2xl font-bold'>API : {apiName}</div>
        </div>
        <Routes>
          <Route
            path='/'
            index
            element={
              <div className='w-full flex flex-wrap items-stretch justify-between gap-4'>
                {users.map((user) => (
                  // <div
                  //   onClick={() => navigate(`user/${Object.keys(user)[0]}`)}
                  //   className='w-[49.40%] hover:bg-stone-200 border-2 border-stone-400 rounded-xl p-2 flex flex-wrap items-stretch justify-between gap-2'>
                  //   {Object.entries(Object.values(user)[0]).map(
                  //     ([key, value]) => {
                  //       if (
                  //         !["uid", "createdAt", "name", "url"].includes(key)
                  //       ) {
                  //         return <></>;
                  //       }

                  //       if (
                  //         [
                  //           "createdAt",
                  //           "lastKeyRegenerate",
                  //           "lastSecretRegenerate",
                  //         ].includes(key)
                  //       ) {
                  //         value = new Date(
                  //           value["seconds"] * 1000
                  //         ).toUTCString();
                  //       } else if (!value) {
                  //         value = "-";
                  //       }
                  //       return (
                  //         <div
                  //           key={key}
                  //           className='w-auto flex-grow flex flex-col items-start p-1 border-2 border-stone-100/30 font-mono rounded-md cursor-pointer'>
                  //           <h1 className='text-stone-600 uppercase tracking-wide text-xs font-bold'>
                  //             {names[key]}
                  //           </h1>
                  //           <h3 className='break-all text-stone-800 font-medium text-left'>
                  //             {value}
                  //           </h3>
                  //         </div>
                  //       );
                  //     }
                  //   )}

                  // </div>
                  <Card
                    id={Object.keys(user)[0]}
                    user={Object.values(user)[0]}
                  />
                ))}
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
const Card = ({ id, user }) => {
  let navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`user/${id}`)}
      className='w-[49.40%] hover:bg-stone-200 border-2 border-stone-400 rounded-xl p-2 flex flex-col items-stretch justify-center gap-2'>
      <div className='w-full flex flex-row items-center justify-evenly gap-2'>
        <CardSquare name={"UID"} value={user["uid"]} isTime={false} />
        <CardSquare
          name={"Created At"}
          value={user["createdAt"]}
          isTime={true}
        />
      </div>
      <div className='w-full flex flex-row items-center justify-evenly gap-2'>
        <CardSquare name={"Name"} value={user["name"]} isTime={false} />
        <CardSquare name={"URL"} value={user["url"]} isTime={false} />
      </div>
    </div>
  );
};

const CardSquare = ({ name, value, isTime }) => {
  return (
    <div className='w-auto flex-grow flex flex-col items-start p-1 border-2 border-stone-100/30 font-mono rounded-md cursor-pointer'>
      <h1 className='text-stone-600 uppercase tracking-wide text-xs font-bold'>
        {name}
      </h1>
      <h3 className='text-ellipsis overflow-hidden h-min text-stone-800 font-medium text-left'>
        {isTime ? new Date(value["seconds"] * 1000).toUTCString() : value}
      </h3>
    </div>
  );
};
