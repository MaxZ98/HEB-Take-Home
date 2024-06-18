import { Stack, Typography } from "@mui/material";
import NavButton from "../components/NavButton";

export const Home = () => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography>PLEASE SELECT A SERVICE</Typography>
      <Stack direction={"row"} gap={4} my={5}>
        <NavButton service="Withdraw" />
        <NavButton service="Deposit" />
      </Stack>
      <NavButton service="Exit" />
    </Stack>
  );
};
