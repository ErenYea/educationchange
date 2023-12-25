"use server";

import { ZodError, z } from "zod";
import { hash } from "bcrypt";
import db from "./db";

export async function registerUser(prevState: any, formData: FormData) {
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
        message: "Password must contain at least 8 characters",
      };
    } else {
      console.error("An unexpected error occurred", err);
    }
    return {
      success: false,
      message: "Please Provide valid password",
    };
  }
  const hashedPassword = await hash(password, 10);
  try {
    await db.user.create({
      data: { email: email, hashpassword: hashedPassword },
    });

    return { success: true, message: "Created the new user" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "An account already exists on this email" };
  }
}
