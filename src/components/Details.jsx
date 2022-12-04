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
    <React.Fragment>
      <div className='w-full grid grid-cols-4 grid-flow-row-dense items-center justify-center gap-8'>
        {new Array(8).fill("a").map((e, i, ar) => (
          <React.Fragment>
            <Chart filename={"aapl.csv"}></Chart>
          </React.Fragment>
        ))}
      </div>
      <div className='w-full m-auto overflow-hidden flex flex-wrap items-stretch justify-between gap-2 border-primary-text'>
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
              className='group border border-dashed border-primary-text-30 hover:border-solid hover:border-primary-medium hover:bg-primary-light-30/50 rounded-md relative w-auto flex-grow flex flex-col items-start p-4 text-primary-text cursor-pointer'>
              <h1 className='text-primary-text-60/50 tracking-wider text-xs uppercase font-sans font-bold'>
                {names[key]}
              </h1>
              <div className='w-full flex flex-row gap-4'>
                <h3 className='break-all text-primary-text font-mono text-left'>
                  {value}
                </h3>
                <div
                  title='copy value to clipboard'
                  className='opacity-0 group-hover:opacity-100 absolute right-2 bottom-2 cursor-copy'>
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
            </div>
          );
        })}
      </div>
      <div className='w-full items-center flex flex-wrap justify-center gap-4 p-2'>
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
    </React.Fragment>
  );
};
