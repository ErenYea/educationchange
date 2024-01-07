"use client";

import React, { useEffect, useState } from "react";
import { getUploadedData } from "@/lib/chat";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useBrainStore } from "@/stores/Brain";

const Page = () => {
  
  const session = useSession();
  const [content, setContent] = useState<{ [key: string]: string } | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [loading, setLoading] = useState(true)
  const { brainName } = useBrainStore();

  const getContent = async () => {
    const response = await getUploadedData(session.data?.user.email || "", brainName);
    console.log(response)
    if (response.success) {
      if (!response.data.error) {
        setContent(response.data);
      }
    }
    setLoading(false)
    return
  };

  useEffect(() => {
    if (session.data) {
      getContent();
    }
  }, [session]);

  const showDetails = (topicName: string) => {
    setSelectedTopic(topicName === selectedTopic ? null : topicName);
  };

  return (
    <section className="w-full h-screen outline-none pt-10 flex flex-col gap-5 items-center p-6">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">
          Explore uploaded data
        </h1>
        <h2 className="opacity-50">
          View or delete stored data used by your brain
        </h2>
      </div>
      <div className="w-full max-w-3xl flex flex-col gap-5 overflow-y-auto max-h-[80%] px-10">
        <div className="flex flex-col items-center justify-center gap-4">
          { loading ? 
            <div className="flex justify-center space-x-4 items-center overflow-hidden">
              <div>Fetching your data...</div>
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
            :
            content ? (
              Object.entries(content).map(([name, value]) => (
                <div key={name} className="shadow-md dark:shadow-primary/25 hover:shadow-xl transition-shadow rounded-xl overflow-hidden bg-white dark:bg-[#00121f] border border-black/10 dark:border-white/25 flex flex-col sm:flex-row sm:items-center justify-between w-full p-5 gap-5">
                  <span className="truncate"
                  >
                    { name }
                  </span>
                  <div className="flex gap-2">
                    <div
                      onClick={() => showDetails(name)}
                      className="px-8 py-3 text-sm disabled:opacity-80 text-center font-medium rounded-md focus:ring ring-primary/10 outline-none flex items-center justify-center gap-2 bg-[#00121f] border border-black dark:border-white disabled:bg-gray-500 disabled:hover:bg-gray-500 text-white dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-400 transition-colors cursor-pointer"
                    >
                      View{" "}
                    </div>
                    <div
                      className="px-8 py-3 text-sm disabled:opacity-80 text-center font-medium rounded-md focus:ring ring-primary/10 outline-none flex items-center justify-center gap-2 border border-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                    >
                      Delete{" "}
                    </div>
                  </div>
                  { selectedTopic === name && (
                    <div className="fixed inset-0 z-50 flex justify-center py-25 overflow-auto cursor-pointer md:z-40 bg-black/10 backdrop-blur-sm">
                      <div className="relative w-1/2 h-1/2 my-auto flex flex-col items-center justify-center space-y-4 max-w-2xl rounded-xl bg-white dark:bg-[#00121f] border border-black/10 dark:border-white/25 px-6 pb-6 pt-12 shadow-xl dark:shadow-primary/50 focus:outline-none cursor-auto">
                        <div
                          className="text-2xl hover:bg-white/10 rounded-full p-1 cursor-pointer absolute right-4 top-4"
                          onClick={() => showDetails('')}
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                          </svg>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200 border-b-2">
                            { name }
                          </h2>
                        </div>
                        <div className="w-full h-full overflow-y-auto text-justify px-4">
                          { value }
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : 
            (
              <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-center">Oh No, Your Brain is empty.</p><a href="/upload">
                  <Link href={'/upload'} className="px-8 py-3 text-sm disabled:opacity-80 text-center font-medium rounded-md focus:ring ring-primary/10 outline-none flex items-center justify-center gap-2 bg-black border border-black dark:border-white disabled:bg-gray-500 disabled:hover:bg-gray-500 text-white dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"> Upload </Link>
                  </a>
              </div>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default Page;
