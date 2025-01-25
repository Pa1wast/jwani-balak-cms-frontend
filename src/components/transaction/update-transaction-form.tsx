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

import { Transaction, transactionTypes } from '@/types/transaction';
import { Input } from '../ui/input';

import { useUpdateTransaction } from '@/features/transaction/useUpdateTransaction';
import { useTransactions } from '@/features/transaction/useTransactions';
import { useState } from 'react';

interface AddTransactionFormProps {
  transaction: Transaction;
}

function UpdateTransactionForm({ transaction }: AddTransactionFormProps) {
  const { isUpdating, updateTransaction } = useUpdateTransaction();
  const { transactions } = useTransactions();
  const [quantityError, setQuantityError] = useState(false);

  const form = useForm<z.infer<typeof updateTransactionSchema>>({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      pricePerUnit: transaction.pricePerUnit,
      quantity: transaction.quantity,
    },
  });

  // SELL Transaction
  const buyTransaction = transactions?.find(item => item._id === transaction.buyTransaction);

  const availableQuantity = buyTransaction
    ? buyTransaction.quantity - (buyTransaction.soldQuantity as number)
    : 0;

  function onSubmit(values: z.infer<typeof updateTransactionSchema>) {
    const { success, data } = updateTransactionSchema.safeParse(values);

    if (success) {
      updateTransaction({
        transactionId: transaction._id,
        updatedTransaction: { ...data, transactionType: transaction.transactionType },
      });
    }
  }

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
                {quantityError && (
                  <span className="bg-red-50 text-red-500 px-1 rounded-lg text-xs font-semibold">
                    The available quantity is {availableQuantity}!
                  </span>
                )}
              </div>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  onChange={e => {
                    const value = e.target.value;
                    if (!isNaN(Number(value))) {
                      if (
                        transaction.transactionType.toUpperCase() === transactionTypes.SELL &&
                        Number(value) > availableQuantity
                      ) {
                        setQuantityError(true);
                      } else {
                        setQuantityError(false);
                        field.onChange(Number(value));
                      }
                    }
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
