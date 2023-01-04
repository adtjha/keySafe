import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardWrapper } from "../../../components/DashboardWrapper";
import useScrollPosition from "../../../components/useScrollPosition";

export const New = () => {
  const [data, setData] = useState({
    url: "http://localhost:5001/apikeysafe/us-central1/api_user",
    name: "usersAPI",
    key_prefix: "keysafe",
    security: false,
    analytics: true,
    using_website: true,
    sample_key: "",
    sample_secret: "",
  });

  // const [useOpenApi, setUseOpenApi] = useState(false);

  const [highlightText, setHighlightText] = useState("");

  const scrollPos = useScrollPosition();

  const reviewData = useRef(null);

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

  useEffect(() => {
    if (
      highlightText !== "" &&
      ["url", "name", "key_prefix", "security", "analytics"].includes(
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
      console.log(e.target.name);
      setData((prev) => {
        return { ...prev, [e.target.name]: e.target.checked };
      });
    } else if (e.target.name === "key_prefix") {
      console.log(e.target.name, e.target.value);
      if (!data.security) {
        setData({
          ...data,
          [e.target.name]: e.target.value,
          sample_key: `${e.target.value}_zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx`,
          sample_secret: `zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx`,
        });
      } else {
        setData({
          ...data,
          [e.target.name]: e.target.value,
          sample_key: `${e.target.value}_zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx`,
        });
      }
    } else {
      console.log(e.target.name);
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const submitForm = (e) => {
    console.log(data);
  };

  let navigate = useNavigate();

  return (
    <DashboardWrapper>
      <div className='px-8 w-full flex flex-col items-start justify-evenly space-y-4 font-sans text-sm'>
        <div className='w-full relative bg-background  flex flex-row items-center justify-center'>
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
          <div className='w-full text-4xl font-bold'>Create New API</div>
        </div>
        <div className='relative w-full grid grid-cols-2 justify-items-center mb-16'>
          {true ? (
            <React.Fragment>
              <form className=''>
                <h1 className='w-4/5 text-start text-primary-text/40 text-xl font-bold uppercase'>
                  Fill in Api Details
                </h1>
                <div className='w-4/5 flex flex-col items-start justify-center space-y-2'>
                  <label className='text-sm font-medium uppercase'>
                    endpoint url
                  </label>
                  <input
                    type={"text"}
                    onChange={handleChange}
                    name='url'
                    id='url'
                    className='w-full py-3 px-6 border-transparent focus:ring-primary-text focus:border-primary-dark bg-primary-light-30 rounded-md'
                    value={data.url}
                  />
                </div>
                <div className='w-4/5 flex flex-col items-start justify-center space-y-2'>
                  <label className='font-medium uppercase'>endpoint name</label>
                  <input
                    type={"text"}
                    onChange={handleChange}
                    name='name'
                    id='name'
                    className='w-full py-3 px-6 border-transparent focus:ring-primary-text focus:border-primary-dark bg-primary-light-30 rounded-md'
                    value={data.name}
                  />
                </div>
                <div className='w-4/5 flex flex-col items-start justify-center space-y-2'>
                  <label className='font-medium uppercase'>
                    api key prefix
                  </label>
                  <input
                    onChange={handleChange}
                    type={"text"}
                    name='key_prefix'
                    id='key_prefix'
                    className='w-full py-3 px-6 border-transparent focus:ring-primary-text focus:border-primary-dark bg-primary-light-30 rounded-md'
                    value={data.key_prefix}
                  />
                </div>
                <div className='w-4/5 flex flex-col items-start justify-start space-y-2'>
                  <div className='w-4/5 flex flex-row items-center justify-start space-x-2'>
                    <input
                      onChange={handleChange}
                      name='security'
                      id='security'
                      type={"checkbox"}
                      className='border border-primary-text text-primary-text focus:ring-primary-text rounded'
                      value={data.security}
                      defaultChecked={data.security}
                    />
                    <label htmlFor='security' className='font-medium uppercase'>
                      is api security required
                    </label>
                  </div>
                  <label className='text-left text-sm text-primary-text'>
                    API Endpoint is provided with a secret key, which is
                    available only once at the time generation. It makes the api
                    secure to use in a backend environment, and do tasks that
                    are require high level of security.
                  </label>
                </div>
                <div className='w-4/5 flex flex-col items-start justify-start space-y-2'>
                  <div className='w-4/5 flex flex-row items-center justify-start space-x-2'>
                    <input
                      onChange={handleChange}
                      name='analytics'
                      id='analytics'
                      type={"checkbox"}
                      className='border border-primary-text text-primary-text focus:ring-primary-text rounded'
                      value={data.analytics}
                      defaultChecked={data.analytics}
                    />
                    <label
                      htmlFor='analytics'
                      className='font-medium uppercase'>
                      is api analytics required
                    </label>
                  </div>
                  <label className='text-left text-sm text-primary-text'>
                    Analytics include details regarding,
                    <ul className='list-disc py-1 pl-6'>
                      <li>request time and date</li>
                      <li>api request frequency in a given duration</li>
                      <li>api request access issues and their frequency</li>
                    </ul>
                    and much more.
                  </label>
                </div>
              </form>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className='w-full pt-8 flex flex-col items-center space-y-8 border-r-4 border-primary-text pb-24'></div>
            </React.Fragment>
          )}
          <div
            ref={reviewData}
            className='relative w-4/5 pt-8 flex flex-col items-start space-y-4 text-left rounded-br-2xl'>
            <h1 className='w-[520px] overflow-hidden fixed top-[152x] right-[8%] left-[54%] text-primary-text/40 text-xl font-bold uppercase'>
              your APi
            </h1>
            <div className='w-[520px] overflow-hidden fixed top-[204px] right-[8%] left-[54%] flex flex-wrap items-stretch justify-between gap-4'>
              {Object.entries(data).map(([key, value]) => {
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
                // console.log(key, value);
                if (key === "sample_secret" && !data.security) {
                  return <></>;
                } else {
                  return (
                    <div
                      key={key}
                      className='group relative w-auto flex-grow flex flex-col items-start p-4 font-mono text-primary-text bg-primary-light-30 rounded-md cursor-pointer'>
                      <h1 className='text-primary-text-60 tracking-wider text-xs uppercase font-sans'>
                        {key
                          .split(/(?=[A-Z])/)
                          .map((s) => s.toLowerCase())
                          .join(" ")}
                      </h1>
                      <h3 className='break-all text-primary-text group-hover:font-bold text-left group-hover:underline'>
                        {String(value)}
                      </h3>
                    </div>
                  );
                }
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
  );
};
