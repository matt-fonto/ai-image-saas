"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutBtn } from "../SignOutButton";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

export function MobileNav() {
  const pathname = usePathname();
  const session = useSession();

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>

      <nav className="flex gap-2">
        <Sheet>
          <SheetTrigger>
            <Image
              src="/assets/icons/menu.svg"
              alt="menu"
              width={32}
              height={32}
              className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent className="sheet-content sm:w-64">
            <>
              <Image
                src="/assets/images/logo-text.svg"
                alt="logo"
                width={152}
                height={23}
              />

              {session.status === "authenticated" ? (
                <ul className="header-nav_elements">
                  {navLinks.map(({ icon, label, route }) => {
                    const isActive = route === pathname;
                    return (
                      <li
                        key={route}
                        className={cn(
                          "p-18 flex whitespace-nowrap text-dark-700",
                          {
                            "gradient-text": isActive,
                          }
                        )}
                      >
                        <Link
                          href={route}
                          className="sidebar-link cursor-pointer"
                        >
                          <Image src={icon} alt="logo" width={24} height={24} />
                          {label}
                        </Link>
                      </li>
                    );
                  })}

                  <li className="sidebar-nav_element group text-gray-600 bg-red-100 rounded-md py-2">
                    <SignOutBtn />
                  </li>
                </ul>
              ) : (
                <Button
                  asChild
                  className="button bg-purple-gradient bg-cover mt-10"
                >
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
