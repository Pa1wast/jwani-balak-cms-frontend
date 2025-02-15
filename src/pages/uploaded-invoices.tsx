import * as z from 'zod';

import UploadedInvoice from '@/components/invoice/uploaded-invoice';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { uploadInvoiceSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadCloud } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useUploadedInvoices } from '@/features/invoice.ts/useUploadedInvoices';
import Loader from '@/components/ui/loader';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { useUploadInvoice } from '@/features/invoice.ts/useUploadInvoice';

function UploadedInvoices() {
  const { isLoading, uploadedInvoices } = useUploadedInvoices();
  const { isUploading, uploadInvoice } = useUploadInvoice();
  const { selectedCompanyId } = useCompaniesView();

  const form = useForm<z.infer<typeof uploadInvoiceSchema>>({
    resolver: zodResolver(uploadInvoiceSchema),
    defaultValues: { name: '' },
  });

  function onSubmit(values: z.infer<typeof uploadInvoiceSchema>) {
    const { success, data } = uploadInvoiceSchema.safeParse(values);

    if (success) {
      const uploadedInvoice = { ...data, company: selectedCompanyId as string };
      uploadInvoice(uploadedInvoice);
    }
  }

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-6">
            <UploadCloud /> Upload Invoice
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload an invoice</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>

                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="invoice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Invoice</FormLabel>

                    <FormControl className="cursor-pointer">
                      <Input
                        type="file"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isUploading}>
                <UploadCloud /> Upload
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {isLoading ? (
          <Loader size="lg" className="col-span-6 mt-40" />
        ) : uploadedInvoices?.length ? (
          uploadedInvoices?.map(invoice => <UploadedInvoice key={invoice._id} invoice={invoice} />)
        ) : (
          <div className="col-span-6 mt-40 mx-auto">No results.</div>
        )}
      </div>
    </div>
  );
}

export default UploadedInvoices;
