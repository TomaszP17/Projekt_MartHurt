import React from "react";
import Authentication from "@/custom-components/authentication";

interface authenticationContainerProps {
  isRegister: boolean;
}

export default function AuthenticationContainer({
  isRegister,
}: authenticationContainerProps) {
  return (
    <div className="flex h-screen items-center">
      <Authentication isRegister={isRegister} />
    </div>
  );
}
