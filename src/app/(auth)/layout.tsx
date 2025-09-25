import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
      <div
        className="min-h-screen flex items-center justify-center bg-black bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/register/registerBG.png')" }}
      >
        <div className="w-full max-w-fit rounded-2xl p-8">
          {children}
        </div>
      </div>
  );
}
