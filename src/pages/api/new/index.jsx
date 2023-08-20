import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardWrapper } from "../../../components/DashboardWrapper";
import useScrollPosition from "../../../components/useScrollPosition";
import jsyaml from "js-yaml";
import { FillInForm } from "./FillInForm";
import { UploadForm } from "./UploadForm";
import { ReviewFillInForm } from "./ReviewFillInForm";
import { ReviewUploadForm } from "./ReviewUploadForm";

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
  const [upload, setUplaod] = useState(false);
  const [file, setFile] = useState("");
  const [yamlData, setYamlData] = useState({});

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
    if (highlightText !== "" && ["url", "name", "key_prefix", "security", "analytics"].includes(highlightText)) {
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

  const handleTypeChange = (e) => {
    e.target.value === "upload" ? setUplaod(true) : setUplaod(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const parsedYaml = jsyaml.load(text);
      setYamlData(parsedYaml);
    } catch (error) {
      console.error("Error parsing YAML:", error);
    }
  };

  useEffect(() => console.log(yamlData), [yamlData]);

  let navigate = useNavigate();

  return (
    <DashboardWrapper>
      <div className='px-8 w-full flex flex-col items-start justify-evenly space-y-4 font-sans text-sm'>
        <div className='w-full relative bg-background  flex flex-row items-center justify-center'>
          <button onClick={() => navigate(-1)} className='absolute left-0 hover:bg-primary-light-30 rounded-full p-2 w-min'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M11 17l-5-5m0 0l5-5m-5 5h12' />
            </svg>
          </button>
          <div className='w-full text-4xl font-bold'>Create New API</div>
          <div>
            <select className='rounded-md' name='createType' id='createType' onChange={handleTypeChange}>
              <option value='fill in form' selected>
                Fill in Form
              </option>
              <option value='upload'>upload</option>
            </select>
          </div>
        </div>

        <div className='relative w-full grid grid-cols-2 justify-items-center mb-16'>
          {!upload ? <React.Fragment>{FillInForm(handleChange, data)}</React.Fragment> : <React.Fragment>{UploadForm(handleFileUpload, yamlData)}</React.Fragment>}
          {!upload ? ReviewFillInForm(reviewData, data) : ReviewUploadForm(reviewData, yamlData, handleChange, data)}
          <button onClick={submitForm} className='col-span-2 w-fit bg-secondary-dark text-secondary-text font-mono hover:underline text-lg px-4 py-2 rounded-md'>
            Create New API
          </button>
        </div>
      </div>
    </DashboardWrapper>
  );
};
