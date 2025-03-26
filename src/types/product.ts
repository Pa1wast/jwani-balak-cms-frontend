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
  product: Product | string;
  quantity: number;
  pricePerUnit: number;
}
