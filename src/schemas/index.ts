import * as z from 'zod';

export const registerCompnaySchema = z.object({
  companyName: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  logoPath: z.string().min(1, 'Logo is required'),
});

export const addProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
});

export const addTransactionSchema = z.object({
  productName: z.string().min(1, 'Product is required'),
  currency: z.enum(['IQD', 'USD']),
  type: z.enum(['BUY', 'SELL']),
  pricePerUnit: z.number().min(1, 'Price Per Unit is required'),
  quantity: z.number().min(1, 'Quantity is required'),
});
