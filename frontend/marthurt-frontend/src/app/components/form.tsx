import React, { useEffect, useState } from "react";
import { Option, FormData, Quote } from "../types";

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
        bruttoPrice: 100,
        bruttoPriceWithDiscount: 90,
        quantity: 2,
        totalValueAfterDiscount: 180,
      },
      {
        name: "Produkt 2",
        photo: null,
        description: "opis",
        bruttoPrice: 200,
        bruttoPriceWithDiscount: 180,
        quantity: 1,
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
      salesPerson: "KG206", // Hardcoded for example, you can make this dynamic
      items: formData,
      ...quoteInfo,
    };
    handleDuplicateCheck(quote);
  };

  const handleDuplicateCheck = (quote: Quote) => {
    // Implement duplicate check logic here
    console.log("Checking for duplicates...", quote);
  };

  return (
    <div className="mt-5 w-4/5 mx-auto">
      <p className="mb-4">Wybrany Sklep: {selectedValue?.label}</p>
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">L.p</th>
            <th className="border border-gray-300 p-2">Nazwa Produktu</th>
            <th className="border border-gray-300 p-2">Zdjęcie</th>
            <th className="border border-gray-300 p-2">Opis</th>
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
              <td className="border border-gray-300 p-2">{item.name}</td>
              <td className="border border-gray-300 p-2 text-center">
                {item.photo && (
                  <img
                    src={URL.createObjectURL(item.photo)}
                    alt={`Produkt ${index + 1}`}
                  />
                )}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <input
                  type="text"
                  value={productDescriptions[index]}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {item.bruttoPrice}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {item.bruttoPriceWithDiscount}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {item.quantity}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {item.bruttoPriceWithDiscount * item.quantity}
              </td>
            </tr>
          ))}
          <tr>
            <td className="border border-gray-300 p-2" colSpan={8}>
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
        </tbody>
        <tfoot>
          <tr>
            <td className="border border-gray-300 p-2 text-right" colSpan={7}>
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
          <textarea
            value={quoteInfo.additionalInfo}
            onChange={(e) =>
              handleQuoteInfoChange("additionalInfo", e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded pb"
        >
          Generuj Wycene
        </button>
      </div>
    </div>
  );
};

export default Form;
