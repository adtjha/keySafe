import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { DashboardWrapper } from "./DashboardWrapper";

export const ApiDetails = ({ apiName, apiId }) => {
  let navigate = useNavigate();
  let location = useLocation();

  let { key } = useParams();
  console.log({ key, apiName, apiId });

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

  const getLink = (link) => {
    let p = link.split("/");
    p.pop();
    p.pop();
    return p.join("/");
  };

  const [user, setUser] = useState({});
  const [uid, setUid] = useState({});

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", key), (doc) => {
      console.log(doc.data());
      setUser(doc.data());
      setUid(doc.id);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      {/* <div className='relative w-full flex flex-row items-stretch justify-center'>
        <button
          onClick={() => navigate(getLink(location.pathname))}
          className='absolute left-10 hover:bg-stone-200 rounded-full p-2'>
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
      </div> */}
      <div className='w-11/12 m-auto overflow-hidden flex flex-wrap items-stretch justify-between gap-2'>
        {Object.entries(user).map(([key, value]) => {
          if (
            ["createdAt", "lastKeyRegenerate", "lastSecretRegenerate"].includes(
              key
            )
          ) {
            value = new Date(value["seconds"] * 1000).toUTCString();
          } else if (!value) {
            value = "-";
          }
          console.log(key, value);
          return (
            <div
              key={key}
              className='w-auto flex-grow flex flex-col items-start p-4 border-2 border-stone-200 hover:bg-stone-200 rounded-md cursor-copy'>
              <h1 className='text-stone-400 tracking-wider text-xs font-bold'>
                {names[key]}
              </h1>
              <h3 className='break-all text-stone-800 font-medium text-left'>
                {value}
              </h3>
            </div>
          );
        })}
      </div>
    </>
  );
};
