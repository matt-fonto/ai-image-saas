"use server";

import db from "@/lib/db";
import {
  CreateUserSchema,
  UpdateUserSchema,
  UpdateUserType,
} from "@/lib/schemas/user.schema";
import { handleError } from "@/lib/utils/handleError";
import { hash } from "bcrypt";

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const { password: _, ...userData } = user;

    return userData;
  } catch (error) {
    handleError(error);
  }
}

export async function createUser(_state: unknown, body: unknown) {
  try {
    const result = CreateUserSchema.safeParse(body);
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
    handleError(error);
  }
}

export async function updateUser(_state: unknown, body: unknown) {
  try {
    const result = UpdateUserSchema.safeParse(body);
    const { data, error } = result;

    if (!data || error) {
      return {
        user: null,
        error: "Invalid data",
      };
    }

    const { id, email, password, username } = data;

    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return {
        user: null,
        error: "User not found",
      };
    }

    const updatedData: UpdateUserType = {
      id: user.id,
      email: email ?? user.email,
      username: username ?? user.username,
      password: password ? await hash(password, 10) : user.password,
    };

    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: updatedData,
    });

    const { password: _, ...userData } = updatedUser;

    return {
      user: userData,
      error: null,
    };
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(_state: unknown, id: number) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return {
        user: null,
        error: "User not found",
      };
    }

    await db.user.delete({
      where: {
        id,
      },
    });

    const { password: _, ...userData } = user;

    return {
      user: userData,
      error: null,
    };
  } catch (error) {
    handleError(error);
  }
}
