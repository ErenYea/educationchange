"use client";

import React, { useRef } from "react";

const FileUploader = () => {
    
  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="absolute bg-gray-800 p-4 rounded-2xl w-1/3 flex flex-col space-y-6 items-center justify-center left-1/3 top-1/4">

        <div className="text-2xl hover:bg-white/10 rounded-full p-1 cursor-pointer absolute right-4 top-4">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
        </div>

      <h2 className="m-0 text-2xl font-bold border-b border-grey pb-3">
        Add New Brain
      </h2>

      <section className="flex flex-col items-center justify-center w-full gap-10 px-6 py-3 outline-none">
        <div className="flex flex-col items-center w-full max-w-3xl gap-5 sm:flex-row">
          <div className="flex-1 w-full">
            <div className="shadow-md dark:shadow-primary/25 hover:shadow-xl transition-shadow rounded-xl overflow-hidden bg-white dark:bg-black border border-black/10 dark:border-white/25 flex flex-col items-center justify-center h-52">
              <input
                type="file"
                className="hidden"
                ref={inputFileRef}
              />
              <label
                htmlFor="fileInput"
                className="transition-opacity opacity-50 cursor-pointer hover:opacity-100 hover:underline"
                onClick={() => inputFileRef.current?.click()}
              >
                Drag and drop files here, or click to browse
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mb-6">
          <button className="px-8 py-3 text-sm disabled:opacity-80 text-center font-medium rounded-md focus:ring ring-primary/10 outline-none flex items-center justify-center gap-2 bg-black border border-black dark:border-white disabled:bg-gray-500 disabled:hover:bg-gray-500 text-white dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors">
            Upload{" "}
          </button>
        </div>
      </section>
    </div>
  );
};

export default FileUploader;
