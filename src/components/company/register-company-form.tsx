import * as z from 'zod';
import { useForm } from 'react-hook-form';

import { Plus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { registerCompnaySchema } from '@/schemas';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddCompany } from '@/features/company/useAddCompany';

function RegisterCompanyForm() {
  const { isAdding, addCompany } = useAddCompany();
  const form = useForm<z.infer<typeof registerCompnaySchema>>({
    resolver: zodResolver(registerCompnaySchema),
    defaultValues: { companyName: '', address: '', logoPath: '' },
  });

  function onSubmit(values: z.infer<typeof registerCompnaySchema>) {
    const { success, data } = registerCompnaySchema.safeParse(values);
    if (success) addCompany(data);
  }

  return (
    <Dialog onOpenChange={() => form.reset()}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Register Company
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register a company</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Name</FormLabel>

                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Address</FormLabel>

                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logoPath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Logo</FormLabel>

                  <FormControl className="cursor-pointer">
                    <Input {...field} type="file" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isAdding}>
              <Plus /> Register
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterCompanyForm;
