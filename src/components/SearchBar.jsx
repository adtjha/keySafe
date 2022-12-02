import React from "react";

export const SearchBar = ({ placeholder }) => {
  return (
    <div className='w-full mb-4'>
      <form className='flex items-center'>
        <label htmlFor='simple-search' className='sr-only'>
          Search
        </label>
        <div className='relative w-full'>
          <div className='flex absolute inset-y-0 right-0 items-center p-3 cursor-pointer rounded-tr-lg rounded-br-lg'>
            <svg
              aria-hidden='true'
              className='w-5 h-5 hover:text-primary-text text-primary-text/40 cursor-pointer'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <input
            type='text'
            id='simple-search'
            className='pl-4 font-medium bg-primary-light-30 text-primary-text placeholder-primary-text-60 text-sm rounded-lg border-transparent focus:ring-primary-text focus:border-primary-dark block w-full p-3'
            placeholder={placeholder ? placeholder : "Search"}
            required=''
          />
        </div>
      </form>
    </div>
  );
};
