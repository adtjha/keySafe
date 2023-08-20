import React from "react";

export function ReviewUploadForm(reviewData, yamlData, handleChange, data) {
  return (
    <>
      <div ref={reviewData} className='relative w-4/5 h-full pt-8 flex flex-col items-start space-y-4 text-left rounded-br-2xl'>
        <h1 className='w-[520px] h-auto overflow-scroll text-primary-text/40 text-xl font-bold uppercase'>{yamlData?.info?.title}</h1>
        <div className='w-[520px] h-auto overflow-scroll  flex flex-wrap items-stretch justify-between gap-4'>
          {yamlData?.paths &&
            Object.entries(yamlData.paths).map(([key, value]) => (
              <div key={key} className='group relative w-auto flex-grow flex flex-col items-start justify-evenly gap-2 p-4 font-mono text-primary-text bg-primary-light-30 rounded-md cursor-pointer'>
                {" "}
                <h1 className='text-primary-text-60 tracking-wider text-xs uppercase font-sans'>{key}</h1>
                <h3 className='break-all text-primary-text group-hover:font-bold text-left group-hover:underline'>{Object.keys(value)}</h3>
                <h5>Method: {Object.keys(value).map((e) => yamlData.paths[key][e].summary)}</h5>
                <h6>Response Code: {Object.keys(value).map((e) => Object.keys(yamlData.paths[key][e].responses).join(" "))}</h6>
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
                  <label className='text-left text-xs text-primary-text'>
                    API Endpoint is provided with a secret key, which is available only once at the time generation. It makes the api secure to use in a backend environment, and do tasks that are require high level of security.
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
                    <label htmlFor='analytics' className='font-medium uppercase'>
                      is api analytics required
                    </label>
                  </div>
                  <label className='text-left text-xs text-primary-text'>
                    Analytics include details regarding,
                    <ul className='list-disc py-1 pl-6'>
                      <li>request time and date</li>
                      <li>api request frequency in a given duration</li>
                      <li>api request access issues and their frequency</li>
                    </ul>
                    and much more.
                  </label>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
