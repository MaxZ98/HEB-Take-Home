import { Route, Routes } from "react-router-dom";
import { Deposit } from "./pages/Deposit";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Withdraw } from "./pages/Withdraw";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Login />} path="/Login" />
      <Route element={<Withdraw />} path="/Withdraw" />
      <Route element={<Deposit />} path="/Deposit" />
    </Routes>
  );
}

export default App;
