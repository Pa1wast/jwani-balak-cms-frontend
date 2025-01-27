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
  buyTransaction?: string;
  pricePerUnit: number;
  quantity: number;
  product: Product;
  company: Company;
  soldQuantity?: number;
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
  soldQuantity?: number;
}

export interface UpdatedTransaction {
  transactionType: 'SELL' | 'BUY';
  currency?: 'USD' | 'IQD';
  pricePerUnit?: number;
  quantity?: number;
  soldQuantity?: number;
  expenses?: Expense[];
  buyTransaction?: string;
  oldQuantity?: number;
}
