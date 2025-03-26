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

export interface ExchangeRate {
  _id: string;
  rate: number;
  createdAt: string;
  updatedAt: string;
}

export interface BuyTransaction {
  _id: string;
  label: string;
  currency: 'USD' | 'IQD';
  products: ComposedProduct[];
  company: Company;
  expenses?: Expense[];
  createdAt: string;
  updatedAt: string;
}

export interface SellTransaction {
  _id: string;
  label: string;
  currency: 'USD' | 'IQD';
  products: ComposedProduct[];
  company: Company;
  createdAt: string;
  updatedAt: string;
}

export interface NewBuyTransaction {
  label: string;
  currency: 'USD' | 'IQD';
  products: ComposedProduct[];
  company: string;
  expenses?: Expense[];
}

export interface NewSellTransaction {
  label: string;
  currency: 'USD' | 'IQD';
  products: ComposedProduct[];
  company: string;
}

export interface UpdatedTransaction {
  currency?: 'USD' | 'IQD';
  products?: ComposedProduct[];
  expenses?: Expense[];
}

export type Transaction = BuyTransaction | SellTransaction;
