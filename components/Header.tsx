"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createABrain, getAllBrains } from "@/lib/chat";
import { useSession } from "next-auth/react";
import { useNotificationStore } from "@/stores/NotificationStore";
import { useBrainStore } from "@/stores/Brain";

type Props = {};

type Brain = {
  id: string,
  name: string,
  userId: string
}

const Header = (props: Props) => {

  const session = useSession();
  const [showBrainPopup, setShowBrainPopup] = useState<Boolean>(false);
  const [showNewBrainCreator, setShowNewBrainCreator] = useState<Boolean>(false);
  const [newBrainName, setNewBrainName] = useState("")
  const [userBrains, setUserBrains] = useState<Brain[]>([]);
  const { brainName, setBrainName } = useBrainStore();

  const { toggleShowNotification, color, message, setColor, setMessage } = useNotificationStore();

  const hideNotification = () => {
    setTimeout(() => {
      toggleShowNotification();
    }, 5000);
  };

  const showAndHideNotification = () => {
    toggleShowNotification();
    hideNotification();
  };

  const getBrains = async () => {
    const response = await getAllBrains(session.data?.user.id || "");
    setUserBrains(response.data)
    return
  };

  useEffect(() => {
    if (session.data) {
      getBrains();
    }
  }, [session]);

  const createNewBrain = async () => {
    const response = await createABrain(session.data?.user.id || "", newBrainName);

    setColor(response.success ? 'bg-green-500' : 'bg-red-500')
    setMessage(response.message)
    setShowNewBrainCreator(false)
    setNewBrainName("")
    showAndHideNotification()
  }

  return (
    <div className="h-[60px] w-full flex justify-evenly border-b border-b-white/20 top-0 sticky z-50">
      <div className="w-full 2xl:max-w-7xl max-w-6xl flex items-center justify-center">
        <div className="w-full flex space-x-8 items-center">
          <Link
            href={"/"}
            className="flex items-center justify-center space-x-4"
          >
            <Image
              src={"/logo.png"}
              width={50}
              height={80}
              alt="logo"
              className="cursor-pointer"
            ></Image>
            <p className="font-bold text-md">Educated Change</p>
          </Link>
          <div className="flex items-center justify-center space-x-4">
            <div className="group relative">
              <Link href={"/upload"}>Upload</Link>
              <hr className="top-full border border-transparent border-b-primary dark:border-b-white scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform" />
            </div>
            <div className="group relative">
              <Link href={"/chat"}>Chat</Link>
              <hr className="top-full border border-transparent border-b-primary dark:border-b-white scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform" />
            </div>
            <div className="group relative">
              <Link href={"/explore"}>Explore</Link>
              <hr className="top-full border border-transparent border-b-primary dark:border-b-white scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform" />
            </div>
          </div>
        </div>

        <div className="flex sm:flex-1 sm:justify-end flex-col items-center justify-center sm:flex-row gap-5 sm:gap-2">
          <div className="relative px-4 py-2 ml-auto cursor-pointer">

            <Image src="/brain.svg" alt="" layout="fill" onClick={() => setShowBrainPopup(!showBrainPopup)} />

            { showBrainPopup &&
              <div className="absolute flex flex-col p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg w-[300px] -left-[400%] top-[100%] mt-4">
                <div className="flex-1">
                  <div>
                    <div className="flex flex-col w-full">
                      <input
                        className="w-full bg-gray-50 dark:bg-gray-900 px-4 py-2 border rounded-md border-black/10 dark:border-white/25"
                        placeholder="Search for a brain"
                      />
                    </div>
                    <div className="flex flex-col h-48 mt-5 overflow-auto scrollbar">
                      <div className="relative flex flex-col items-center group">
                        {
                          userBrains.map((brain) => (
                            <button key={brain.id} onClick={() => setBrainName(brain.name)} className="flex flex-1 items-center gap-2 w-full text-left p-2 text-sm leading-5 text-gray-900 dark:text-gray-300 hover:bg-gray-100/20">
                              <div className="w-6">
                                {
                                  brain.name === brainName && (
                                    <span className="">
                                      <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 24 24"
                                        className="text-xl transition-opacity"
                                        width="1em"
                                        height="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                                      </svg>
                                    </span>
                                  )
                                }
                              </div>
                              <span className="flex-1">{brain.name}</span>
                            </button>

                          )) 
                        }
                        {/* <div className="absolute right-0 flex flex-row">
                          <button className="text-sm text-center font-medium rounded-md focus:ring ring-primary/10 outline-none flex items-center justify-center gap-2 text-black dark:text-white bg-transparent disabled:opacity-25 group-hover:visible invisible hover:text-red-500 transition-[colors,opacity] p-1">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 24 24"
                              className="text-xl"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path>
                            </svg>{" "}
                          </button>
                          <button className="text-sm text-center font-medium rounded-md focus:ring ring-primary/10 outline-none flex items-center justify-center gap-2 text-black dark:text-white bg-transparent disabled:opacity-25 group-hover:visible invisible hover:text-red-500 transition-[colors,opacity] p-1">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 24 24"
                              className="text-xl"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                            </svg>{" "}
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 self-end flex gap-4">
                  <div
                    className="text-sm disabled:opacity-80 text-center font-medium rounded-md focus:ring ring-primary/10 outline-none flex items-center justify-center gap-2 border border-black dark:border-white bg-white dark:bg-transparent text-black dark:text-white focus:bg-black dark:focus:bg-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black focus:text-white dark:focus:text-black transition-colors py-2 px-4 shadow-none"
                    onClick={() => setShowNewBrainCreator(true)}
                  >
                    Add New Brain
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="text-xl"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                    </svg>{" "}
                  </div>

                </div>
                
                <span className="absolute -top-2 left-[138px] transform rotate-180">
                  <svg className="fill-white stroke-gray-300 stroke-2 block" width="10" height="5" viewBox="0 0 30 10" preserveAspectRatio="none">
                    <polygon points="0,0 30,0 15,10"></polygon>
                  </svg>
                </span>

              </div>
            }

            {showNewBrainCreator && (
              <div className="fixed inset-0 z-50 flex justify-center py-25 overflow-auto cursor-pointer md:z-40 bg-black/50 backdrop-blur-sm">
                <div className="relative w-[90vw] my-auto flex flex-col items-center justify-center space-y-4 h-fit max-w-2xl rounded-xl bg-white dark:bg-[#00121f] border border-black/10 dark:border-white/25 p-10 shadow-xl dark:shadow-primary/50 focus:outline-none cursor-auto">
                  <div
                    className="text-2xl hover:bg-white/10 rounded-full p-1 cursor-pointer absolute right-4 top-4"
                    onClick={() => setShowNewBrainCreator(false)}
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
                  <h2 className="m-0 text-2xl font-bold border-b border-grey">
                    Add New Brain
                  </h2>
                  <p className="">Brain Name</p>
                  <input
                    className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 border-black/10 dark:border-white/25 p-auto"
                    value={newBrainName}
                    onChange={(event) => setNewBrainName(event.target.value)}
                  />
                  <div className="flex justify-between gap-3">
                    <button
                      onClick={createNewBrain}
                      className="disabled:opacity-80 text-center font-medium focus:ring ring-primary/10 outline-none gap-2 dark:border-white text-black dark:text-white focus:bg-black dark:focus:bg-white dark:hover:bg-white dark:hover:text-black focus:text-white dark:focus:text-black transition-colors z-20 flex items-center grow justify-center px-4 py-2 text-xl bg-white border rounded-lg shadow-lg align-center border-primary dark:bg-black hover:text-white hover:bg-black top-1"
                    >
                      <p>Create +</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          <Link href={"/settings"}>
            <div className="text-center font-medium rounded-md focus:ring ring-primary/10 outline-none flex items-center justify-center gap-2 transition-opacity text-black dark:text-white bg-transparent py-2 px-4 disabled:opacity-25 focus:outline-none text-2xl">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
              </svg>{" "}
            </div>
          </Link>

          <Link href={"/user"}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="text-2xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
