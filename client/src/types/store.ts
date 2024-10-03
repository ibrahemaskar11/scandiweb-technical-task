import { ICategory } from "./Categories";
import {
  ICurrency,
  IProduct,
  IProductCartItem,
  ISelectedAttributes,
} from "./Products";

export interface Store {
  categories: ICategory[];
  cart: ICart;
  cartToggle: boolean;
  toggleCart: () => void;
  initializeCart(cart: ICart): void;
  initializeCategories(categories: ICategory[]): void;
  addToCart(
    key: string,
    product: IProduct,
    selectedAttributes: ISelectedAttributes[],
    currency: ICurrency,
    amount: number
  ): void;
  removeFromCart(key: string): void;
  changeSelectedAttributes(
    key: string,
    selectedAttributeId: string,
    selectedAttributeItemValue: string
  ): void;
  emptyCart(): void;
}

export interface ICart {
  products: IProductCartItem[];
  itemsQuantity: number;
  totalAmount: number;
  currecny: ICurrency | null;
}
