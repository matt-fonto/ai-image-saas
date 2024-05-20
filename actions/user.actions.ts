"use server";

import db from "@/lib/db";
import { SignUpSchema } from "@/schemas/signup.schema";
import { hash } from "bcrypt";

export async function createUser(_state: unknown, body: unknown) {
  try {
    const result = SignUpSchema.safeParse(body);
    const { data, error } = result;

    if (!data || error) {
      return {
        user: null,
        error: "Invalid data",
      };
    }

    const { email, password, username } = data;

    const userByEmail = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (userByEmail) {
      return {
        user: null,
        error: "User already exists",
      };
    }

    const userByUsername = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (userByUsername) {
      return {
        user: null,
        error: "Username already exists",
      };
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return {
      user,
      error: null,
      status: 201,
    };
  } catch (error) {
    return {
      user: null,
      error: "An error occurred",
    };
  }
}
