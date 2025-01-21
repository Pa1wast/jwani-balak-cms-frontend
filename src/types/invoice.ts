import { Company } from './company';
import { Product } from './product';
import { Transaction } from './transaction';

export interface Invoice {
  _id: string;
  transaction: Transaction;
  company: Company;
  product: Product;
  addressedTo: string;
  buyer: string;
  seller: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewInvoice {
  company: string;
  transaction: string;
  product: string;
  addressedTo: string;
  buyer: string;
  seller: string;
}
