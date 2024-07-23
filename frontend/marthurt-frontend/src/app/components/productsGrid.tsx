// src/components/ProductsGrid.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Filter from "./filter";
import Sort from "./sort";
import { Lighting } from "../types";
import SkeletonCard from "./skeletonCard";
import { useFilterStore } from "@/store/useFilterStore";
import { useSortStore } from "@/store/useSortStore";
import { useSearchStore } from "@/store/useSearchStore";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";

const ProductsGrid: React.FC = () => {
  const [products, setProducts] = useState<Lighting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const {
    priceFrom,
    priceTo,
    selectedSuppliers,
    setSelectedSuppliers,
    filtersApplied,
    applyFilters,
  } = useFilterStore();
  const { sortBy } = useSortStore();
  const { searchBy, setSearchBy } = useSearchStore();

  useEffect(() => {
    const sortBySplitted = sortBy.split(" ");
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8080/lightings", {
          params: {
            priceFrom,
            priceTo,
            supplierNames: selectedSuppliers.join(","),
            sortBy: sortBySplitted[0],
            sortOrder: sortBySplitted[1],
            lightingSearch: searchBy,
          },
        });
        console.log(res.request);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filtersApplied, sortBy, searchBy]);

  const handleRemoveSupplier = (supplier: string) => {
    setSelectedSuppliers((prevSelected) =>
      prevSelected.filter((s) => s !== supplier)
    );
    applyFilters();
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (loading) {
    return (
      <main className="lg:px-52 px-5">
        <div className="mb-5 flex justify-between items-center">
          <div>
            <Filter />
          </div>
          <div className="flex-grow" />
          <div>
            <Sort />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!products || products.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <main className="xl:px-52 px-5">
      <div className="flex flex-col md:flex-row gap-x-5 mb-5 items-center gap-y-2 md:gap-y-0">
        <Input
          type="text"
          placeholder="Szukaj produktów..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full md:w-auto"
          onChange={handleSearchInputChange}
        />
        <Button
          onClick={() => setSearchBy(search)}
          type="submit"
          className="w-full md:w-auto"
        >
          Szukaj
        </Button>
        <div className="w-full md:w-auto">
          <Filter />
        </div>
        <div className="flex flex-wrap w-full justify-start gap-2 md:order-2 order-3">
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-300 cursor-pointer">
            Cena od: {priceFrom} zł
          </Badge>
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-300 cursor-pointer">
            Cena do: {priceTo} zł
          </Badge>
          {selectedSuppliers.map((supplier) => (
            <Badge
              key={supplier}
              className="bg-gray-100 text-gray-800 flex items-center hover:bg-gray-300 cursor-pointer"
              onClick={() => handleRemoveSupplier(supplier)}
            >
              {supplier} &times;
              {/* <button
                type="button"
                onClick={() => handleRemoveSupplier(supplier)}
                className="ml-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 cursor-pointer"
              >
                <span className="sr-only">Remove</span>
                &times;
              </button> */}
            </Badge>
          ))}
        </div>
        <div className="flex-grow order-3 hidden md:block" />
        <div className="w-full md:w-auto order-2 md:order-4">
          <Sort />
        </div>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
        {products.map((lighting) => (
          <Card
            key={lighting.productId}
            className="drop-shadow-md cursor-pointer transition-transform transform hover:scale-[1.02] duration-400"
          >
            <CardHeader>
              <div className="relative w-40 h-40 mx-auto">
                <Image
                  layout="fill"
                  objectFit="contain"
                  loader={() => lighting.urlImages[0]}
                  src={lighting.urlImages[0]}
                  alt={lighting.productName}
                />
              </div>
              <CardTitle>{lighting.supplierName}</CardTitle>
              <CardDescription>{lighting.productName}</CardDescription>
            </CardHeader>
            <CardContent>{lighting.productId}</CardContent>
            <div className="flex flex-col p-5 gap-x-3 md:flex-row gap-y-2">
              <Link
                className="w-full"
                href={`/lightings/${lighting.productId}`}
              >
                <Button className="w-full" variant="outline">
                  Szczegóły
                </Button>
              </Link>
              <Button className="w-full">Kup</Button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default dynamic(() => Promise.resolve(ProductsGrid), { ssr: false });
