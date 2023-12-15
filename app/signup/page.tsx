import React from "react";
import Form from "./form";

type Props = {};

const SignUp = (props: Props) => {
  return (
    <div className="flex h-screen w-full items-center bg-gray-200 flex-col">
      <div className="text-3xl font-semibold text-black">Sign Up</div>
      <div className="max-w-md mx-auto h-fit mt-6  p-6 px-12 gap-6 bg-white rounded-lg shadow-lg">
        <Form />
      </div>
    </div>
  );
};

export default SignUp;
