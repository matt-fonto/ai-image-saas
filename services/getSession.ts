import { getServerSession } from "next-auth";

export async function getSession() {
  const session = await getServerSession();

  return session;
}
