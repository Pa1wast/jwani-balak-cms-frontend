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

function UploadedInvoices() {
  const form = useForm<z.infer<typeof uploadInvoiceSchema>>({
    resolver: zodResolver(uploadInvoiceSchema),
  });

  function onSubmit(values: z.infer<typeof uploadInvoiceSchema>) {
    console.log(values);
  }

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger>
          <Button>
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

              <Button type="submit">
                <UploadCloud /> Upload
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        <UploadedInvoice />
        <UploadedInvoice />
        <UploadedInvoice />
        <UploadedInvoice />
        <UploadedInvoice />
        <UploadedInvoice />
        <UploadedInvoice />
        <UploadedInvoice />
        <UploadedInvoice />
        <UploadedInvoice />
        <UploadedInvoice />
        <UploadedInvoice />
        <UploadedInvoice />
        <UploadedInvoice />
        <UploadedInvoice />
      </div>
    </div>
  );
}

export default UploadedInvoices;
