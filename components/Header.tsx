import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logout from "./Logout";

type Props = {};

const Header = async (props: Props) => {
  const session = await getServerSession();
  return (
    <div className="h-[60px] z-40  w-full flex justify-evenly border-b border-b-white/20 top-0 sticky">
      <div className="max-w-7xl flex flex-1 items-center justify-center">
        <div className="w-full flex space-x-4 items-center">
          <Link href={"/"} className="flex items-center justify-center space-x-4">
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
          <div className="relative px-4 py-2 ml-auto">
            <button
              type="button"
              className="flex items-center focus:outline-none"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:r0:"
              data-state="closed"
            >
              <Image src="/brain.svg" alt="" layout="fill" />
            </button>
          </div>
          <Link href={"/settings"}>
            <button
              className="text-center font-medium rounded-md focus:ring ring-primary/10 outline-none flex items-center justify-center gap-2 transition-opacity text-black dark:text-white bg-transparent py-2 px-4 disabled:opacity-25 focus:outline-none text-2xl"
              aria-label="Settings"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
              </svg>{" "}
            </button>
          </Link>
          <Link href={"/user"}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
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

          {/* <button
            className="text-center font-medium rounded-md focus:ring ring-primary/10 outline-none flex items-center justify-center gap-2 transition-opacity text-black dark:text-white bg-transparent py-2 px-4 disabled:opacity-25 focus:outline-none text-3xl"
            aria-label="toggle dark mode"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"></path>
            </svg>{" "}
          </button> */}

        </div>

      </div>
    </div>
  );
};

export default Header;
