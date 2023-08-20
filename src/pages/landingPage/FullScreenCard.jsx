import React from "react";

export const FullScreenCard = ({ data: { head, tag, body, imgSrc, button }, style: { backgroundColor, buttonColor } }) => {
  return (
    <div className={`w-full h-screen overflow-hidden bg-[${backgroundColor}] grid grid-rows-2 px-40 py-32 gap-12`}>
      <div className='flex flex-col items-center justify-evenly gap-4 text-primary-text/90'>
        <h1 style={{ textShadow: "1px 1px 4px #00000020" }} className='w-auto text-[3rem] font-bold tracking-[-2px] leading-[3.8rem] '>
          {head.map((h) => (
            <span className='w-fit block'>{h}</span>
          ))}
        </h1>
        {tag.map((t) => (
          <h3 className='w-[26rem] text-[1rem] font-bold lowercase tracking-tight text-center'>{t}</h3>
        ))}
        <p className='w-6/12 text-[1rem] font-normal tracking-tight text-center text-primary-text/80'>{body}</p>
        <div className='transition-all duration-150 h-fit w-fit backdrop-blur-sm hover:bg-white outline-4 outline-primary-dark/0 hover:outline-primary-light outline hover:outline-offset-4 mt-4 rounded-lg'>
          <button className='bg-primary-light font-bold px-8 py-4 rounded-lg text-lg'>{button}</button>
        </div>
      </div>
      <img src={imgSrc} alt='Screenshot of import page' className='max-w-[90%] h-[26rem] m-auto shadow-lg' />
    </div>
  );
};
