export interface Option {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  options: Option[];
  onChange: (selectedOption: Option) => void;
  placeholder?: string;
}

export interface FormData {
  name: string;
  photo?: File | null;
  description: string;
  bruttoPrice: number;
  bruttoPriceWithDiscount: number;
  quantity: number;
  totalValueAfterDiscount: number;
}

export interface Quote {
  store: string;
  date: string;
  salesPerson: string;
  items: FormData[];
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  deliveryDate: string;
  additionalInfo: string;
}
