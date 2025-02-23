export const getAccountFormatter = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD", // You can change this to any currency, e.g., "EUR", "INR"
    minimumFractionDigits: 2, // This ensures that cents are shown
  });
  return formatter.format(amount);
};
