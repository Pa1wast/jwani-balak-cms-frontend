import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { addInvoiceSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddInvoice } from '@/features/invoice.ts/useAddInvoice';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { Transaction } from '@/types/transaction';

interface AddInvoiceFormProps {
  transactions: Transaction[];
}

function AddInvoiceForm({ transactions }: AddInvoiceFormProps) {
  const { selectedCompanyId } = useCompaniesView();

  const { isAdding, addInvoice } = useAddInvoice();

  const form = useForm<z.infer<typeof addInvoiceSchema>>({
    resolver: zodResolver(addInvoiceSchema),
    defaultValues: {
      company: selectedCompanyId as string,
      addressedTo: '',
      buyer: '',
      seller: '',
    },
  });

  function onSubmit(values: z.infer<typeof addInvoiceSchema>) {
    const { success, data } = addInvoiceSchema.safeParse(values);

    if (success)
      addInvoice({ ...data, transactions: transactions.map(transaction => transaction._id) });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="addressedTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Addressed to</FormLabel>

              <FormControl>
                <Input type="text" {...field} placeholder=".....بەڕێز" className="text-right" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buyer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buyer</FormLabel>

              <FormControl>
                <Input type="text" {...field} placeholder=".....بەڕێز" className="text-right" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seller"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seller</FormLabel>

              <FormControl>
                <Input type="text" {...field} placeholder=".....بەڕێز" className="text-right" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isAdding}>
          Generate invoice
        </Button>
      </form>
    </Form>
  );
}

export default AddInvoiceForm;
