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
  photo?: File;
  bruttoPrice: number;
  bruttoPriceWithDiscount: number;
  quantity: number;
  totalValueAfterDiscount: number;
}