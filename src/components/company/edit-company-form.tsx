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
import { useUpdateCompany } from '@/features/company/useUpdateCompany';
import { Company } from '@/types/company';

interface EditCompanyFormProps {
  company: Company;
}

function EditCompanyForm({ company }: EditCompanyFormProps) {
  const { isUpdating, updateCompany } = useUpdateCompany();
  const { _id, companyName, logoPath, address } = company;

  const form = useForm<z.infer<typeof registerCompnaySchema>>({
    resolver: zodResolver(registerCompnaySchema),
    defaultValues: { companyName, address, logoPath: '' },
  });

  function onSubmit(values: z.infer<typeof registerCompnaySchema>) {
    const { success, data } = registerCompnaySchema.safeParse(values);
    if (success) updateCompany({ companyId: _id, updatedCompany: data });
  }

  return (
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

        <Button type="submit" disabled={isUpdating}>
          <Plus /> Update
        </Button>
      </form>
    </Form>
  );
}

export default EditCompanyForm;
