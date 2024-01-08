"use server"

import { ZodError, z } from "zod";
import { hash } from "bcrypt";
import db from "./db";

export async function registerUser(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      success: false,
      message: "Please provide an email and password",
    };
  }

  try {
    z.string().email().parse(email);
  } catch (e) {
    return {
      success: false,
      message: "Please provide a valid email",
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
    }
    return {
      success: false,
      message: "Please provide a valid password",
    };
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "An account already exists with this email",
      };
    }

    const hashedPassword = await hash(password, 10);

    await db.user.create({
      data: { email, hashpassword: hashedPassword },
    });

    const newlyCreatedUser = await db.user.findUnique({
      where: { email },
    });

    if (!newlyCreatedUser) {
      return {
        success: false,
        message: "Failed to find the newly created user",
      };
    }

    await db.topic.create({
      data: { userId: newlyCreatedUser.id, name: "Default Brain" },
    });

    return { success: true, message: "New user created" };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Failed to create the user" };
  }
}
