import { Navigate, Outlet } from "react-router-dom";
import useATM from "../hooks/useATM";

export const PrivateRoutes = () => {
  const { currentUser } = useATM();
  return currentUser ? <Outlet /> : <Navigate to="/Login" />;
};
