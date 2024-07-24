import React from "react";
import AuthenticationContainer from "@/containers/authenticationContainer";

export default function Register() {
  return (
    <>
      <AuthenticationContainer isRegister={true} />
    </>
  );
}
