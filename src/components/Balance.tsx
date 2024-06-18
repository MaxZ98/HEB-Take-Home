import useATM from "../hooks/useATM";

const Balance = () => {
  const { currentUser } = useATM();
  const formattedBalance = currentUser?.balance
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

  return (
    <div>
      <h2>Current Balance: ${formattedBalance}</h2>
    </div>
  );
};

export default Balance;
