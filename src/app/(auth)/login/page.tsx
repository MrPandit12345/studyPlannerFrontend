"use client";

import { LoginComponent } from "../_component/loginComponent";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center">
      <LoginComponent onSubmit={(data)=>{console.warn("logined",data)}}/>
    </div>
  );
}
