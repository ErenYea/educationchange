import React from "react";

type Props = {};

const Chat = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center pt-20 h-screen w-full">
      <section className="flex flex-col flex-1 items-center w-full max-w-7xl h-full min-h-[70vh]">
        <div className="flex items-center justify-center w-full">
          <h1 className="text-3xl font-bold text-center w-3/4">
            <div>
              <span>
                Chat with your Digital Twin -{" "}
                <span className="text-purple-500">Default brain</span>{" "}
              </span>
            </div>
            <div>
              Upload files in a <span className="text-purple-500">brain</span>{" "}
              and chat with them
            </div>
          </h1>
          <div className="flex items-center justify-between">
            <button className="text-sm text-center font-medium rounded-md focus:ring ring-primary/10 outline-none flex items-center justify-center gap-2 text-black dark:text-white bg-transparent disabled:opacity-25 gap-x-10 group-hover:visible hover:text-red-500 transition-[colors,opacity] p-1">
              <p className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-center text-white transition-colors bg-black border border-black rounded-md outline-none disabled:opacity-80 focus:ring ring-primary/10 dark:border-white disabled:bg-gray-500 disabled:hover:bg-gray-500 dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 sm:px-4 sm:py-2">
                Share
              </p>{" "}
            </button>
            <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-center text-white transition-colors bg-black border border-black rounded-md outline-none disabled:opacity-80 focus:ring ring-primary/10 dark:border-white disabled:bg-gray-500 disabled:hover:bg-gray-500 dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 sm:px-4 sm:py-2">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0v1.829Zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707L14 2.707ZM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707L7.293 4Zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1h1.829Zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1h1.829ZM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707L13.293 10ZM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0v1.829Zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0L8.354 9.06Z"></path>
              </svg>
              Customize
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col mt-8 w-full shadow-md dark:shadow-primary/25 hover:shadow-xl transition-shadow rounded-xl overflow-hidden bg-white dark:bg-[#00121f] border border-black/10 dark:border-white/25 p-12 pt-10 max-h-[70vh]">
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex flex-col flex-1 overflow-y-auto">
              <div
                className="text-center opacity-50"
              >
                Ask a question, or describe a task.
              </div>
            </div>
          </div>
          <div className="flex items-center w-full justify-center">
            <textarea
              className="bg-[#00121f] p-4 border border-black/10 dark:border-white/25 rounded-xl w-full max-h-[55vh] min-h-[8vh] overflow-y-auto focus:outline-none"
              rows={2}
            />
          </div>


        </div>
      </section>
    </div>
  );
};

export default Chat;
