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
    selectedSuppliers,
    setPriceFrom,
    setPriceTo,
    setSelectedSuppliers,
    applyFilters,
  } = useFilterStore();

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

  const handleSupplierChange = (supplier: string) => {
    setSelectedSuppliers((prevSelected) =>
      prevSelected.includes(supplier)
        ? prevSelected.filter((s) => s !== supplier)
        : [...prevSelected, supplier]
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
              <AccordionItem value="suppliers">
                <AccordionTrigger>Dostawcy</AccordionTrigger>
                <AccordionContent>
                  {suppliersNames.map((supplier, index) => (
                    <Label key={index} className="block mb-4">
                      <Checkbox
                        className="mr-2"
                        checked={selectedSuppliers.includes(supplier)}
                        onClick={() => handleSupplierChange(supplier)}
                      />
                      {supplier}
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
