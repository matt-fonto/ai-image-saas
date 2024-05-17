"use server";

export async function createUser(_state: unknown, newUser: unknown) {
  console.log("newUser", newUser);
  return newUser;
}
