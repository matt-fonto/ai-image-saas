import { AuthProvider } from "@/providers/AuthProvider";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="root">
      <div className="root-container">
        <AuthProvider>
          <div className="wrapper">{children}</div>
        </AuthProvider>
      </div>
    </main>
  );
}
