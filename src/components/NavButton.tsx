import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useATM from "../hooks/useATM";

type OptionButtonProps = {
  service: "Withdraw" | "Deposit" | "Exit" | "Home";
};

const NavButton = ({ service }: OptionButtonProps) => {
  const { setCurrentUser } = useATM();
  const navigate = useNavigate();

  const handleService = () => {
    if (service === "Exit") {
      setCurrentUser(null);
    } else if (service === "Home") {
      navigate("/");
    } else {
      navigate(`/${service}`);
    }
  };

  return (
    <Button
      variant={
        service === "Exit" || service === "Home" ? "contained" : "outlined"
      }
      onClick={handleService}
    >
      {service}
    </Button>
  );
};

export default NavButton;
