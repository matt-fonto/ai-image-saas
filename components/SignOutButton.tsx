"use client";

import { signOut } from "next-auth/react";

export function SignOutBtn() {
  return (
    <button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/login`,
        })
      }
    >
      Sign out
    </button>
  );
}
