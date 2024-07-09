"use client";

import React, { useEffect, useState } from "react";
import { Option, FormData } from "../types";

interface FormProps {
  selectedValue: Option | null;
}

const Form: React.FC<FormProps> = ({ selectedValue }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [formData, setFormData] = useState<FormData[]>([]);

  useEffect(() => {
    handleAddElement();
  }, []);

  const handleAddElement = () => {
    const newElement: FormData = {
      name: "",
      bruttoPrice: 0,
      bruttoPriceWithDiscount: 0,
      quantity: 0,
      totalValueAfterDiscount: 0,
    };
    setFormData([...formData, newElement]);
  };

  const handleChange = (
    index: number,
    key: keyof FormData,
    newValue: string | number | File
  ) => {
    setFormData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [key]: newValue } : item
      )
    );
  };

  return (
    <div className="mt-5 w-4/5 mx-auto">
      <p className="mb-4">Selected Value: {selectedValue?.label}</p>
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">L.p</th>
            <th className="border border-gray-300 p-2">Nazwa Produktu</th>
            <th className="border border-gray-300 p-2">Zdjęcie</th>
            <th className="border border-gray-300 p-2">Cena brutto /m²</th>
            <th className="border border-gray-300 p-2">
              Cena brutto po rabacie
            </th>
            <th className="border border-gray-300 p-2">szt/m²</th>
            <th className="border border-gray-300 p-2">
              Wartość łączna po rabacie
            </th>
          </tr>
        </thead>
        <tbody>
          {formData.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  min={1}
                  value={item.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <input
                  type="file"
                  min={1}
                  // onChange={(e) =>
                  //   handleChange(
                  //     index,
                  //     "photo",
                  //     e.target.files ? e.target.files[0] : undefined
                  //   )
                  // }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <input
                  type="number"
                  min={1}
                  value={item.bruttoPrice}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "bruttoPrice",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <input
                  type="number"
                  min={1}
                  value={item.bruttoPriceWithDiscount}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "bruttoPriceWithDiscount",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleChange(index, "quantity", parseFloat(e.target.value))
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {item.bruttoPriceWithDiscount * item.quantity}
              </td>
            </tr>
          ))}
          <tr>
            <td className="border border-gray-300 p-2" colSpan={7}>
              <div className="flex gap-x-3">
                <textarea
                  disabled={buttonClicked}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Dodaj uwagi tutaj..."
                ></textarea>
                <button
                  onClick={() => setButtonClicked(!buttonClicked)}
                  className={
                    buttonClicked
                      ? "rounded-lg p-5 text-white bg-slate-500"
                      : "bg-blue-500 hover:bg-blue-700 rounded-lg p-5 text-white"
                  }
                >
                  {buttonClicked ? "Edytuj" : "Zapisz"}
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className="w-full" colSpan={7}>
              <div className="flex justify-center my-5">
                <button
                  onClick={handleAddElement}
                  className="flex justify-center items-center bg-blue-500 rounded-full w-10 h-10 hover:bg-blue-700"
                >
                  +
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className="border border-gray-300 p-2 text-right" colSpan={6}>
              Razem
            </td>
            <td className="border border-gray-300 p-2 text-center">
              {formData.reduce(
                (total, item) =>
                  total + item.bruttoPriceWithDiscount * item.quantity,
                0
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Form;
