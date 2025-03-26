import * as z from 'zod';

export const registerCompnaySchema = z.object({
  companyName: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  logo: z.instanceof(File),
});

export const addProductSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  company: z.string().min(1, 'Company is required'),
});

export const updateProductSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
});

export const addTransactionSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  company: z.string().min(1, 'Company is required'),
  currency: z.enum(['IQD', 'USD']),
});

export const updateTransactionSchema = z.object({
  currency: z.string().min(1, 'Currency is required'),
});

export const addExpenseSchema = z.object({
  name: z.string().min(1, 'Expense name is required'),
  amount: z.number().min(1, 'Expense amount is required'),
});

export const addInvoiceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  addressedTo: z.string().min(1, 'Addressed To is required'),
  buyer: z.string().min(1, 'Buyer is required'),
  seller: z.string().min(1, 'Seller is required'),
});

export const uploadInvoiceSchema = z.object({
  invoice: z.instanceof(File),
  name: z.string().min(1, 'Name is required'),
});

export const loginSchema = z.object({
  passcode: z.string().min(1, 'Passcode is required'),
});
