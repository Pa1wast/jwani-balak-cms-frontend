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
import { currencyTypes, Transaction, UpdatedTransaction } from '@/types/transaction';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  useUpdateBuyTransaction,
  useUpdateSellTransaction,
} from '@/features/transaction/useUpdateTransaction';

interface AddTransactionFormProps {
  transaction: Transaction;
}

function UpdateTransactionForm({ transaction }: AddTransactionFormProps) {
  const { updateBuyTransaction, isUpdating } = useUpdateBuyTransaction();
  const { updateSellTransaction, isUpdating: isUpdating2 } = useUpdateSellTransaction();

  const form = useForm<z.infer<typeof updateTransactionSchema>>({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: { currency: transaction.currency },
  });

  function onSubmit(values: z.infer<typeof updateTransactionSchema>) {
    const { success, data } = updateTransactionSchema.safeParse({
      ...values,
      currency: values.currency as 'USD' | 'IQD' | undefined,
    });

    if (!success) return;

    if ('expense' in transaction) {
      updateBuyTransaction({
        transactionId: transaction._id,
        updatedTransaction: data as UpdatedTransaction,
      });
    } else {
      updateSellTransaction({
        transactionId: transaction._id,
        updatedTransaction: data as UpdatedTransaction,
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

        <Button type="submit" disabled={isUpdating || isUpdating2}>
          Update Transaction
        </Button>
      </form>
    </Form>
  );
}

export default UpdateTransactionForm;
