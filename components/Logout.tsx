"use client";

import { signOut } from "next-auth/react";

type Props = {};

const Logout = (props: Props) => {
  const logout = async () => {
    signOut();
  };
  return (
    <div onClick={logout} className="cursor-pointer">
      Logout
    </div>
  );
};

export default Logout;
