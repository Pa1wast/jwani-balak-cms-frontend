import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Check, ChevronsUpDown, Plus, Trash2 } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { addTransactionSchema } from '@/schemas';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { data as products } from '@/components/product/products-data-table';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { currencyTypes, transactionTypes } from '@/types/transaction';
import { Input } from '../ui/input';
import { useState } from 'react';

function AddTransactionForm() {
  const form = useForm<z.infer<typeof addTransactionSchema>>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      type: 'SELL',
      currency: 'IQD',
      productName: '',
      pricePerUnit: '',
      quantity: '',
    },
  });

  function onSubmit(values: z.infer<typeof addTransactionSchema>) {
    console.log(
      values,
      expenses.filter(expense => !(!expense.name || !expense.amount))
    );
  }

  const [expenses, setExpenses] = useState<{ name: string; amount: string }[]>([]);

  const addExpense = () => {
    setExpenses([...expenses, { name: '', amount: '' }]);
  };

  const updateExpense = (index: number, field: 'name' | 'amount', value: string) => {
    const updatedExpenses = [...expenses];
    if (field === 'amount') {
      updatedExpenses[index].amount = value;
    } else {
      updatedExpenses[index].name = value;
    }
    setExpenses(updatedExpenses);
  };

  const removeExpense = (index: number) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-3">
              <FormLabel>Product</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        ' justify-between truncate',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? products.find(product => product.name === field.value)?.name
                        : 'Select product'}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search product..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No products found.</CommandEmpty>
                      <CommandGroup>
                        {products.map(product => (
                          <CommandItem
                            value={product.name}
                            key={product.id}
                            onSelect={() => {
                              form.setValue('productName', product.name);
                            }}
                          >
                            {product.name}
                            <Check
                              className={cn(
                                'ml-auto',
                                product.name === field.value ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Transaction Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-6"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={transactionTypes.SELL} />
                      </FormControl>
                      <FormLabel className="font-normal">Sell</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={transactionTypes.BUY} />
                      </FormControl>
                      <FormLabel className="font-normal">Buy</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                        <RadioGroupItem value={currencyTypes.IQD} />
                      </FormControl>
                      <FormLabel className="font-normal">IQD</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={currencyTypes.USD} />
                      </FormControl>
                      <FormLabel className="font-normal">USD</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="pricePerUnit"
          render={({ field }) => (
            <FormItem className="space-y-3 flex-1">
              <FormLabel>Price / Unit</FormLabel>

              <FormControl>
                <Input type="text" {...field} />
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
              <FormLabel>Quantity</FormLabel>

              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-4">
          <FormLabel>Expenses</FormLabel>
          {expenses.map((expense, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex gap-2 items-center">
                <Input
                  type="text"
                  placeholder="Expense name"
                  value={expense.name}
                  onChange={e => updateExpense(index, 'name', e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Amount"
                  value={expense.amount}
                  onChange={e => updateExpense(index, 'amount', e.target.value)}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => removeExpense(index)}
                className="text-destructive dark:text-red-500"
              >
                <Trash2 />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addExpense}>
            <Plus /> Add Expense
          </Button>
        </div>

        <Button type="submit">
          <Plus /> Add Transaction
        </Button>
      </form>
    </Form>
  );
}

export default AddTransactionForm;
