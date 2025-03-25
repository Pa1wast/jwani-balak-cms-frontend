export interface Product {
  _id: string;
  productName: string;
  company: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewProduct {
  productName: string;
}

export interface ComposedProduct {
  product: Product;
  quantity: number;
  pricePerUnit: number;
  exchange: number;
}
