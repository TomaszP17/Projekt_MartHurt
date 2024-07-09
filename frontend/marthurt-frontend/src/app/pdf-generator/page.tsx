"use client";

import React, { useState } from "react";
import Select from "../components/select";
import { Option } from "../types";
import Form from "../components/form";
import Navbar from "../components/navbar";

const options: Option[] = [
  { value: "MH-206", label: "MH-206" },
  { value: "MH-214", label: "MH-214" },
  { value: "MH-224", label: "MH-224" },
  { value: "MH-232", label: "MH-232" },
];

export default function page() {
  const [selectedValue, setSelectedValue] = useState<Option | null>(null);

  const handleSelectChange = (value: Option) => {
    setSelectedValue(value);
  };

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col items-center pt-5">
        <Select
          options={options}
          onChange={handleSelectChange}
          placeholder="Select an option"
        />
        <Form selectedValue={selectedValue} />
      </div>
    </>
  );
}
