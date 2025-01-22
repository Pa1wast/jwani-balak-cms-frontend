import * as z from 'zod';
import { useForm } from 'react-hook-form';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { registerCompnaySchema } from '@/schemas';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateCompany } from '@/features/company/useUpdateCompany';
import { Company } from '@/types/company';

interface UpdateCompanyFormProps {
  company: Company;
}

function UpdateCompanyForm({ company }: UpdateCompanyFormProps) {
  const { isUpdating, updateCompany } = useUpdateCompany();
  const { _id, companyName, address } = company;

  const form = useForm<z.infer<typeof registerCompnaySchema>>({
    resolver: zodResolver(registerCompnaySchema),
    defaultValues: { companyName, address },
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
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Logo</FormLabel>

              <FormControl className="cursor-pointer">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
                      if (!validImageTypes.includes(file.type)) {
                        alert('Please select a valid image file (JPEG, PNG, GIF).');
                        return;
                      }

                      field.onChange(file);
                    }
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

        <Button type="submit" disabled={isUpdating}>
          <Plus /> Update
        </Button>
      </form>
    </Form>
  );
}

export default UpdateCompanyForm;
