import { useEffect, useRef, useState } from "react";

const pricingTable = {
  "Yearly billing": {
    type: "year",
    weekly: "$9.59",
    price: "$499",
    activeUsersCount: {
      value: "10,000",
      overage: "$8 per 1000",
    },
    accessRoles: {
      value: "50",
      overage: "$3 per 10",
    },
    authentications: {
      value: "50,000",
      overage: "$4 per 1000",
    },
    logRetention: "3 months",
    responseTime: "1-hour",
  },
  "Monthly billing": {
    type: "month",
    price: "$49",
    activeUsersCount: {
      value: "2,500",
      overage: "$15 per 1000",
    },
    accessRoles: {
      value: "10",
      overage: "$4 per 10",
    },
    authentications: {
      value: "10,000",
      overage: "$8 per 1000",
    },
    logRetention: "1 month",
    responseTime: "24-hour",
  },
  "Weekly billing": {
    type: "week",
    price: "$9",
    activeUsersCount: {
      value: "500",
      overage: "$2 per 100",
    },
    accessRoles: {
      value: "4",
      overage: "$5 per 10",
    },
    authentications: {
      value: "2,000",
      overage: "$1 per 100",
    },
    logRetention: "1 week",
    responseTime: "48-hour",
  },
};

export const Pricing = () => {
  const [billingType, setBillingType] = useState("Weekly billing");
  const billingRef = useRef();

  useEffect(() => {
    console.log(billingType);
  }, [billingType]);

  const handleBillingClick = (e) => {
    for (let child of billingRef.current.children) {
      child.classList.toggle("active", false);
    }
    e.currentTarget.classList.toggle("active");
    setBillingType(e.currentTarget.innerText);
  };

  return (
    <div className='w-full h-auto py-36 flex flex-col items-center justify-start pt-24 gap-12'>
      <h1 className='w-fit text-8xl font-bold'>
        <span className='block'>Pricing</span>
      </h1>
      <div ref={billingRef} className='w-fit flex flex-row items-center justify-evenly text-sm p-1 font-semibold shadow-inner rounded-lg bg-primary-text/10'>
        <button onClick={handleBillingClick} className='p-4 text-left cursor-pointer active'>
          Weekly billing
        </button>
        <button onClick={handleBillingClick} className='p-4 text-left cursor-pointer'>
          Monthly billing
        </button>
        <button onClick={handleBillingClick} className='p-4 text-left cursor-pointer'>
          Yearly billing
        </button>
      </div>
      <div className='w-full flex lg:flex-row flex-col gap-12 justify-evenly items-center '>
        <div className=' p-10 w-[436px] min-h-[636px] max-w-md flex flex-col items-start justify-between bg-gray-100 shadow-xl rounded-[2rem]'>
          <div className='flex flex-col items-start gap-2'>
            <div className='title text-xl mb-2'>Free</div>
            <div className='title text-5xl font-bold mb-8'>
              $0
              <span className='text-xl'>/{pricingTable[billingType].type}</span>
            </div>
            <div className='features flex flex-col items-center justify-evenly gap-4'>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l6 6 9-13.5' />
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
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l6 6 9-13.5' />
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
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg text-left' href='/'>
                    1000 api authentications per week
                  </a>
                </div>
              </div>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l6 6 9-13.5' />
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
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l6 6 9-13.5' />
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
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l6 6 9-13.5' />
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
          <div className='callToAction w-full h-[40px] bg-gray-400 hover:bg-gray-500 text-background px-8 py-2 rounded-md shadow-md cursor-pointer font-medium '>Signup now</div>
        </div>
        <div className=' p-10 w-[436px] min-h-[636px] max-w-md flex flex-col items-start justify-between bg-primary-light shadow-xl rounded-[2rem] gap-4'>
          <div className='flex flex-col items-start gap-2'>
            <div className='title text-xl mb-2'>Paid</div>
            <div className='title text-5xl font-bold mb-8'>
              {pricingTable[billingType].price}
              <span className='text-xl'>/{pricingTable[billingType].type}</span>
            </div>
            <div className='features flex flex-col items-center justify-evenly gap-4'>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l6 6 9-13.5' />
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
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg text-left' href='/'>
                    {pricingTable[billingType].activeUsersCount.value} <span className='capitalize'>{pricingTable[billingType].type}ly</span> active users
                  </a>
                  <p className='text-xs text-left font-medium text-primary-text/50'>overage usage charge is {pricingTable[billingType].activeUsersCount.overage} active users</p>
                </div>
              </div>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg text-left' href='/'>
                    {pricingTable[billingType].accessRoles.value} access roles and permissions
                  </a>
                  <p className='text-xs text-left font-medium text-primary-text/50'>overage usage charge is {pricingTable[billingType].accessRoles.overage} access role/permissions</p>
                </div>
              </div>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg text-left' href='/'>
                    {pricingTable[billingType].authentications.value} api authentications
                  </a>
                  <p className='text-xs text-left font-medium text-primary-text/50'>overage usage charge is {pricingTable[billingType].authentications.overage} api authentications</p>
                </div>
              </div>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l6 6 9-13.5' />
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
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg text-left' href='/'>
                    {pricingTable[billingType].logRetention} log retention
                  </a>
                </div>
              </div>
              <div className='w-full flex flex-row items-start justify-start gap-4'>
                <h6 className='w-fit'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
                    <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                  </svg>
                </h6>
                <div className='w-fit flex flex-col items-start justify-start'>
                  <a className='w-fit text-lg text-left' href='/'>
                    {pricingTable[billingType].responseTime}, support response time
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='callToAction w-full h-[40px] bg-secondary-medium hover:shadow-md text-background px-8 py-2 rounded-md shadow cursor-pointer font-medium '>Get started today</div>
        </div>
      </div>
    </div>
  );
};
