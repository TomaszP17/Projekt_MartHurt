"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useCartStore } from "@/store/useCartStore";

export function CartButton() {
  const { totalItems } = useCartStore();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
        >
          <span className="material-symbols-outlined h-6 w-6">
            shopping_bag
          </span>
          <span className="ml-1">Koszyk ({totalItems})</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="p-4">
          <h4 className="text-sm font-semibold">Koszyk</h4>
          <p className="text-sm">Masz {totalItems} przedmiotów w koszyku.</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
