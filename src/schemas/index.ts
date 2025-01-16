import * as z from 'zod';

export const registerCompnaySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  address: z.optional(z.string()),
  logo: z.optional(z.string()),
});

export const addProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
});
