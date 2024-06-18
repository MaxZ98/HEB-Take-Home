import { Stack, Typography } from "@mui/material";
import OptionButton from "../components/OptionButton";

export const Home = () => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography>PLEASE SELECT A SERVICE</Typography>
      <Stack direction={"row"} gap={4} my={5}>
        <OptionButton service="Withdraw" />
        <OptionButton service="Deposit" />
      </Stack>
      <OptionButton service="Exit" />
    </Stack>
  );
};
