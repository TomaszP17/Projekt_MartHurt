// src/components/CustomSelect.tsx

"use client";

import React, { useState } from "react";
import { Option, CustomSelectProps } from "../types";

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  onChange,
  placeholder,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      <div
        className="p-2 border border-gray-300 rounded cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption.label : placeholder || "Wybierz Sklep"}
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1">
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
