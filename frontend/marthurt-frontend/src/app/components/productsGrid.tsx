import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const products = [
  {
    brand: "LIGHT PRESTIGE",
    model: "MH2187",
    name: "LP-2004/1P M AM Tropea 1 wisząca średnia bursztyn",
    price_net: 202.44,
    price_gross: 263.0,
    price_discount_net: 213.82,
    price_discount_gross: 351.0,
    price_final_gross: 285.0,
    price_final: 499.0,
    price_compare: 614.0,
    details: {
      lamp: "Lampa wisząca Arba 16 Red",
      dimensions: "ø16cm x h max 110cm",
      bulb: "1 x E27 (60W)/230V",
      bulbs_included: "Żarówki nie są w komplecie",
      color: "champagne+rose+red",
    },
    quantity: 232,
    delivery_time: "10 dni",
    image_url: "MH2187_LP_2004_1P_M_AM_Tropea_1_wisz_ca__rednia_bursztyn.png",
  },
  {
    brand: "LIGHT PRESTIGE",
    model: "MH2188",
    name: "LP-2004/1P S AM Tropea 1 wisząca mała bursztyn",
    price_net: 196.75,
    price_gross: 256.0,
    price_discount_net: 208.13,
    price_discount_gross: 358.0,
    price_final_gross: 291.0,
    price_final: 499.0,
    price_compare: 614.0,
    details: {
      lamp: "Lampa wisząca Arba 13 Rose",
      dimensions: "ø13cm x h max 110cm",
      bulb: "1 x E27 (60W)/230V",
      bulbs_included: "Żarówki nie są w komplecie",
      color: "champagne+rose+red",
    },
    quantity: 232,
    delivery_time: "10 dni",
    image_url: "MH2188_LP_2004_1P_S_AM_Tropea_1_wisz_ca_ma_a_bursztyn.png",
  },
  {
    brand: "ALI",
    model: "MH2189",
    name: "B-Gold-2heads, Tricolor (no RC )",
    price_net: 150.0,
    price_gross: 150.0,
    price_discount_net: 121.95,
    price_discount_gross: 464.0,
    price_final_gross: 377.0,
    price_final: 499.0,
    price_compare: 614.0,
    details: {
      lamp: "Lampa wisząca Dos LED gold",
      dimensions: "Rozmiar owalu: ø<10cm x h 33cm",
      height: "max 100cm",
      bulb: "LED 30W/230V (2 x 15W)",
      lumens: "1500lm",
      room_size: "Do pomieszczeń: 5-10m2",
      color_temperature: "3000K/4000K/6000K",
      color_change: "Zmiana barwy ręczna, bez pilota",
      bulbs_included: "Źródło światła LED w komplecie",
      color: "Dark gold",
    },
    availability: "Dostępny tylko 2x model ekspozycyjny",
    release: "Premiera-prototyp",
    image_url:
      "MH2189__B_Gold_2heads__Tricolor__no_RC___LWL012_Sanoni_LED_Store.png",
  },
];

export default function ProductsGrid() {
  return (
    <main>
      <div className="grid md:grid-cols-3 gap-8 px-5">
        {products.map((product) => (
          <Card key={product.model} className="drop-shadow-md cursor-pointer">
            <CardHeader>
              <div>
                <Image
                  width={100}
                  height={100}
                  src={`/images/${product.image_url}`}
                  alt={product.name}
                />
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.name}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>{product.details.color}</CardContent>
            <CardFooter>Szczegóły</CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
