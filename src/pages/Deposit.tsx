import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Button, InputAdornment, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Balance from "../components/Balance";
import NavButton from "../components/NavButton";
import useATM from "../hooks/useATM";
import { formattedCash } from "../utils/formatCash";
import { handleAmountChange } from "../utils/validateAmount";

export const Deposit = () => {
  const { updateUserBalance } = useATM();
  const [amount, setAmount] = useState<string>("");

  const handleDeposit = () => {
    const numericAmount = parseFloat(amount.toString());

    if (numericAmount > 0) {
      updateUserBalance(numericAmount, "deposit");
      alert(`Successfuly Deposited ${formattedCash(numericAmount)}`);
      setAmount("");
    } else {
      alert("Please enter a valid amount");
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" mt={10}>
      <Typography>ENTER THE AMOUNT YOU WANT TO DEPOSIT</Typography>
      <Stack direction={"row"} gap={2} mt={2}>
        <TextField
          id="outlined-basic"
          label="Deposit"
          variant="outlined"
          value={amount}
          inputProps={{
            inputMode: "decimal",
            pattern: "[0-9]*[.,]?[0-9]{0,2}",
            step: "0.01",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleAmountChange(e, setAmount)}
          placeholder="Enter amount"
        />
        <Button variant="contained" onClick={handleDeposit}>
          Enter
        </Button>
      </Stack>
      <Balance />
      <NavButton service="Home" />
    </Stack>
  );
};
