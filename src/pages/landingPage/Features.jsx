import React from "react";
import importPage from "../../images/Import_API_page.png";

export const Features = () => {
  return (
    <React.Fragment>
      <div className='w-full h-screen overflow-hidden bg-[#e8fff7] flex flex-row items-center justify-start px-40 py-32 gap-12'>
        <div className='flex flex-col items-start justify-start gap-2 text-primary-text/90'>
          <h1
            style={{ textShadow: "1px 1px 4px #00000020" }}
            className='w-[26rem] text-7xl font-bold tracking-[-4px] leading-[3.8rem] '>
            <span className='w-fit block'>max out your</span>
            <span className='w-fit block'>api potential.</span>
          </h1>
          <h3 className='w-[26rem] text-3xl font-bold lowercase tracking-tight text-left'>
            Take Your API Calls to the Next Level using analytics
          </h3>
          <p className='w-[26rem] text-xl font-normal tracking-tight mt-4 text-left text-primary-text/80'>
            Know what's working and what's not, set custom meta tags for your
            analytics and easily manage user accesses. Sharing your API with
            your partners and customers is now easier than ever. Create, edit
            and delete meta tags in real time. Get a detailed analytics report
            for each of your endpoint at the click of a button.
          </p>
          <button className='bg-primary-light text-primary-text font-bold mt-8 px-8 py-4 rounded-2xl text-lg hover:underline'>
            Try for a week now.
          </button>
        </div>
        <img
          src={importPage}
          alt='Screenshot of import page'
          className='max-w-[90%] shadow-lg'
        />
      </div>
      <div className='w-full h-screen overflow-hidden bg-[aliceblue] flex flex-row items-center justify-start px-40 py-32 gap-12'>
        <div className='flex flex-col items-start justify-start gap-2 text-primary-text/90'>
          <h1
            style={{ textShadow: "1px 1px 4px #00000020" }}
            className='w-[26rem] text-7xl font-bold tracking-[-4px] leading-[3.8rem] '>
            <span className='w-fit block'>effortless</span>
            <span className='w-fit block'>credential</span>
            <span className='w-fit block'>management.</span>
          </h1>
          <h3 className='w-[26rem] text-3xl font-bold lowercase tracking-tight text-left'>
            Simplify API access and management with keysafe
          </h3>
          <p className='w-[26rem] text-xl font-normal tracking-tight mt-4 text-left text-primary-text/80'>
            Our API authentication solution enables developers to create
            applications that can focus on creating, rather than managing user
            credentials. You want to know how your API is doing. You want to
            edit access rights easily and quickly. You don't want to integrate
            manual editing. We got it all covered.
          </p>
          <button className='bg-primary-light text-primary-text font-bold mt-8 px-8 py-4 rounded-2xl text-lg hover:underline'>
            Try for a week now.
          </button>
        </div>
        <img
          src={importPage}
          alt='Screenshot of import page'
          className='max-w-[90%] shadow-lg'
        />
      </div>
      <div className='w-full h-screen overflow-hidden bg-[#f0ebfa] flex flex-row items-center justify-start px-40 py-32 gap-12'>
        <div className='flex flex-col items-start justify-start gap-2 text-primary-text/90'>
          <h1
            style={{ textShadow: "1px 1px 4px #00000020" }}
            className='w-[26rem] text-7xl font-bold tracking-[-4px] leading-[3.8rem] '>
            <span className='w-fit block'>quick</span>
            <span className='w-fit block'>integration.</span>
          </h1>
          <h3 className='w-[26rem] text-3xl font-bold lowercase tracking-tight text-left'>
            <span className='block'>go live within minutes</span>
            <span className='block'>not days</span>
          </h3>
          <p className='w-[26rem] text-xl font-normal tracking-tight mt-4 text-left text-primary-text/80'>
            With minimal integration and setup, you can quickly and easily
            manage API access tokens and users, track the performance of your
            APIs, and share them with partners and customers.
          </p>
          <button className='bg-primary-light text-primary-text font-bold mt-8 px-8 py-4 rounded-2xl text-lg hover:underline'>
            Try for a week now.
          </button>
        </div>
        <img
          src={importPage}
          alt='Screenshot of import page'
          className='max-w-[90%] shadow-lg'
        />
      </div>
    </React.Fragment>
  );
};
