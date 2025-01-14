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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { registerCompnaySchema } from '@/schemas';
import { Input } from './input';

function RegisterCompanyForm() {
  const form = useForm<z.infer<typeof registerCompnaySchema>>({
    defaultValues: { name: '', address: '', logo: '' },
  });

  function onSubmit(values: z.infer<typeof registerCompnaySchema>) {
    const { success, data } = registerCompnaySchema.safeParse(values);
    if (success) console.log({ data });
  }

  return (
    <Dialog>
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Name <span className="text-destructive dark:text-red-500">*</span>
                  </FormLabel>

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
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Logo</FormLabel>

                  <FormControl>
                    <Input {...field} type="file" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              <Plus /> Register
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterCompanyForm;
