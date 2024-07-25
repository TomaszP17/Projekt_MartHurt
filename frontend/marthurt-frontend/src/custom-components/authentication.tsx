"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { register, login } from "@/services/authService";
import useAuthStore from "@/store/useAuthStore";

interface AuthenticationProps {
  isRegister: boolean;
}

export default function Authentication({ isRegister }: AuthenticationProps) {
  const router = useRouter();
  const authLogin = useAuthStore((state) => state.login);

  const [registerState, setRegisterState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (isRegister) {
      setRegisterState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setLoginState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (isRegister) {
        await register(
          registerState.username,
          registerState.email,
          registerState.password
        );
        alert("User registered");
        router.push("/login");
      } else {
        const res = await login(loginState.username, loginState.password);
        authLogin(res.token);
        router.push("/");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isRegister ? "Zarejestruj się" : "Zaloguj się"}
        </CardTitle>
        <CardDescription>
          {isRegister
            ? "Wpisz dane, aby się zarejestrować"
            : "Wpisz swój email i hasło, aby się zalogować"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {isRegister && (
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={registerState.email}
                onChange={handleChange}
                placeholder="m@mail.com"
                required
              />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="username">Nazwa użytkownika</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={isRegister ? registerState.username : loginState.username}
              onChange={handleChange}
              placeholder="Twoja nazwa użytkownika"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Hasło</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={isRegister ? registerState.password : loginState.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {isRegister ? "Zarejestruj się" : "Zaloguj się"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          {isRegister ? (
            <>
              Masz już konto?{" "}
              <Link href="/login" className="underline" prefetch={false}>
                Zaloguj się
              </Link>
            </>
          ) : (
            <>
              Nie masz jeszcze konta?{" "}
              <Link href="/register" className="underline" prefetch={false}>
                Zarejestruj się
              </Link>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
