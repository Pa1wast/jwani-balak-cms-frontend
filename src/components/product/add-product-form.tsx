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

function AddProductForm() {
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: { name: '' },
  });

  function onSubmit(values: z.infer<typeof addProductSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
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
        <Button type="submit">
          <Plus /> Add
        </Button>
      </form>
    </Form>
  );
}

export default AddProductForm;
