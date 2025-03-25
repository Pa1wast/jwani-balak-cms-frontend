import { Company } from './company';
import { ComposedProduct } from './product';

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

export interface BuyTransaction {
  _id: string;
  currency: 'USD' | 'IQD';
  products: ComposedProduct[];
  company: Company;
  expenses?: Expense[];
  createdAt: string;
  updatedAt: string;
}

export interface SellTransaction {
  _id: string;
  currency: 'USD' | 'IQD';
  products: ComposedProduct[];
  company: Company;
  createdAt: string;
  updatedAt: string;
}
