export const formattedCash = (numericAmount: number) => {
  return `$${numericAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};
