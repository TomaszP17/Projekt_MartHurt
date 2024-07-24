"use client";

import { useState } from "react";
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

interface AuthenticationProps {
  register: boolean;
}

export default function Authentication({ register }: AuthenticationProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission will be implemented on the backend
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          {register ? "Zarejestruj się" : "Zaloguj się"}
        </CardTitle>
        <CardDescription>
          {register
            ? "Wpisz dane, aby się zarejestrować"
            : "Wpisz swój email i hasło, aby się zalogować"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {register && (
            <div className="grid gap-2">
              <Label htmlFor="username">Nazwa użytkownika</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Twoja nazwa użytkownika"
                required
              />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@mail.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Hasło</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {register && (
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <Button type="submit" className="w-full">
            {register ? "Zarejestruj się" : "Zaloguj się"}
          </Button>
          <Button variant="outline" className="w-full">
            {register ? "Zarejestruj się" : "Zaloguj się"} z Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          {register ? (
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
