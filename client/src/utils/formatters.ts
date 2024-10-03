import { IPrice } from "@/types/Products";

export const formatPrice = (price: IPrice): string => {
  if (!price) return "0,00";
  const { amount, currency } = price;
  if (!currency || !amount) return "0,00";
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.label,
  });

  return formatter.format(amount);
};
