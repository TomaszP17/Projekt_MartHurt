import React from "react";
import Authentication from "@/custom-components/authentication";

interface authenticationContainerProps {
  register: boolean;
}

export default function AuthenticationContainer({
  register,
}: authenticationContainerProps) {
  return (
    <div className="flex h-screen items-center">
      <Authentication register={register} />
    </div>
  );
}
