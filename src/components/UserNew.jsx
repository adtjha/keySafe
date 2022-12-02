import { useActor } from "@xstate/react";
import { data } from "autoprefixer";
import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from "../App";
import { DashboardWrapper } from "./DashboardWrapper";
import Editor from "@monaco-editor/react";
import { toast } from "react-toastify";
import useScrollPosition from "./useScrollPosition";

export const UserNew = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.authService);

  const reviewData = useRef(null);

  const [open, setOpen] = useState(false);

  const scrollPos = useScrollPosition();

  useEffect(() => {
    console.log(scrollPos);
    if (scrollPos > 130) {
      reviewData.current.querySelector("h1").style.top = "30px";
      reviewData.current.querySelector("div").style.top = "74px";
      reviewData.current.querySelector("div").style.maxHeight = "480px";
    } else if (scrollPos < 130 && scrollPos > 0) {
      reviewData.current.querySelector("h1").style.top = "152px";
      reviewData.current.querySelector("div").style.top = "204px";
      reviewData.current.querySelector("div").style.maxHeight = "408px";
    }
  }, [scrollPos]);

  const [apiList, setApiList] = useState([]);

  const [data, setData] = useState({
    uid: "8284d249-fc86-4a19-a854-bbefc2a6b4e6",
    username: "Aditya Jha",
    key_prefix: "keySafe",
    api_name: "Zamzon",
    url: "http://localhost:5001/apikeysafe/us-central1/zamazon",
    metadata: {},
  });

  const [highlightText, setHighlightText] = useState("");

  useEffect(() => {
    send({ type: "GET_DATA", id: state.context.user.id });
    console.log(state.context.api);
    state.context.api &&
      setApiList(
        state.context.api.map((e) => ({
          [Object.values(e)[0].name]: {
            url: Object.values(e)[0].url,
            id: Object.keys(e)[0],
          },
        }))
      );
  }, [state.context, send]);

  useEffect(() => {
    if (
      highlightText !== "" &&
      ["url", "name", "keyStartString", "security", "analytics"].includes(
        highlightText
      )
    ) {
      console.log(highlightText);
      const el = document.getElementById(highlightText);
      el.classList.toggle("animate-ping", true);
      setTimeout(() => {
        el.classList.toggle("animate-ping", false);
        setHighlightText("");
      }, 1800);
    }

    return () => {
      setHighlightText("");
    };
  }, [highlightText]);

  const handleChange = (e) => {
    if (["security", "analytics"].indexOf(e.target.name) !== -1) {
      setData((prev) => {
        return { ...prev, [e.target.name]: e.target.checked };
      });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const submitForm = (e) => {
    console.log(data);
  };

  let navigate = useNavigate();

  return (
    <React.Fragment>
      <DashboardWrapper>
        <div className='px-8 w-full flex flex-col items-start justify-evenly space-y-4 font-sans text-sm'>
          <div className='w-full relative flex flex-row items-center justify-center'>
            <button
              onClick={() => navigate("/")}
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
            <div className='w-full text-4xl font-bold'>Create New User</div>
          </div>
          <div className='relative w-full grid grid-cols-2 justify-items-center mb-16'>
            <form className='w-full pt-8 flex flex-col items-center space-y-8 border-r-4 border-primary-text pb-24'>
              <h1 className='w-4/5 text-start text-primary-text/40 text-xl font-bold uppercase'>
                fill in user details
              </h1>
              <div className='w-4/5 flex flex-col items-start justify-center space-y-2'>
                <label className='text-sm font-medium uppercase'>uid</label>
                <input
                  type={"text"}
                  onChange={handleChange}
                  name='uid'
                  id='uid'
                  className='w-full py-3 px-4 border-transparent focus:ring-primary-dark focus:border-primary-dark bg-primary-light-30 rounded-md'
                  value={data.uid}
                />
              </div>
              <div className='w-4/5 flex flex-col items-start justify-center space-y-2'>
                <label className='font-medium uppercase'>username</label>
                <input
                  type={"text"}
                  onChange={handleChange}
                  name='username'
                  id='username'
                  className='w-full py-3 px-6 border-transparent focus:ring-primary-dark focus:border-primary-dark bg-primary-light-30 rounded-md'
                  value={data.username}
                />
              </div>
              <div className='w-4/5 flex flex-col items-start justify-center space-y-2'>
                <label className='font-medium uppercase'>
                  api name{" "}
                  <span className='lowercase text-primary-text/60'>
                    (user attached to this api)
                  </span>
                </label>
                <select
                  onChange={handleChange}
                  name='apiName'
                  id='apiName'
                  className='w-full py-3 px-6 border-transparent focus:ring-primary-dark focus:border-primary-dark bg-primary-light-30 rounded-md'
                  value={data.api_name}>
                  <option value=''>choose api attached to this user</option>
                  {apiList.map((e) => (
                    <option value={`${Object.keys(e)[0]}`}>{`${
                      Object.keys(e)[0]
                    }`}</option>
                  ))}
                </select>
              </div>
              <div className='w-4/5 flex flex-col items-start justify-center space-y-2'>
                <label className='font-medium uppercase'>user key prefix</label>
                <input
                  type={"text"}
                  onChange={handleChange}
                  name='keyPrefix'
                  id='keyPrefix'
                  className='w-full py-3 px-6 border-transparent focus:ring-primary-dark focus:border-primary-dark bg-primary-light-30 rounded-md'
                  value={data.key_prefix}
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(!open);
                }}
                className='w-fit bg-primary-light-30 hover:bg-primary-light rounded-md py-3 px-6 flex flex-row items-center justify-start space-x-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='w-5 h-5 border-2 border-primary-text rounded-full'>
                  <path d='M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z' />
                </svg>
                <span className='font-bold'>
                  Add more key:value pairs for user
                </span>
              </button>
            </form>
            <div
              ref={reviewData}
              className='relative w-4/5 pt-8 flex flex-col items-start space-y-4 text-left rounded-br-2xl'>
              <h1
                id='title'
                className='w-[520px] overflow-hidden fixed top-[152x] right-[8%] left-[54%] text-primary-text/40 text-xl font-bold uppercase'>
                your user
              </h1>
              <div
                id='body'
                className='w-[520px] overflow-y-scroll fixed top-[204px] right-[8%] left-[54%] flex flex-wrap items-stretch justify-between gap-4'>
                {Object.entries(data).map(([key, value]) => {
                  if (
                    [
                      "createdAt",
                      "lastKeyRegenerate",
                      "lastSecretRegenerate",
                    ].includes(key)
                  ) {
                    value = new Date(value["seconds"] * 1000).toUTCString();
                  } else if (
                    !value ||
                    (typeof value === "object" &&
                      !(Object.keys(value).length > 0))
                  ) {
                    value = "-";
                  }
                  return (
                    <div
                      key={key}
                      className='group relative h-fit w-auto flex-grow flex flex-col items-start p-4 font-mono text-primary-text bg-primary-light-30 rounded-md cursor-pointer'>
                      <h1 className='text-primary-text-60 tracking-wider text-xs uppercase font-sans'>
                        {key
                          .split(/(?=[A-Z])/)
                          .map((s) => s.toLowerCase())
                          .join(" ")}
                      </h1>
                      {typeof value === "string" ? (
                        <h3 className='break-all text-primary-text group-hover:font-bold text-left group-hover:underline'>
                          {String(value)}{" "}
                        </h3>
                      ) : (
                        typeof value === "object" && (
                          <pre className='w-full'>
                            <code lang='json'>
                              {JSON.stringify(value, null, "\t")}
                            </code>
                          </pre>
                        )
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              onClick={submitForm}
              className='col-span-2 w-fit bg-secondary-dark text-secondary-text font-mono font-bold hover:underline text-2xl px-6 py-2 rounded-md'>
              Create New API
            </button>
          </div>
        </div>
      </DashboardWrapper>
      <AddField open={open} setOpen={setOpen} data={data} setData={setData} />
    </React.Fragment>
  );
};

const AddField = ({ open, setOpen, data, setData }) => {
  const editorRef = useRef(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function handleEditorChange(value, event) {
    setData({ ...data, metadata: JSON.parse(value) });
  }

  const handleSave = (e) => {
    console.log(data);
    setOpen(!open);
  };

  function handleEditorValidation(markers) {
    // model markers
    markers.forEach((marker) => toast(marker.message));
  }

  return (
    <React.Fragment>
      {open && (
        <div className='fixed inset-0 z-40 bg-primary-text/30 overflow-hidden'>
          <div className='w-full h-full flex flex-wrap items-center justify-center'>
            <div className='w-3/5 bg-background rounded-2xl p-4 m-auto flex flex-col items-stretch justify-center space-y-4'>
              <button
                onClick={() => setOpen(!open)}
                className='w-full flex flex-row items-center justify-end'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='w-6 h-6'>
                  <path d='M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z' />
                </svg>
              </button>
              <Editor
                height={"50vh"}
                defaultLanguage={"json"}
                theme={"vs-code"}
                defaultValue={JSON.stringify(data.metadata, null, 2)}
                value={JSON.stringify(data.metadata, null, 2)}
                onMount={handleEditorDidMount}
                onChange={handleEditorChange}
                onValidate={handleEditorValidation}
              />
              <div className='w-full flex flex-row items-center justify-end space-x-2'>
                <button
                  onClick={() => setOpen(!open)}
                  className='bg-secondary-dark/40 hover:bg-secondary-dark/60 text-background px-4 py-2 rounded-md font-bold font-sans'>
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className='bg-secondary-light/40 hover:bg-secondary-light/60 text-primary-text px-4 py-2 rounded-md font-bold font-sans'>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

/**
 *


{
  "id": 1,
  "first_name": "Madeleine",
  "last_name": "Derr",
  "email": "mderr0@instagram.com",
  "gender": "Female",
  "ip_address": "249.77.170.61",
  "_first_name": "Madeleine",
  "_last_name": "Derr",
  "_email": "mderr0@instagram.com",
  "_gender": "Female",
  "_ip_address": "249.77.170.61",
  "__first_name": "Madeleine",
  "__last_name": "Derr",
  "__email": "mderr0@instagram.com",
  "__gender": "Female",
  "__ip_address": "249.77.170.61",
}


 *
 */
