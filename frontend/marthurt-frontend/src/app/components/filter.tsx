/**
 * v0 by Vercel.
 * @see https://v0.dev/t/TIxncLIUuB8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState, useMemo } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export default function Component() {
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    price: { min: 0, max: 1000 },
    rating: 0,
  });
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High-quality wireless headphones",
      price: 99.99,
      rating: 4.5,
      category: "Electronics",
    },
    {
      id: 2,
      name: "Leather Backpack",
      description: "Durable and stylish backpack",
      price: 79.99,
      rating: 4.2,
      category: "Bags",
    },
    {
      id: 3,
      name: "Outdoor Camping Gear",
      description: "Essential camping equipment",
      price: 149.99,
      rating: 4.7,
      category: "Outdoor",
    },
    {
      id: 4,
      name: "Organic Cotton T-Shirt",
      description: "Soft and sustainable t-shirt",
      price: 29.99,
      rating: 4.1,
      category: "Clothing",
    },
    {
      id: 5,
      name: "Smartwatch",
      description: "Advanced fitness tracking smartwatch",
      price: 199.99,
      rating: 4.6,
      category: "Electronics",
    },
    {
      id: 6,
      name: "Leather Wallet",
      description: "High-quality leather wallet",
      price: 39.99,
      rating: 4.3,
      category: "Accessories",
    },
  ];
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        selectedFilters.category.length > 0 &&
        !selectedFilters.category.includes(product.category)
      ) {
        return false;
      }
      if (
        product.price < selectedFilters.price.min ||
        product.price > selectedFilters.price.max
      ) {
        return false;
      }
      if (product.rating < selectedFilters.rating) {
        return false;
      }
      return true;
    });
  }, [selectedFilters]);
  const handleFilterChange = (type, value) => {
    switch (type) {
      case "category":
        setSelectedFilters({
          ...selectedFilters,
          category: selectedFilters.category.includes(value)
            ? selectedFilters.category.filter((item) => item !== value)
            : [...selectedFilters.category, value],
        });
        break;
      case "price":
        setSelectedFilters({
          ...selectedFilters,
          price: value,
        });
        break;
      case "rating":
        setSelectedFilters({
          ...selectedFilters,
          rating: value,
        });
        break;
      default:
        break;
    }
  };
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Product Filters</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="category">
            <AccordionTrigger className="text-base">Category</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                {[
                  "Electronics",
                  "Bags",
                  "Outdoor",
                  "Clothing",
                  "Accessories",
                ].map((category) => (
                  <Label
                    key={category}
                    className="flex items-center gap-2 font-normal"
                  >
                    <Checkbox
                      checked={selectedFilters.category.includes(category)}
                      onCheckedChange={() =>
                        handleFilterChange("category", category)
                      }
                    />
                    {category}
                  </Label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="price">
            <AccordionTrigger className="text-base">Price</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span>Min Price</span>
                  <span>${selectedFilters.price.min.toFixed(2)}</span>
                </div>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  defaultValue={[
                    selectedFilters.price.min,
                    selectedFilters.price.max,
                  ]}
                  onValueChange={(value) =>
                    handleFilterChange("price", {
                      min: value[0],
                      max: value[1],
                    })
                  }
                />
                <div className="flex items-center justify-between">
                  <span>Max Price</span>
                  <span>${selectedFilters.price.max.toFixed(2)}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="rating">
            <AccordionTrigger className="text-base">Rating</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Label
                    key={rating}
                    className="flex items-center gap-2 font-normal"
                  >
                    <Checkbox
                      checked={selectedFilters.rating <= rating}
                      onCheckedChange={() =>
                        handleFilterChange("rating", rating)
                      }
                    />
                    <div className="flex items-center gap-1">
                      {Array.from({ length: rating }, (_, i) => (
                        <StarIcon key={i} className="w-4 h-4 fill-primary" />
                      ))}
                      {Array.from({ length: 5 - rating }, (_, i) => (
                        <StarIcon
                          key={i}
                          className="w-4 h-4 fill-muted stroke-muted-foreground"
                        />
                      ))}
                    </div>
                  </Label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
