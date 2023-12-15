"use client";

import { registerUser } from "@/lib/registerUser";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

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
      className=" p-3 bg-blue-500 rounded-lg text-white hover:scale-105 transition-all "
      disabled={pending}
    >
      {" "}
      {pending ? "Signing Up..." : "Sign Up"}
    </button>
  );
}
const Form = (props: Props) => {
  const [state, formAction] = useFormState(registerUser, initialState);
  const router = useRouter();
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state?.success) {
      router.push("/login");
      router.refresh();
    }
  }, [state?.success]);
  return (
    <form
      action={formAction}
      className="flex flex-col items-center justify-center w-full h-full gap-6 "
    >
      <input
        type="email"
        name="email"
        placeholder="Email"
        className=" outline-none decoration-slate-100 border rounded-lg p-2 text-gray-400"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className=" outline-none decoration-slate-100 border rounded-lg p-2 text-gray-400"
        required
      />
      <Submit />
      {pending
        ? ""
        : !state?.success && (
            <p className="italic text-sm text-red-500">{state?.message}</p>
          )}
    </form>
  );
};

export default Form;
