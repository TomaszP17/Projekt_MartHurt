"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LightingNews } from "../app/types";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// export function CarouselPlugin() {
//   const plugin = React.useRef(
//     Autoplay({ delay: 4000, stopOnInteraction: true })
//   );
// }

const CarouselSection: React.FC = () => {
  const [products, setProducts] = useState<LightingNews[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/lightings/news"
        );
        setProducts(response.data);
      } catch (err) {
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

  return (
    <section id="newest-products" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Nowości
        </h2>
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {products.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <h1>{product.imagesUrls}</h1>
                      {product.imagesUrls ? (
                        <h1></h1>
                      ) : (
                        // <Image
                        //   layout="fill"
                        //   objectFit="contain"
                        //   src={product.imagesUrls[0]}
                        //   alt={product.imagesNames}
                        //   className="rounded-lg"
                        // />
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                          <span>No Image</span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <h1>{product.imagesNames}</h1>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default CarouselSection;
