import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updateTransactionSchema } from '@/schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { BuyTransaction } from '@/types/transaction';
import { Input } from '../ui/input';

interface AddTransactionFormProps {
  transaction: BuyTransaction;
}

function UpdateTransactionForm({ transaction }: AddTransactionFormProps) {
  const form = useForm<z.infer<typeof updateTransactionSchema>>({
    resolver: zodResolver(updateTransactionSchema),
  });

  function onSubmit(values: z.infer<typeof updateTransactionSchema>) {}

  return (
    <Form {...form}>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit(form.getValues());
        }}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="pricePerUnit"
          render={({ field }) => (
            <FormItem className="space-y-3 flex-1">
              <FormLabel>Price / Unit</FormLabel>

              <FormControl>
                <Input
                  type="text"
                  {...field}
                  onChange={e => {
                    const value = e.target.value;
                    if (!isNaN(Number(value))) field.onChange(Number(value));
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="space-y-3 flex-1">
              <div className="flex gap-1 items-center">
                <FormLabel>Quantity</FormLabel>
              </div>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update Transaction</Button>
      </form>
    </Form>
  );
}

export default UpdateTransactionForm;
