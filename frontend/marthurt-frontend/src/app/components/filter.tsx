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

const iconMap = {
  faFilter,
};

const Filter: React.FC = () => {
  const categories = ["Wszystkie kategorie"];

  // cena od, cena do, nazwa suppliera

  const numFilters: string[] = ["priceFrom", "priceTo"];

  const suppliersNames: string[] = [
    "AZZARDO",
    "NOVA LUCE",
    "ZUMA",
    "LIGHT PRESTIGE",
    "ITALUX",
    "ILUMINAR",
    "ALI",
    "MAX-LIGHT",
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          Filtruj <FontAwesomeIcon icon={iconMap.faFilter} className="ml-2" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col h-screen">
        <SheetHeader>
          <SheetTitle>Filtry</SheetTitle>
          <SheetDescription>
            Wybierz filtry i kliknij "Filtruj", aby zastosować.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-grow">
          <div className="p-4">
            <Accordion type="single" collapsible>
              <Label className="mb-2">
                Price from to
                <Slider defaultValue={[33]} max={100} step={1} />
              </Label>
              {/* Rodzaj */}
              <AccordionItem value="type">
                <AccordionTrigger>DOSTAWCY</AccordionTrigger>
                <AccordionContent>
                  {suppliersNames.map((supplier, index) => (
                    <Label key={index} className="block mb-4">
                      <Checkbox className="mr-2" />
                      {supplier}
                    </Label>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Filtruj</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Filter;
