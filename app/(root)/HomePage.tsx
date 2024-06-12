import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="home">
      <h1 className="home-heading">Explore. Create. Amaze.</h1>

      <ul className="flex-center w-full gap-20">
        {navLinks.slice(1, 5).map(({ route, label, icon }) => (
          <Link key={route} href={route} className="flex-center flex-col gap-2">
            <li className="flex-center w-fit rounded-full bg-white p-4">
              <Image src={icon} alt={label} width={24} height={24} />
            </li>
            <p className="p-14-medium text-center">{label}</p>
          </Link>
        ))}
      </ul>
    </main>
  );
}
