"use client";

import React, { useState } from "react";
import Select from "../components/select";
import Form from "../components/form";
import { Option, Quote } from "../types";
import Navbar from "../components/navbar";

const options: Option[] = [
  { value: "MH-206", label: "MH-206" },
  { value: "MH-214", label: "MH-214" },
  { value: "MH-224", label: "MH-224" },
  { value: "MH-232", label: "MH-232" },
];

export default function Page() {
  const [selectedValue, setSelectedValue] = useState<Option | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const handleSelectChange = (value: Option) => {
    setSelectedValue(value);
  };

  const handleDuplicateCheck = (newQuote: Quote) => {
    const isDuplicate = quotes.some(
      (quote) =>
        quote.clientEmail === newQuote.clientEmail ||
        quote.clientName === newQuote.clientName ||
        quote.items.some((item) =>
          newQuote.items.some((newItem) => newItem.name === item.name)
        )
    );

    if (isDuplicate) {
      alert("DUBEL");
      const existingQuote = quotes.find(
        (quote) => quote.clientEmail === newQuote.clientEmail
      );
      if (existingQuote) {
        console.log("Redirect to existing quote:", existingQuote);
      }
    } else {
      setQuotes([...quotes, newQuote]);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center pt-5">
        <Select
          options={options}
          onChange={handleSelectChange}
          placeholder="Wybierz Sklep"
        />
        <Form selectedValue={selectedValue} />
      </div>
    </>
  );
}
