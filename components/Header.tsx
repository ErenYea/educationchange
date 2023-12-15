import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logout from "./Logout";

type Props = {};

const Header = async (props: Props) => {
  const session = await getServerSession();
  // console.log("session: ", session);
  return (
    <div className="h-[60px] z-40  w-full flex justify-evenly bg-gray-700 top-0 sticky ">
      <div className="w-full pl-4 flex items-center">
        <Image
          src={"/logo.png"}
          width={100}
          height={100}
          alt="logo"
          className="cursor-pointer"
        ></Image>
      </div>
      <div className="flex ">
        <div>
          <Link href={"/signup"}>Sign Up</Link>
        </div>
      </div>
      <div className="w-full flex justify-end pr-4 items-center">
        <div className="mr-4 text-white">
          {session ? session.user?.name : ""}
        </div>
        <div className="bg-blue-600 text-white p-3 rounded-lg transition-all hover:scale-105 ">
          {session ? <Logout /> : <Link href={"/login"}>Login</Link>}
          {/* <Link href={"/login"}>Login</Link> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
