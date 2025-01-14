import * as z from 'zod';

export const registerCompnaySchema = z.object({
  name: z.string().min(1),
  address: z.optional(z.string()),
  logo: z.optional(z.string()),
});
