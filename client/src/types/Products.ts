export interface IPrice {
  amount: number;
  currency: ICurrency;
}
export interface ICurrency {
  symbol: string;
  label: string;
}

export interface IPorductCardResponse {
  products: IProduct[];
}

export interface IProduct {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: string;
  attributes: IAttributeSet[];
  prices: IPrice[];
  brand: string;
}

export interface IProductResponse {
  product: IProduct;
}

export interface IAttributeSet {
  id: string;
  items: IAttribute[];
  name: string;
  type: string;
}

export interface IAttribute {
  displayValue: string;
  value: string;
  id: string;
}
export interface ISelectedAttributes {
  id: string;
  value: string;
}
export interface IProductCartItem {
  selectedAttributes: ISelectedAttributes[];
  quantity: number;
  amount: number;
  currency: ICurrency;
  key: string;
  product: IProduct;
}
