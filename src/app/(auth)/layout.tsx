import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <div
        className="min-h-screen flex items-center justify-center bg-black bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/register/registerBG.png')" }}
      >
        <div className="w-full max-w-lg backdrop-blur-md shadow-lg rounded-2xl p-8">
          {children}
        </div>
      </div>
    </ClerkProvider>
  );
}
