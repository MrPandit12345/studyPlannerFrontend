"use client";

import { RegisterComponent } from "../_component/registerComponent";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center">
      <RegisterComponent onSubmit={(data)=>{console.warn("signed in",data)}}/>
    </div>
  );
}
