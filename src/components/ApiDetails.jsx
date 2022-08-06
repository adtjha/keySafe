import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
    secret: "API Secret Hash",
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

  const copyData = (key, value) => {
    navigator.clipboard.writeText(value);
    toast(`${key} Copied`);
  };

  return (
    <>
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
              onClick={() => copyData(names[key], value)}
              className='group relative w-auto flex-grow flex flex-col items-start p-4 border-2 font-mono text-stone-400 border-stone-200 hover:bg-stone-200 rounded-md cursor-copy'>
              <h1 className='text-stone-400 tracking-wider text-xs font-bold group-hover:text-stone-900'>
                {names[key]}
              </h1>
              <h3 className='break-all text-stone-800 font-medium text-left group-hover:text-stone-900'>
                {value}
              </h3>
              <div className='absolute right-2 bottom-2 '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path d='M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z' />
                  <path d='M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z' />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
