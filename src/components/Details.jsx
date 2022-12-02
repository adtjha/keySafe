import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { Chart } from "./Chart";

export const ApiDetails = ({ apiName, apiId }) => {
  // let navigate = useNavigate();
  // let location = useLocation();

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

  // const getLink = (link) => {
  //   let p = link.split("/");
  //   p.pop();
  //   p.pop();
  //   return p.join("/");
  // };

  const [user, setUser] = useState({});
  const [uid, setUid] = useState({});

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", key), (doc) => {
      console.log(doc.data());
      setUser(doc.data());
      setUid(doc.id);
    });
    return () => unsub();
  }, [key]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const copyData = (key, value) => {
    navigator.clipboard.writeText(value);
    toast(`${key} Copied`);
  };

  return (
    <>
      <div className='relative w-full grid grid-cols-6 justify-items-center mb-16 gap-8'>
        <div className='col-span-2 w-full m-auto overflow-hidden flex flex-wrap items-stretch justify-between gap-4'>
          {Object.entries(user).map(([key, value]) => {
            if (
              [
                "createdAt",
                "lastKeyRegenerate",
                "lastSecretRegenerate",
              ].includes(key)
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
                className='group relative w-auto flex-grow flex flex-col items-start p-4 font-mono text-primary-text bg-primary-light-30 rounded-md cursor-pointer'>
                <h1 className='text-primary-text-60 tracking-wider text-xs uppercase font-sans'>
                  {names[key]}
                </h1>
                <h3 className='break-all text-primary-text group-hover:font-bold text-left group-hover:underline'>
                  {value}
                </h3>
                <div
                  title='copy value to clipboard'
                  className='absolute right-2 bottom-2 cursor-copy'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-primary-text-30 group-hover:text-primary-text-60'
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
        <div className='relative h-[848px] col-span-4 w-full overflow-y-scroll flex flex-col items-start justify-start gap-4 border-2 border-dashed border-secondary-dark/40 p-2 rounded-lg'>
          <div className='sticky -top-4 pt-4 bg-background w-auto flex flex-wrap items-start justify-start gap-4 p-2 pl-2'>
            <button
              onClick={() => {}}
              className='col-span-2 w-fit bg-secondary-dark/80 hover:bg-secondary-dark  text-secondary-text font-mono text-sm hover:underline hover:font-bold hover:drop-shadow-lg px-4 py-2 rounded-md'>
              Re-generate Secret Key
            </button>
            <button
              onClick={() => {}}
              className='col-span-2 w-fit bg-secondary-dark/80 hover:bg-secondary-dark  text-secondary-text font-mono text-sm hover:underline hover:font-bold hover:drop-shadow-lg px-4 py-2 rounded-md'>
              Re-issue API Key & Secret
            </button>
            <button
              onClick={() => {}}
              className='col-span-2 w-fit bg-red-500/80 hover:bg-red-500 text-secondary-text font-mono text-sm hover:underline hover:font-bold hover:drop-shadow-lg px-4 py-2 rounded-md'>
              Delete API User
            </button>
          </div>
          <div className='w-full grid grid-cols-2 grid-flow-row-dense items-center justify-center gap-8'>
            {new Array(6).fill("a").map((e, i, ar) => (
              <React.Fragment>
                <Chart filename={"aapl.csv"}></Chart>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
