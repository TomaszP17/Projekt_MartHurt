import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function layoutAuthenticated() {
  const [profile, setProfile] = useState();
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, [])

  async function fetchProfile() {
    const res = await fetch("http://localhost:8080/api/")
  }

  return <div>layoutAuthenticated</div>;
}
