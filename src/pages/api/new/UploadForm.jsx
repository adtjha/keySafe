import React from "react";
import Editor from "@monaco-editor/react";

export function UploadForm(handleFileUpload, yamlData) {
  return (
    <div className='w-full pt-8 flex flex-col items-center space-y-8 pb-24'>
      <div className='w-4/5 flex flex-col items-start justify-center space-y-2'>
        <div className='m-auto flex flex-row items-center justify-center gap-2'>
          <label htmlFor='apiFile' className='flex flex-row items-start justify-center gap-1'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'>
              <path stroke-linecap='round' stroke-linejoin='round' d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>{" "}
            upload api documentation
          </label>
          <input type='file' onChange={handleFileUpload} name='apiFile' id='apiFile' />
        </div>
        {yamlData ? <Editor height={"auto"} defaultLanguage={"json"} theme={"vs-code"} defaultValue={JSON.stringify(yamlData, null, 2)} value={JSON.stringify(yamlData, null, 2)} /> : <></>}
      </div>
    </div>
  );
}
