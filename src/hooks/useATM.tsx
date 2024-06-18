import { useContext } from "react";
import { ATMContext } from "../context/ATMContext";

const useATM = () => {
  const context = useContext(ATMContext);
  if (!context) {
    throw new Error("useATM must be used within an ATMProvider");
  }
  return context;
};

export default useATM;
