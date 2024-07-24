import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function layoutAuthenticated() {
  const [profile, setProfile] = useState();
  const router = useRouter();

  return <div>layoutAuthenticated</div>;
}
