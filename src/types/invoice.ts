import { Company } from './company';
import { Transaction } from './transaction';

export interface Invoice {
  _id: string;
  NO: number;
  transactions: Transaction[];
  company: Company;
  addressedTo: string;
  buyer: string;
  seller: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadedInvoice {
  _id: string;
  company: string;
  filePath: string;
  name: string;
}

export interface NewInvoice {
  company: string;
  transactions: string[];
  addressedTo: string;
  buyer: string;
  seller: string;
}

export interface NewUploadedInvoice {
  company: string;
  invoice: File;
  name: string;
}
