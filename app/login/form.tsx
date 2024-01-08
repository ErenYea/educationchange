"use client";

import { loginUser } from "@/lib/loginUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export type State = {
  success: boolean;
  message: string;
};

const initialState = {
  success: false,
  message: "",
};

type Props = {};
function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      className="px-8 py-3 text-sm disabled:opacity-80 text-center font-medium rounded-md focus:ring ring-primary/10 outline-none flex items-center justify-center gap-2 bg-black border border-black dark:border-white disabled:bg-gray-500 disabled:hover:bg-gray-500 text-white dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
      disabled={pending}
    >
      {" "}
      {pending ? "Verifying..." : "Login"}
    </button>
  );
}
const Form = (props: Props) => {
  const [state, formAction] = useFormState(loginUser, initialState);
  const router = useRouter();
  const { pending } = useFormStatus();
  useEffect(() => {
    if (state.success) {
      router.push("/");
      router.refresh();
    }
  }, [state?.success]);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <form
      action={formAction}
      className="flex flex-col items-center justify-center w-full h-full gap-6"
    >
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full bg-gray-50 dark:bg-gray-900 px-4 py-2 border rounded-md border-black/10 dark:border-white/25"
        required
      />
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          className="w-full bg-gray-50 dark:bg-gray-900 px-4 py-2 border rounded-md border-black/10 dark:border-white/25"
          required
        />
        <div className="cursor-pointer absolute right-4 top-3">
          {showPassword ? (
            <FaEyeSlash onClick={togglePasswordVisibility} />
          ) : (
            <FaEye onClick={togglePasswordVisibility} />
          )}
        </div>
      </div>
      <Submit />
      {pending
        ? ""
        : !state?.success && (
            <p className="italic text-sm text-red-500">{state?.message}</p>
          )}
      <Link href={"/signup"}> Don&apos;t have an account? Sign up </Link>
    </form>
  );
};

export default Form;
