import React from "react";

export function FillInForm(handleChange, data) {
  return (
    <form className='w-full pt-8 flex flex-col items-center space-y-8 border-r-4 border-primary-text pb-24'>
      <h1 className='w-4/5 text-start text-primary-text/40 text-xl font-bold uppercase'>Fill in Api Details</h1>
      <div className='m-8 bg-stone-200 rounded-md py-8 flex flex-col items-center space-y-8'>
        <div className='w-4/5 flex flex-col items-start justify-center space-y-2'>
          <label className='text-sm font-medium uppercase'>endpoint url</label>
          <input type={"text"} onChange={handleChange} name='url' id='url' className='w-full py-3 px-6 border-transparent focus:ring-primary-text focus:border-primary-dark bg-primary-light-30 rounded-md' value={data.url} />
        </div>
        <div className='w-4/5 flex flex-col items-start justify-center space-y-2'>
          <label className='font-medium uppercase'>endpoint name</label>
          <input type={"text"} onChange={handleChange} name='name' id='name' className='w-full py-3 px-6 border-transparent focus:ring-primary-text focus:border-primary-dark bg-primary-light-30 rounded-md' value={data.name} />
        </div>
        <div className='w-4/5 flex flex-col items-start justify-center space-y-2'>
          <label className='font-medium uppercase'>api key prefix</label>
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
            <input onChange={handleChange} name='security' id='security' type={"checkbox"} className='border border-primary-text text-primary-text focus:ring-primary-text rounded' value={data.security} defaultChecked={data.security} />
            <label htmlFor='security' className='font-medium uppercase'>
              is api security required
            </label>
          </div>
          <label className='text-left text-sm text-primary-text'>
            API Endpoint is provided with a secret key, which is available only once at the time generation. It makes the api secure to use in a backend environment, and do tasks that are require high level of security.
          </label>
        </div>
        <div className='w-4/5 flex flex-col items-start justify-start space-y-2'>
          <div className='w-4/5 flex flex-row items-center justify-start space-x-2'>
            <input onChange={handleChange} name='analytics' id='analytics' type={"checkbox"} className='border border-primary-text text-primary-text focus:ring-primary-text rounded' value={data.analytics} defaultChecked={data.analytics} />
            <label htmlFor='analytics' className='font-medium uppercase'>
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
      </div>
    </form>
  );
}
