"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Filter from "./filter";
import { Lighting } from "../types";

const ProductsGrid: React.FC = () => {
  const [products, setProducts] = useState<Lighting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/lightings");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!products || products.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <main className="md:px-52 px-5">
      <div className="mb-5">
        <Filter />
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {products.map((lighting) => (
          <Card
            key={lighting.productId}
            className="drop-shadow-md cursor-pointer"
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
            <div className="flex p-5 gap-x-3">
              <Button className="w-1/2 md:w-auto" variant={"outline"}>
                Szczegóły
              </Button>
              <Button className="w-1/2 md:w-auto">Kup</Button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default ProductsGrid;
