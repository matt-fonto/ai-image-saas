import { getSession } from "@/services/getSession";
import { redirect } from "next/navigation";

// shift + . => increases youtuve speed by 0.25
// shift + , => decreases youtube speed by 0.25

export default async function Home() {
  // const session = await getServerSession(authOptions);
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <main></main>;
}
