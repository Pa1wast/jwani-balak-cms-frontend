import * as z from 'zod';
import { addExpenseSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { BuyTransaction } from '@/types/transaction';
import { useUpdateBuyTransaction } from '@/features/transaction/useUpdateTransaction';

interface AddExpenseFormProps {
  transaction: BuyTransaction;
}

function AddExpenseForm({ transaction }: AddExpenseFormProps) {
  const { isUpdating, updateBuyTransaction } = useUpdateBuyTransaction();

  const form = useForm<z.infer<typeof addExpenseSchema>>({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: { name: '', amount: 0 },
  });

  function onSubmit(values: z.infer<typeof addExpenseSchema>) {
    const { success, data } = addExpenseSchema.safeParse(values);

    if (!success) return;

    const buyTransaction = transaction as BuyTransaction;

    const updatedExpenses = buyTransaction.expenses ? [...buyTransaction.expenses, data] : [data];

    updateBuyTransaction({
      transactionId: transaction._id,
      updatedTransaction: {
        expenses: updatedExpenses,
      },
    });
  }

  return (
    <Form {...form}>
      <form className="flex gap-2 w-full flex-col" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-2 w-full">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    onChange={e => {
                      const value = e.target.value;
                      if (!isNaN(Number(value)) && value.length <= 20)
                        field.onChange(Number(value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" variant="outline" disabled={isUpdating}>
          <Plus /> Add Expense
        </Button>
      </form>
    </Form>
  );
}

export default AddExpenseForm;
