import { Route, Routes } from "react-router-dom";
import { ATMProvider } from "./context/ATMContext";
import { Deposit } from "./pages/Deposit";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Withdraw } from "./pages/Withdraw";
import { PrivateRoutes } from "./utils/privateRoutes";

const App = () => {
  return (
    <ATMProvider>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" />
          <Route element={<Withdraw />} path="/Withdraw" />
          <Route element={<Deposit />} path="/Deposit" />
        </Route>
        <Route element={<Login />} path="/Login" />
      </Routes>
    </ATMProvider>
  );
};

export default App;
