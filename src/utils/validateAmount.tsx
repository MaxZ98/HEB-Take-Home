import { ChangeEvent } from "react";

export const handleAmountChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setAmount: (value: string) => void
) => {
  const value = e.target.value;
  // Allow only numbers and decimal point up to hundredths place
  if (/^\d*\.?\d{0,2}$/.test(value)) {
    setAmount(value);
  }
};
