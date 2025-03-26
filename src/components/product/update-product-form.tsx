import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Plus } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { updateProductSchema } from '@/schemas';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { useUpdateProduct } from '@/features/product/useUpdateProduct';

interface UpdateProductFormProps {
  product: Product;
}

function UpdateProductForm({ product }: UpdateProductFormProps) {
  const { isUpdating, updateProduct } = useUpdateProduct();

  const form = useForm<z.infer<typeof updateProductSchema>>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: { productName: product.productName },
  });

  function onSubmit(values: z.infer<typeof updateProductSchema>) {
    const { success, data } = updateProductSchema.safeParse(values);

    if (success) updateProduct({ productId: product._id, updatedProduct: data });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isUpdating}>
          <Plus /> Update
        </Button>
      </form>
    </Form>
  );
}

export default UpdateProductForm;
