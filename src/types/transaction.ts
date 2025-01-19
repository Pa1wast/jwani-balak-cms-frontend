import { Company } from './company';
import { Product } from './product';

export enum transactionTypes {
  SELL = 'SELL',
  BUY = 'BUY',
  ALL = 'ALL',
}

export enum currencyTypes {
  ALL = 'ALL',
  USD = 'USD',
  IQD = 'IQD',
}

export interface Expense {
  _id?: string;
  name: string;
  amount: number;
}

export interface Transaction {
  _id: string;
  transactionType: 'SELL' | 'BUY';
  currency: 'USD' | 'IQD';
  pricePerUnit: number;
  quantity: number;
  product: Product;
  company: Company;
  expenses?: Expense[];
  createdAt: string;
  updatedAt: string;
}

export interface NewTransaction {
  transactionType: 'SELL' | 'BUY';
  currency: 'USD' | 'IQD';
  pricePerUnit: number;
  quantity: number;
  product: string;
  company: string;
  expenses?: Expense[];
}

export interface UpdatedTransaction {
  currency?: 'USD' | 'IQD';
  pricePerUnit?: number;
  quantity?: number;
  expenses?: Expense[];
}
