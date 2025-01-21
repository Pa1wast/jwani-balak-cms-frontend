import * as z from 'zod';

export const registerCompnaySchema = z.object({
  companyName: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  logoPath: z.string().min(1, 'Logo is required'),
});

export const addProductSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  company: z.string().min(1, 'Company is required'),
});

export const updateProductSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
});

export const addTransactionSchema = z.object({
  product: z.string().min(1, 'Product is required'),
  buyTransaction: z.optional(z.string()),
  company: z.string().min(1, 'Company is required'),
  currency: z.enum(['IQD', 'USD']),
  transactionType: z.enum(['BUY', 'SELL']),
  pricePerUnit: z.number().min(1, 'Price Per Unit is required'),
  quantity: z.number().min(1, 'Quantity is required'),
});

export const updateTransactionSchema = z.object({
  currency: z.enum(['IQD', 'USD']),
  pricePerUnit: z.number().min(1, 'Price Per Unit is required'),
  quantity: z.number().min(1, 'Quantity is required'),
});

export const addExpenseSchema = z.object({
  name: z.string().min(1, 'Expense name is required'),
  amount: z.number().min(1, 'Expense amount is required'),
});

export const addInvoiceSchema = z.object({
  product: z.string().min(1, 'Product is required'),
  company: z.string().min(1, 'Company is required'),
  addressedTo: z.string().min(1, 'Addressed To is required'),
});
