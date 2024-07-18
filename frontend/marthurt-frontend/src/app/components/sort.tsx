// src/components/Sort.tsx
"use client";
import React from "react";
import { useSortStore } from "@/store/useSortStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the type for sortOptions keys
type SortOptionKey =
  | "productName asc"
  | "productName desc"
  | "price asc"
  | "price desc"
  | "supplierName asc"
  | "supplierName desc";

// Mapping between sortBy values and their labels
const sortOptions: Record<SortOptionKey, string> = {
  "productName asc": "Nazwa produktu A-Z",
  "productName desc": "Nazwa produktu Z-A",
  "price asc": "Od najniższej Ceny",
  "price desc": "Od najwyższej Ceny",
  "supplierName asc": "Nazwa producenta A-Z",
  "supplierName desc": "Nazwa producenta Z-A",
};

const Sort: React.FC = () => {
  const { setSortBy, sortBy } = useSortStore();

  const handleSortByChange = (value: string) => {
    setSortBy(value as SortOptionKey);
    console.log("Sort by:", value);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <Select onValueChange={handleSortByChange} value={sortBy}>
        <SelectTrigger className="w-full md:w-auto">
          <SelectValue placeholder="Sortuj">
            {sortOptions[sortBy as SortOptionKey] || "Sortuj"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sortowanie</SelectLabel>
            {Object.entries(sortOptions).map(([value, label]) => (
              <SelectItem key={value} value={value} className="cursor-pointer">
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sort;
