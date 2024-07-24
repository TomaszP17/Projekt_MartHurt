import React, { useEffect, useState } from "react";
import { Option, FormData, Quote } from "../types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FormProps {
  selectedValue: Option | null;
}

const Form: React.FC<FormProps> = ({ selectedValue }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [formData, setFormData] = useState<FormData[]>([]);
  const [quoteInfo, setQuoteInfo] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    deliveryDate: "",
    additionalInfo: "",
  });

  // State to manage product descriptions
  const [productDescriptions, setProductDescriptions] = useState<string[]>([]);

  useEffect(() => {
    const cartData: FormData[] = [
      {
        name: "Produkt 1",
        photo: null,
        description: "opis",
        nettoPrice: 120,
        bruttoPrice: 100,
        quantity: 2,
        bruttoPriceWithDiscount: 90,
        totalValueAfterDiscount: 180,
      },
      {
        name: "Produkt 2",
        photo: null,
        description: "opis",
        nettoPrice: 240,
        bruttoPrice: 200,
        quantity: 1,
        bruttoPriceWithDiscount: 180,
        totalValueAfterDiscount: 180,
      },
    ];
    setFormData(cartData);

    // Initialize product descriptions with default values
    const initialDescriptions = cartData.map((item) => item.description);
    setProductDescriptions(initialDescriptions);
  }, []);

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedDescriptions = [...productDescriptions];
    updatedDescriptions[index] = value;
    setProductDescriptions(updatedDescriptions);

    // Update formData with new description
    const updatedFormData = [...formData];
    updatedFormData[index].description = value;
    setFormData(updatedFormData);
  };

  const handleQuoteInfoChange = (
    key: keyof typeof quoteInfo,
    value: string
  ) => {
    setQuoteInfo((prevInfo) => ({
      ...prevInfo,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const quote: Quote = {
      store: selectedValue?.value || "",
      date: new Date().toLocaleString(),
      salesPerson: "KG206", // tutaj jest hardcode narazie trzeba zroobic zeby pobieralo numer handlowca
      items: formData,
      ...quoteInfo,
    };
    handleDuplicateCheck(quote);
  };

  const handleDuplicateCheck = (quote: Quote) => {
    console.log("Checking for duplicates...", quote);
  };

  return (
    <div className="mt-5 w-4/5 mx-auto">
      <p className="mb-4">Wybrany Sklep: {selectedValue?.label}</p>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>L.p</TableHead>
            <TableHead>Nazwa Produktu</TableHead>
            <TableHead>Zdjęcie</TableHead>
            <TableHead>Opis</TableHead>
            <TableHead>Cena netto</TableHead>
            <TableHead>Cena brutto /m²</TableHead>
            <TableHead>sztuka</TableHead>
            <TableHead>Cena brutto po rabacie</TableHead>
            <TableHead>Wartość łączna po rabacie</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-center">
                {item.photo && (
                  <img
                    src={URL.createObjectURL(item.photo)}
                    alt={`Produkt ${index + 1}`}
                  />
                )}
              </TableCell>
              <TableCell className="text-center">
                <input
                  type="text"
                  value={productDescriptions[index]}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </TableCell>
              <TableCell className="text-center">{item.nettoPrice}</TableCell>
              <TableCell className="text-center">{item.bruttoPrice}</TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell className="text-center">
                {item.bruttoPriceWithDiscount}
              </TableCell>
              <TableCell className="text-center">
                {item.bruttoPriceWithDiscount * item.quantity}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={9}>
              <div className="flex gap-x-3">
                <Textarea
                  disabled={buttonClicked}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Dodaj uwagi tutaj..."
                ></Textarea>
                <Button
                  onClick={() => setButtonClicked(!buttonClicked)}
                  className={
                    buttonClicked
                      ? "bg-slate-500 hover:bg-slate-600"
                      : "bg-blue-500 hover:bg-blue-700"
                  }
                >
                  {buttonClicked ? "Edytuj" : "Zapisz"}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-right" colSpan={8}>
              Razem
            </TableCell>
            <TableCell className="text-center">
              {formData.reduce(
                (total, item) =>
                  total + item.bruttoPriceWithDiscount * item.quantity,
                0
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">Informacje o kliencie</h2>
        <div className="mb-2">
          <label>Nazwisko/Nazwa firmy:</label>
          <input
            type="text"
            value={quoteInfo.clientName}
            onChange={(e) =>
              handleQuoteInfoChange("clientName", e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-2">
          <label>Numer telefonu:</label>
          <input
            type="tel"
            value={quoteInfo.clientPhone}
            onChange={(e) =>
              handleQuoteInfoChange("clientPhone", e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-2">
          <label>Adres e-mail:</label>
          <input
            type="email"
            value={quoteInfo.clientEmail}
            onChange={(e) =>
              handleQuoteInfoChange("clientEmail", e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-2">
          <label>Data dostawy:</label>
          <input
            type="date"
            value={quoteInfo.deliveryDate}
            onChange={(e) =>
              handleQuoteInfoChange("deliveryDate", e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-2">
          <label>Dodatkowe informacje:</label>
          <Textarea
            value={quoteInfo.additionalInfo}
            onChange={(e) =>
              handleQuoteInfoChange("additionalInfo", e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Generuj Wycene
        </Button>
      </div>
    </div>
  );
};

export default Form;
