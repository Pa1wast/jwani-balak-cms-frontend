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

import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { currencyTypes, Transaction } from '@/types/transaction';
import { Input } from '../ui/input';

import { useUpdateTransaction } from '@/features/transaction/useUpdateTransaction';

interface AddTransactionFormProps {
  transaction: Transaction;
}

function UpdateTransactionForm({ transaction }: AddTransactionFormProps) {
  const { isUpdating, updateTransaction } = useUpdateTransaction();

  const form = useForm<z.infer<typeof updateTransactionSchema>>({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      currency: transaction.currency,
      pricePerUnit: transaction.pricePerUnit,
      quantity: transaction.quantity,
    },
  });

  function onSubmit(values: z.infer<typeof updateTransactionSchema>) {
    const { success, data } = updateTransactionSchema.safeParse(values);

    if (success) updateTransaction({ transactionId: transaction._id, updatedTransaction: data });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-6"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value={currencyTypes.IQD}
                          className="text-orange-500 border-orange-500"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">IQD</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value={currencyTypes.USD}
                          className="text-cyan-500 border-cyan-500"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">USD</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
              <FormLabel>Quantity</FormLabel>

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

        <Button type="submit" disabled={isUpdating}>
          Update Transaction
        </Button>
      </form>
    </Form>
  );
}

export default UpdateTransactionForm;
