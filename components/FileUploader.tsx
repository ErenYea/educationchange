import React from "react";

const FileUploader = () => {
  return (
    <div className="absolute bg-gray-800 p-4 rounded-2xl w-1/3 flex flex-col items-center justify-center left-1/3 top-1/4">
      <h2 className="m-0 text-2xl font-bold border-b border-grey pb-3">
        Add New Brain
      </h2>

      <section className="flex flex-col items-center justify-center w-full gap-10 px-6 py-3 outline-none">
        <div className="flex flex-col items-center w-full max-w-3xl gap-5 sm:flex-row">
          <div className="flex-1 w-full">
            <div className="shadow-md dark:shadow-primary/25 hover:shadow-xl transition-shadow rounded-xl overflow-hidden bg-white dark:bg-black border border-black/10 dark:border-white/25 flex flex-col items-center justify-center h-52">
              <input type="file" className="" />
              <div className="flex flex-col items-center w-full max-w-sm gap-5 p-6 text-center">
                <button className="h-full transition-opacity opacity-50 cursor-pointer hover:opacity-100 hover:underline">
                  Drag and drop files here, or click to browse
                </button>
              </div>
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
