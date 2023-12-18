import React from "react";
import Link from "next/link";

type Props = {};

const Chat = (props: Props) => {
  return (
    <div className="flex flex-col items-center pt-20 h-screen">
      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl font-bold text-center">Upload Knowledge</p>
        <p className="opacity-50 text-center">
          Text, document, spreadsheet, presentation and URLs supported
        </p>
      </div>

      <div className="text-sm cursor-pointer disabled:opacity-80 text-center font-medium rounded-md focus:ring ring-primary/10 outline-none flex items-center justify-center gap-2 border border-black dark:border-white bg-white dark:bg-[#00121f] text-black dark:text-white focus:bg-[#00121f] dark:focus:bg-white hover:bg-[#00121f] dark:hover:bg-white hover:text-white dark:hover:text-black focus:text-white dark:focus:text-black transition-colors py-2 px-4 shadow-none m-auto my-10 w-[15%]">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          className="text-xl h-[50px] w-[50px]"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.944 11.112C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5h11c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888zM13 14v3h-2v-3H8l4-5 4 5h-3z"></path>
        </svg>{" "}
      </div>

      <div className="flex items-center justify-center m-5">
        <hr className="border-t border-gray-300 w-12" />
        <p className="px-3 text-center text-gray-500 dark:text-white">or</p>
        <hr className="border-t border-gray-300 w-12" />
      </div>

      <div className="w-full">
        <div className="flex justify-center gap-5 px-6">
          <div className="max-w-xl w-full">
            <div className="flex-col justify-center gap-5">
              <div className="shadow-md dark:shadow-primary/25 hover:shadow-xl transition-shadow rounded-xl overflow-hidden bg-white dark:bg-[#00121f] border border-black/10 dark:border-white/25 h-32 flex gap-5 justify-center items-center px-5">
                <div className="text-center max-w-sm w-full flex flex-col gap-5 items-center">
                  <div className="flex flex-col w-full">
                    <input
                      className="w-full bg-gray-50 dark:bg-gray-900 px-4 py-2 border rounded-md border-black/10 dark:border-white/25"
                      placeholder="Insert website URL"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-5">
                  <button className="px-8 py-3 text-sm disabled:opacity-80 text-center font-medium rounded-md focus:ring ring-primary/10 outline-none flex items-center justify-center gap-2 bg-[#00121f] border border-black dark:border-white disabled:bg-gray-500 disabled:hover:bg-gray-500 text-white dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors">
                    Crawl{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 mt-5">
        <Link href={"/chat"}>
          <button className="text-sm disabled:opacity-80 text-center font-medium rounded-md focus:ring ring-primary/10 outline-none flex items-center justify-center gap-2 border border-black dark:border-white bg-white dark:bg-[#00121f] text-black dark:text-white focus:bg-[#00121f] dark:focus:bg-white hover:bg-[#00121f] dark:hover:bg-white hover:text-white dark:hover:text-black focus:text-white dark:focus:text-black transition-colors px-4 shadow-none py-3">
            Chat{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Chat;
