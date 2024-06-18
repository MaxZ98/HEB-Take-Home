import { Button, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useATM from "../hooks/useATM";
import { validatePIN } from "../utils/validatePIN";

export const Login = () => {
  const navigate = useNavigate();
  const [inputPIN, setInputPIN] = useState("");
  const { users, setCurrentUser, addUser, currentUser } = useATM();
  console.log(currentUser, "current user");

  const handleLogin = () => {
    const validPin = validatePIN(inputPIN);
    if (!validPin) {
      alert("Invalid PIN");
      return;
    }

    const existingUser = users.find((user) => user.pin === inputPIN);
    if (existingUser) {
      setCurrentUser(existingUser);
      navigate("/");
    } else {
      addUser(inputPIN);
      navigate("/");
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" mt={10}>
      <Typography>Please enter your 4 digit PIN to get started</Typography>
      <Stack direction={"row"} gap={2} mt={2}>
        <TextField
          label="PIN"
          variant="outlined"
          value={inputPIN}
          onChange={(e) => setInputPIN(e.target.value)}
          placeholder="Enter PIN"
        />
        <Button variant="contained" onClick={handleLogin}>
          Enter
        </Button>
      </Stack>
    </Stack>
  );
};
