import { ZodError, z } from "zod";

import { signIn } from "next-auth/react";

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      success: false,
      message: "Please Provide email and password",
    };
  }
  try {
    z.string().email().parse(email);
  } catch (e) {
    return {
      success: false,
      message: "Please Provide valid email",
    };
  }
  try {
    z.string().min(8).max(20).parse(password);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return {
        success: false,
        message: err.errors[0].message,
      };
    } else {
      console.error("An unexpected error occurred", err);
    }
    return {
      success: false,
      message: "Please Provide valid password",
    };
  }

  const response = await signIn("credentials", {
    email: email,
    password: password,
    redirect: false,
  });
  if (response?.status == 200) {
    return {
      success: true,
      message: "Successfully logged in",
    };
  } else if (response?.status == 401) {
    return { success: false, message: "Invalid credentials" };
  }
  return { success: false, message: "Something went wrong" };
}
