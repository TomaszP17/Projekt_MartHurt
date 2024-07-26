// src/components/Filter.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { useFilterStore } from "@/store/useFilterStore";
import useScreenSize from "@/hooks/useScreenSize";

const iconMap = {
  faFilter,
};

const Filter: React.FC = () => {
  const {
    priceFrom,
    priceTo,
    selectedSize,
    selectedColors,
    selectedFinish,
    setPriceFrom,
    setPriceTo,
    setSelectedSize,
    setSelectedColor,
    setSelectedFinish,
    applyFilters,
  } = useFilterStore();
  const finishOptions: string[] = [
    "złote",
    "srebrne",
    "złote matowe",
    "brak",
    "czarne",
    "złoty połysk",
    "Kolor: złoty",
    "Kolor: champagne+rose",
    "Kolor: champagne+rose+red",
    "Kolor: Dark gold",
    "Kolor: gold",
    "złote szczotkowane",
  ];

  const colorOptions: string[] = [
    "3000K (ciepła)",
    "3500K",
    "3000K-6000K",
    "3000K/4000K/6000K - zmiana barwy włącznikiem",
    "2800K-6000K",
    "brak",
  ];

  const sizeOptions: string[] = [
    "ᴓ40cm x h 11cm",
    "ᴓ60cm x h 11cm",
    "ᴓ80cm x h 11cm",
    "ᴓ40cm +ᴓ60cm +ᴓ80cm x h 80-180cm",
    "ᴓ60cm +ᴓ80cm x h 180-180cm",
    "ᴓ80cm x h 60-150cm",
    "ᴓ60cm  x 21cm x h 120cm",
    "ᴓ53cm x h 200cm",
    "↔160cm x h 70-150cm",
    "↔150cm x 35cm x h max 200cm",
    "↔120cm x 35cm x h max 200cm",
    "ᴓ10cm x h 60-150cm",
    "ᴓ30cm x h 60-150cm",
    "ᴓ6cm x h 34cm x h 60-150cm",
    "ᴓ25cm x h 60-150cm Tuba: h 34cm",
    "ᴓ50cm x h max 150cm Tuba: h 34cm",
    "ᴓ30cm x h max 120cm",
    "ᴓ50cm x h 35cm",
    "ᴓ40cm x h 32cm",
    "70m x 50cm x h 20cm ᴓ30cm +  ᴓ50cm",
    "ᴓ20cm x h 150cm",
    "ᴓ20cm x h 24,5cm Podstawa: ᴓ18cm",
    "12cm x h 28cm",
    "ᴓ30cm x h 150cm Klosz ᴓ8,2cm x h 22,3cm",
    "8,2cm x h 22,3cm  x h max 150cm",
    "↔16cm x ↙7cm x h 38cm",
    "↔12cm x H ozdobna: 100m x H max 230cm",
    "↔12cm x ↙12cm x h 50cm",
    "↔ 60cm x ↙12cm x 8cm",
    "↔ 60cm x 8cm",
    "ᴓ60cm x h max 150cm",
    "ᴓ16cm x h max 110cm",
    "ᴓ13cm x h max 110cm",
    "Rozmiar ovalu: ↔10cm x h 33cm Wysokość: max 100cm",
    "↔100cm x 12cm x h 5cm Reflektor: ↔5cm x h 10cm",
    "↔120cm x 60cm x h 4,5cm Okręgi LED: ᴓ30cm i ᴓ20cm",
    "98cm x 65cm x h 12cm Okręgi LED: ᴓ30cm i ᴓ20cm",
    "↔15cm x h 80cm Mocoeanie środkowe: 3cm x h 30cm",
    "↔13cm x h 80cm Mocoeanie środkowe: 3cm x h 30cm",
    "ᴓ50cm x h 7cm",
    "ᴓ50cm x h 17cm",
    "ᴓ25cm x h120cm",
    "ᴓ7cm x H ozdobna: 35cm x H max 100cm",
    "ᴓ60cm x h 200cm Wysokość ozdobna :130cm",
  ];

  const handlePriceFromChange = (value: number[]) => {
    if (value[0] <= priceTo) {
      setPriceFrom(value[0]);
    }
  };

  const handlePriceToChange = (value: number[]) => {
    if (value[0] >= priceFrom) {
      setPriceTo(value[0]);
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColor((prevSelected) =>
      prevSelected.includes(color)
        ? prevSelected.filter((c) => c !== color)
        : [...prevSelected, color]
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize((prevSelected) =>
      prevSelected.includes(size)
        ? prevSelected.filter((s) => s !== size)
        : [...prevSelected, size]
    );
  };


  const handleFinishChange = (finish: string) => {
    setSelectedFinish((prevSelected) =>
      prevSelected.includes(finish)
        ? prevSelected.filter((f) => f !== finish)
        : [...prevSelected, finish]
    );
  };

  const windowSize = useScreenSize();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto">
          Filtruj <FontAwesomeIcon icon={iconMap.faFilter} className="ml-2" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={windowSize.width <= 768 ? "bottom" : "left"}
        className="flex flex-col h-screen"
      >
        <SheetHeader>
          <SheetTitle>Filtry</SheetTitle>
          <SheetDescription>
            Wybierz filtry i kliknij "Filtruj", aby zastosować.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-grow">
          <div className="p-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="price">
                <AccordionTrigger>Cena</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4">
                    <div>
                      <Label>Cena od</Label>
                      <Slider
                        min={0}
                        max={20000}
                        step={10}
                        value={[priceFrom]}
                        onValueChange={handlePriceFromChange}
                        className="my-2"
                      />
                      <div>{priceFrom} zł</div>
                    </div>
                    <div>
                      <Label>Cena do</Label>
                      <Slider
                        min={0}
                        max={20000}
                        step={10}
                        value={[priceTo]}
                        onValueChange={handlePriceToChange}
                        className="my-2"
                      />
                      <div>{priceTo} zł</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="size">
                <AccordionTrigger>Rozmiar</AccordionTrigger>
                <AccordionContent>
                  {sizeOptions.map((size, index) => (
                    <Label key={index} className="block mb-4">
                      <Checkbox
                        className="mr-2"
                        checked={selectedSize.includes(size)}
                        onClick={() => handleSizeChange(size)}
                      />
                      {size}
                    </Label>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="color">
                <AccordionTrigger>Kolor</AccordionTrigger>
                <AccordionContent>
                  {colorOptions.map((color, index) => (
                    <Label key={index} className="block mb-4">
                      <Checkbox
                        className="mr-2"
                        checked={selectedColors.includes(color)}
                        onClick={() => handleSizeChange(color)}
                      />
                      {color}
                    </Label>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="finish">
                <AccordionTrigger>Wykończenie</AccordionTrigger>
                <AccordionContent>
                  {finishOptions.map((finish, index) => (
                    <Label key={index} className="block mb-4">
                      <Checkbox
                        className="mr-2"
                        checked={selectedFinish.includes(finish)}
                        onClick={() => handleFinishChange(finish)}
                      />
                      {finish}
                    </Label>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
        <SheetFooter>
          <SheetTrigger className="w-full">
            <Button className="w-full" type="submit" onClick={applyFilters}>
              Filtruj
            </Button>
          </SheetTrigger>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Filter;
