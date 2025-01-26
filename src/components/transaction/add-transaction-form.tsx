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
import { useEffect, useState } from 'react';
import { useProducts } from '@/features/product/useProducts';
import { Product } from '@/types/product';
import Loader from '../ui/loader';
import { useAddTransaction } from '@/features/transaction/useAddTransaction';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { useTransactionsByProductId } from '@/features/transaction/useTransactionsByProductId';
import { formatPrice } from '@/lib/price';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

function AddTransactionForm() {
  const { selectedCompanyId } = useCompaniesView();

  const { isLoading, products } = useProducts();
  const { isAdding, addTransaction } = useAddTransaction();

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof addTransactionSchema>>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      transactionType: 'BUY',
      currency: 'IQD',
      buyTransaction: '',
      product: '',
      company: selectedCompanyId as string,
      pricePerUnit: 0,
      quantity: 0,
    },
  });

  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedTransactionId, setSelectedTransactionId] = useState('');

  const { transactions } = useTransactionsByProductId(selectedProductId);

  const buyTransactions = transactions?.filter(
    transaction =>
      transaction.transactionType.toUpperCase() === transactionTypes.BUY &&
      transaction?.product?._id === selectedProductId
  );

  const selectedBuyTransaction = buyTransactions?.find(
    transaction => transaction._id === selectedTransactionId
  );

  const availableQuantity = selectedBuyTransaction
    ? selectedBuyTransaction.quantity - (selectedBuyTransaction.soldQuantity as number)
    : 0;

  const [quantityError, setQuantityError] = useState(false);

  const [expenses, setExpenses] = useState<{ name: string; amount: number }[]>([]);

  const addExpense = () => {
    setExpenses([...expenses, { name: '', amount: 0 }]);
  };

  const updateExpense = (index: number, field: 'name' | 'amount', value: string) => {
    const updatedExpenses = [...expenses];
    if (field === 'amount') {
      if (!isNaN(Number(value))) updatedExpenses[index].amount = +value;
    } else {
      updatedExpenses[index].name = value;
    }
    setExpenses(updatedExpenses);
  };

  const removeExpense = (index: number) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  function onSubmit(values: z.infer<typeof addTransactionSchema>) {
    const { success, data } = addTransactionSchema.safeParse(values);

    if (success) {
      if (expenses.length && expenses.every(expense => !expense.name || !expense.amount)) {
        toast.error('Please fill all expenses fields');
        return;
      }

      const newTransaction = { ...data, expenses };

      if (newTransaction.transactionType === transactionTypes.SELL) {
        const currency = buyTransactions.find(
          transaction => transaction._id === newTransaction.buyTransaction
        )!.currency;
        newTransaction.currency = currency;
      }

      addTransaction(newTransaction);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-3">
              <FormLabel>Product</FormLabel>
              {!isLoading ? (
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
                          ? products?.find((product: Product) => product._id === field.value)
                              ?.productName
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
                          {products?.map((product: Product) => (
                            <CommandItem
                              value={product._id}
                              key={product._id}
                              onSelect={() => {
                                form.setValue('product', product._id);
                                setSelectedProductId(product._id);

                                const hasBuyTransactions = transactions?.some(
                                  transaction =>
                                    transaction.transactionType.toUpperCase() ===
                                      transactionTypes.BUY &&
                                    transaction?.product?._id === product._id
                                );

                                if (!hasBuyTransactions) {
                                  form.setValue('buyTransaction', '');
                                  setSelectedTransactionId('');
                                }
                              }}
                            >
                              {product?.productName}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  product._id === field.value ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              ) : (
                <Loader />
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        {form.getValues('transactionType').toUpperCase() === transactionTypes.SELL && (
          <FormField
            control={form.control}
            name="buyTransaction"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-3">
                <FormLabel>Buy Transaction</FormLabel>
                {!isLoading ? (
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
                          {field.value ? (
                            <div className="flex gap-1 w-full items-center justify-between">
                              <span className="font-bold">
                                {formatPrice(
                                  buyTransactions?.find(
                                    buyTransaction => buyTransaction._id === field.value
                                  )?.pricePerUnit as number,
                                  buyTransactions?.find(
                                    buyTransaction => buyTransaction._id === field.value
                                  )?.currency as currencyTypes
                                )}
                              </span>
                              -
                              <span className="font-bold">
                                x
                                {
                                  buyTransactions?.find(
                                    buyTransaction => buyTransaction._id === field.value
                                  )?.quantity as number
                                }
                              </span>
                            </div>
                          ) : (
                            'Select transaction'
                          )}

                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search transaction..." className="h-9" />
                        <CommandList>
                          <CommandEmpty>
                            No transactions with the selected product found.
                          </CommandEmpty>

                          <CommandGroup>
                            {buyTransactions?.map(buyTransaction => (
                              <CommandItem
                                value={buyTransaction._id}
                                key={buyTransaction._id}
                                onSelect={() => {
                                  form.setValue('buyTransaction', buyTransaction._id);
                                  setSelectedTransactionId(buyTransaction._id);
                                }}
                              >
                                <div className="flex gap-1 items-center justify-between w-full">
                                  <span className="font-bold">
                                    {formatPrice(
                                      buyTransaction.pricePerUnit,
                                      buyTransaction.currency as currencyTypes
                                    )}
                                  </span>
                                  -<span className="font-bold">x{buyTransaction.quantity}</span>
                                </div>
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    buyTransaction._id === field.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Loader />
                )}

                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="transactionType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Transaction Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-6"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0 ">
                      <FormControl>
                        <RadioGroupItem
                          value={transactionTypes.BUY}
                          className="text-blue-500 border-blue-500"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Buy</FormLabel>
                    </FormItem>

                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value={transactionTypes.SELL}
                          className="text-green-500 border-green-500"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Sell</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.getValues('transactionType').toUpperCase() === transactionTypes.BUY && (
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
          )}
        </div>
        <FormField
          control={form.control}
          name="pricePerUnit"
          render={({ field }) => (
            <FormItem className="space-y-3 flex-1">
              <FormLabel>Price / Unit</FormLabel>

              <FormControl>
                <Input
                  type="text"
                  {...field}
                  onChange={e => {
                    const value = e.target.value;
                    if (!isNaN(Number(value))) field.onChange(Number(value));
                  }}
                />
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
              <div className="flex gap-1 items-center">
                <FormLabel>Quantity</FormLabel>
                {quantityError && (
                  <span className="bg-red-50 text-red-500 px-1 rounded-lg text-xs font-semibold">
                    The available quantity is {availableQuantity}!
                  </span>
                )}
              </div>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  onChange={e => {
                    const value = e.target.value;
                    if (!isNaN(Number(value))) {
                      if (
                        form.getValues('transactionType') === transactionTypes.SELL &&
                        Number(value) > availableQuantity
                      ) {
                        setQuantityError(true);
                      } else {
                        setQuantityError(false);
                        field.onChange(Number(value));
                      }
                    }
                  }}
                  disabled={!form.getValues('product')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.getValues('transactionType').toUpperCase() === transactionTypes.BUY && (
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
        )}

        <Button type="submit" disabled={isAdding}>
          <Plus /> Add Transaction
        </Button>
      </form>
    </Form>
  );
}

export default AddTransactionForm;
