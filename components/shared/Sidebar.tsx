"use client";
import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { SignOutBtn } from "../SignOutButton";
import App from "next/app";

export function Sidebar() {
  const session = useSession();
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link className="sidebar-logo" href="/">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>

        <nav className="sidebar-nav">
          {session.status === "authenticated" ? (
            <>
              <ul className="sidebar-nav_elements">
                {navLinks
                  .filter(({ isAdministrative }) => !isAdministrative)
                  .map(({ icon, label, route }) => {
                    const isActive = route === pathname;
                    return (
                      <li
                        key={route}
                        className={cn(
                          "sidebar-nav_element group text-gray-600",
                          {
                            "bg-purple-gradient text-white": isActive,
                          }
                        )}
                      >
                        <Link href={route} className="sidebar-link">
                          <Image
                            src={icon}
                            alt="logo"
                            width={24}
                            height={24}
                            className={cn({
                              isActive: "brightness-200",
                            })}
                          />
                          {label}
                        </Link>
                      </li>
                    );
                  })}
              </ul>

              <ul className="sidebar-nav_elements">
                {navLinks
                  .filter(({ isAdministrative }) => isAdministrative)
                  .map(({ icon, label, route }) => {
                    const isActive = route === pathname;
                    return (
                      <li
                        key={route}
                        className={cn(
                          "sidebar-nav_element group text-gray-600",
                          {
                            "bg-purple-gradient text-white": isActive,
                          }
                        )}
                      >
                        <Link href={route} className="sidebar-link">
                          <Image
                            src={icon}
                            alt="logo"
                            width={24}
                            height={24}
                            className={cn({
                              isActive: "brightness-200",
                            })}
                          />
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                <li className="sidebar-nav_element group text-gray-600 bg-red-100 rounded-md py-2">
                  <SignOutBtn />
                </li>
              </ul>
            </>
          ) : (
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </aside>
  );
}
