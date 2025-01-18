import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Plus } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { addProductSchema } from '@/schemas';

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
import { useCompaniesView } from '@/contexts/companies-view-context';
import { useAddProduct } from '@/features/product/useAddProduct';

function AddProductForm() {
  const { selectedCompanyId } = useCompaniesView();
  const { isAdding, addProduct } = useAddProduct();

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: { productName: '', company: selectedCompanyId as string },
  });

  function onSubmit(values: z.infer<typeof addProductSchema>) {
    const { success, data } = addProductSchema.safeParse(values);

    if (success) addProduct(data);
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

        <Button type="submit" disabled={isAdding}>
          <Plus /> Add
        </Button>
      </form>
    </Form>
  );
}

export default AddProductForm;
