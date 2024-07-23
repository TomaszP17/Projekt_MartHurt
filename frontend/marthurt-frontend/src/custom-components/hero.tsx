import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="relative w-full h-[100vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/italux.jpg")' }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-10 text-center max-w-3xl px-4 sm:px-6 lg:px-8 py-4 bg-slate-300 rounded-lg mx-5">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Sprawdź nasze meble
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Sprawdź nasze produkty
        </p>
        <div className="mt-10">
          <Link
            href="#newest-products"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Nowości
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
