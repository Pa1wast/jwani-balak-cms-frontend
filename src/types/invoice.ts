import { Company } from './company';
import { Product } from './product';

export interface Invoice {
  _id: string;
  company: Company[];
  product: Product[];
  addressedTo: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewInvoice {
  company: string;
  product: string;
  addressedTo: string;
}
