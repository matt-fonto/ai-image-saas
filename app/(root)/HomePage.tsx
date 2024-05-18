import { getSession } from "@/services/getSession";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { SignOutBtn } from "@/components/SignOutButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <SignOutBtn />
    </div>
  );
}
