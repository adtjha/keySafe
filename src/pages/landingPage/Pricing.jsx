export const Pricing = () => {
  return (
    <div className='w-full h-auto py-36 flex flex-col items-center justify-start pt-24 gap-12'>
      <h1 className='w-fit text-8xl font-bold'>
        <span className='block'>Pricing</span>
      </h1>
      <div className='w-full flex flex-row justify-evenly items-center '>
        <div className=' p-10 w-[436px] h-[636px] max-w-md flex flex-col items-start justify-between bg-gray-100 shadow-xl rounded-[2rem]'>
          <div className='flex flex-col items-start gap-2'>
            <div className='title text-xl mb-2'>Free</div>
            <div className='title text-5xl font-bold mb-8'>
              $0<span className='text-xl'>/week</span>
            </div>
            <div className='features flex flex-col items-center justify-evenly gap-4'>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg ' href='/'>
                    2 api endpoints
                  </a>
                </div>
              </div>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg ' href='/'>
                    10 weekly active users
                  </a>
                </div>
              </div>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg text-left' href='/'>
                    300 api authentications per week
                  </a>
                </div>
              </div>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg ' href='/'>
                    basic analytics
                  </a>
                </div>
              </div>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg text-left' href='/'>
                    1-day log retention
                  </a>
                </div>
              </div>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg text-left' href='/'>
                    48-hour, support response time
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='callToAction w-full h-[40px] bg-gray-400 hover:bg-gray-500 text-background  mt-12 px-8 py-2 rounded-md shadow-md cursor-pointer font-medium '>
            Signup now
          </div>
        </div>
        <div className=' p-10 w-[436px] h-[632px] max-w-md flex flex-col items-start justify-between bg-primary-light shadow-xl rounded-[2rem]'>
          <div className='flex flex-col items-start gap-2'>
            <div className='title text-xl mb-2'>Paid</div>
            <div className='title text-5xl font-bold mb-8'>
              $9<span className='text-xl'>/week</span>
            </div>
            <div className='features flex flex-col items-center justify-evenly gap-4'>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg text-left' href='/'>
                    unlimited api endpoints
                  </a>
                </div>
              </div>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg text-left' href='/'>
                    2,000 weekly active users
                  </a>
                  <p className='text-xs text-left font-medium text-primary-text/50'>
                    overage usage charge is $0.01 per active user
                  </p>
                </div>
              </div>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg text-left' href='/'>
                    10 access roles and permissions
                  </a>
                  <p className='text-xs text-left font-medium text-primary-text/50'>
                    overage usage charge is $0.5 per access role/permission
                  </p>
                </div>
              </div>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg text-left' href='/'>
                    1,000 api authentications
                  </a>
                  <p className='text-xs text-left font-medium text-primary-text/50'>
                    overage usage charge is $0.02 per api authentication
                  </p>
                </div>
              </div>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg text-left' href='/'>
                    api analytics, generate custom reports
                  </a>
                </div>
              </div>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg text-left' href='/'>
                    1 week log retention
                  </a>
                </div>
              </div>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    class='w-6 h-6'>
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg text-left' href='/'>
                    1-hour, support response time
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='callToAction w-full h-[40px] bg-secondary-medium hover:shadow-md text-background mt-12 px-8 py-2 rounded-md shadow cursor-pointer font-medium '>
            Get started today
          </div>
        </div>
      </div>
    </div>
  );
};
