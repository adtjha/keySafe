import { useState } from "react";
import { DashboardWrapper } from "./DashboardWrapper";

export const APINew = () => {
  const [data, setData] = useState({
    url: "http://localhost:5001/apikeysafe/us-central1/api_user",
    name: "usersAPI",
    keyStartString: "keysafe",
    security: false,
    analytics: true,
    usingWebsite: true,
  });

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

  return (
    <DashboardWrapper>
      <div className='px-8 py-4 w-full flex flex-col items-start justify-evenly space-y-4'>
        <div className='text-4xl font-bold mb-6'>Create New API.</div>
        <div className='relative w-full grid grid-cols-2'>
          <form className='w-full flex flex-col items-start space-y-8 border-r border-gray-300'>
            <div className='w-4/5 flex flex-col items-start justify-center space-y-2'>
              <label className='text-sm font-medium'>endpoint url</label>
              <input
                onChange={handleChange}
                name='url'
                className='w-full py-2 px-4 border border-gray-400 rounded-md'
                value={data.url}
              />
            </div>
            <div className='w-4/5 flex flex-col items-start justify-center space-y-2'>
              <label className='font-medium'>endpoint name</label>
              <input
                onChange={handleChange}
                name='name'
                className='w-full py-2 px-4 border border-gray-400 rounded-md'
                value={data.name}
              />
            </div>
            <div className='w-4/5 flex flex-col items-start justify-center space-y-2'>
              <label className='font-medium'>api key start string</label>
              <input
                onChange={handleChange}
                name='keyStartString'
                className='w-full py-2 px-4 border border-gray-400 rounded-md'
                value={data.keyStartString}
              />
            </div>
            <div className='w-4/5 flex flex-col items-start justify-start space-y-2'>
              <div className='w-4/5 flex flex-row items-center justify-start space-x-2'>
                <input
                  onChange={handleChange}
                  name='security'
                  type={"checkbox"}
                  className='w-fit py-2 px-4 border border-gray-400 rounded-md'
                  value={data.security}
                  defaultChecked={data.security}
                />
                <label className='font-medium'>is api security required</label>
              </div>
              <label className='text-left text-sm text-gray-500'>
                API Endpoint is provided with a secret key, which is available
                only once at the time generation. It makes the api secure to use
                in a backend environment, and do tasks that are require high
                level of security.
              </label>
            </div>
            <div className='w-4/5 flex flex-col items-start justify-start space-y-2'>
              <div className='w-4/5 flex flex-row items-center justify-start space-x-2'>
                <input
                  onChange={handleChange}
                  name='analytics'
                  type={"checkbox"}
                  className='w-fit py-2 px-4 border border-gray-400 rounded-md'
                  value={data.analytics}
                  defaultChecked={data.analytics}
                />
                <label className='font-medium'>is api analytics required</label>
              </div>
              <label className='text-left text-sm text-gray-500'>
                Analytics include details regarding,
                <ul className='list-disc py-1 pl-6'>
                  <li>request time and date</li>
                  <li>api request frequency in a given duration</li>
                  <li>api request access issues frequency</li>
                </ul>
                and much more.
              </label>
            </div>
          </form>
          <div className='w-full flex flex-col items-center space-y-4 text-left'>
            {Object.keys(data).map((datapoint) => (
              <div className='w-4/5 flex flex-col items-start justify-center'>
                <label className='text-sm text-gray-400 font-semibold'>
                  {datapoint}
                </label>
                <div className='w-full'>{data[datapoint].toString()}</div>
              </div>
            ))}
            <div className='w-4/5 flex flex-col items-start justify-center'>
              <label className='text-sm text-gray-400 font-semibold'>
                api key sample
              </label>
              <div className='w-full break-words'>{`${
                data["keyStartString"]
              }_${new Array(35 - data["keyStartString"].length)
                .fill("x")
                .join("")}`}</div>
            </div>
            {data["security"] && (
              <div className='w-4/5 flex flex-col items-start justify-center'>
                <label className='text-sm text-gray-400 font-semibold'>
                  api secret sample
                </label>
                <div className='w-full'>{`${new Array(36)
                  .fill("x")
                  .join("")}`}</div>
              </div>
            )}
          </div>
          <button
            onClick={submitForm}
            className='z-10 fixed bottom-10 right-10 bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-md'>
            Create New API
          </button>
        </div>
      </div>
    </DashboardWrapper>
  );
};
