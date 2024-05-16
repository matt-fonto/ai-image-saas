import { getSession } from "@/services/getSession";
import { redirect } from "next/navigation";

export default function Home() {
  const session = getSession();

  if (!session) {
    redirect("/login");
  }

  return <div>page</div>;
}
