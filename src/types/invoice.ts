import { Company } from './company';
import { Transaction } from './transaction';

export interface Invoice {
  _id: string;
  transactions: Transaction[];
  company: Company;
  addressedTo: string;
  buyer: string;
  seller: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewInvoice {
  company: string;
  transactions: string[];
  addressedTo: string;
  buyer: string;
  seller: string;
}
