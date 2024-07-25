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
  | "dateAdded asc"
  | "dateAdded desc"

// Mapping between sortBy values and their labels
const sortOptions: Record<SortOptionKey, string> = {
  "dateAdded asc": "Najnowsze produkty",
  "dateAdded desc": "Najstarsze produkty",
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
