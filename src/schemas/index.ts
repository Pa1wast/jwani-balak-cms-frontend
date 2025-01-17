import * as z from 'zod';

export const registerCompnaySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  address: z.optional(z.string()),
  logo: z.optional(z.string()),
});

export const addProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
});

export const addTransactionSchema = z.object({
  productName: z.string().min(1, 'Product is required'),
  currency: z.enum(['IQD', 'USD']),
  type: z.enum(['BUY', 'SELL']),
  pricePerUnit: z.string().min(1, 'Price Per Unit is required'),
  quantity: z.string().min(1, 'Quantity is required'),
});
