export enum transactionTypes {
  SELL = 'SELL',
  BUY = 'BUY',
  ALL = 'ALL',
}

export enum currencyTypes {
  USD = 'USD',
  IQD = 'IQD',
}

export interface Expense {
  name: string;
  amount: number;
}

export interface Transaction {
  id: string;
  type: 'SELL' | 'BUY';
  currency: 'USD' | 'IQD';
  pricePerUnit: number;
  quantity: number;
  productName: string;
  expenses: Expense[];
}
