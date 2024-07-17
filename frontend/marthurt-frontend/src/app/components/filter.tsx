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

const iconMap = {
  faFilter,
};

const Filter: React.FC = () => {
  const categories = ["Wszystkie kategorie"];
  const types = [
    "Biurkowe",
    "Biurkowe i gabinetowe",
    "Części zamienne",
    "Kinkiety",
    "Kinkiety oraz łazienkowe",
    "Klosze",
    "Liniowe natynkowe",
    "Liniowe wiszące",
    "Magnetyczne szynowe",
    "Magnetyczne szyny i akcesoria",
    "Meblowe",
  ];
  const styles = [
    "Części zamienne",
    "Industrialne i retro",
    "Klasyczne",
    "Nowoczesne",
    "Nowoczesne Profesjonalne",
    "Nowoczesne techniczne",
    "Stylizowane",
    "Z kryształami",
    "Z kryształami - klasyczne",
  ];
  const otherFilters = [
    {
      title: "Umywalka",
      options: [
        "Z półką na baterię",
        "Nablatowa",
        "Podblatowa",
        "Z otworem na baterię",
        "Z3 otworami",
        "1-komorowa",
        "Retro",
      ],
    },
    {
      title: "WC",
      options: [
        "2-komorowa",
        "Nowoczesna",
        "Kolorowa (czerny mat, czarny połysk, antracyt mat, szary mat itd.)",
        "Rantowy",
        "bezrantowy",
      ],
    },
    { title: "Bidet", options: [] },
    { title: "Bateria", options: ["Umywalkowa", "Natryskowa", "Wannowa"] },
    { title: "Zestaw natryskowy", options: ["Natynkowy", "Podtynkowy"] },
    {
      title: "Oświetlenie",
      options: ["Lampy wiszące", "Plafony", "Listwy oświetleniowe"],
    },
    { title: "Listwy dekoracyjne", options: [] },
    { title: "Akcesoria łazienkowe", options: [] },
    {
      title: "Akcesoria prysznicowe",
      options: [
        "Słuchawki",
        "Deszczownice",
        "Przyłącza kątowe",
        "Uchwyty solo",
        "Wylewki wannowe",
      ],
    },
    {
      title: "Płytki",
      options: [
        "Marmur mat",
        "Marmur połysk",
        "Beton",
        "Kamień",
        "Drewno",
        "Patchwork",
        "Kafle",
        "Lastryko",
        "Zewnętrzne",
        "Dekory",
        "60x120",
        "120x120",
        "Slaby (120x240, 120x278, 120x280)",
      ],
    },
    { title: "Kabina", options: [] },
    { title: "Wanna", options: [] },
    { title: "Brodzik", options: [] },
    { title: "Lustro", options: [] },
    { title: "Parawan", options: [] },
    { title: "Pisuar", options: [] },
    { title: "Stelaż WC", options: [] },
    { title: "Klawisz WC", options: [] },
    { title: "Syfon", options: [] },
    { title: "Usługi", options: [] },
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
              {/* Kategoria */}
              <AccordionItem value="category">
                <AccordionTrigger>KATEGORIA</AccordionTrigger>
                <AccordionContent>
                  {categories.map((category, index) => (
                    <Label key={index} className="block mb-4">
                      <Checkbox className="mr-2" />
                      {category}
                    </Label>
                  ))}
                </AccordionContent>
              </AccordionItem>
              {/* Rodzaj */}
              <AccordionItem value="type">
                <AccordionTrigger>RODZAJ</AccordionTrigger>
                <AccordionContent>
                  {types.map((type, index) => (
                    <Label key={index} className="block mb-4">
                      <Checkbox className="mr-2" />
                      {type}
                    </Label>
                  ))}
                </AccordionContent>
              </AccordionItem>
              {/* Styl */}
              <AccordionItem value="style">
                <AccordionTrigger>STYL</AccordionTrigger>
                <AccordionContent>
                  {styles.map((style, index) => (
                    <Label key={index} className="block mb-4">
                      <Checkbox className="mr-2" />
                      {style}
                    </Label>
                  ))}
                </AccordionContent>
              </AccordionItem>
              {/* Other Filters */}
              {otherFilters.map((filter, index) => (
                <AccordionItem key={index} value={`filter-${index}`}>
                  <AccordionTrigger>{filter.title}</AccordionTrigger>
                  <AccordionContent>
                    {filter.options.map((option, idx) => (
                      <Label key={idx} className="block mb-4">
                        <Checkbox className="mr-2" />
                        {option}
                      </Label>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
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
