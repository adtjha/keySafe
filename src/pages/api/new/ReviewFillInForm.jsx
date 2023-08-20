import React from "react";

export function ReviewFillInForm(reviewData, data) {
  return (
    <div ref={reviewData} className='relative w-4/5 pt-8 flex flex-col items-start space-y-4 text-left rounded-br-2xl'>
      <h1 className='w-[520px] h-auto overflow-hidden text-primary-text/40 text-xl font-bold uppercase'>your APi</h1>
      <div className='w-[520px] h-auto overflow-hidden  flex flex-wrap items-stretch justify-between gap-4'>
        {Object.entries(data).map(([key, value]) => {
          if (["createdAt", "lastKeyRegenerate", "lastSecretRegenerate"].includes(key)) {
            value = new Date(value["seconds"] * 1000).toUTCString();
          } else if (!value) {
            value = "-";
          }
          // console.log(key, value);
          if (key === "sample_secret" && !data.security) {
            return <></>;
          } else {
            return (
              <div key={key} className='group relative w-auto flex-grow flex flex-col items-start p-4 font-mono text-primary-text bg-primary-light-30 rounded-md cursor-pointer'>
                <h1 className='text-primary-text-60 tracking-wider text-xs uppercase font-sans'>
                  {key
                    .split(/(?=[A-Z])/)
                    .map((s) => s.toLowerCase())
                    .join(" ")}
                </h1>
                <h3 className='break-all text-primary-text group-hover:font-bold text-left group-hover:underline'>{String(value)}</h3>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
