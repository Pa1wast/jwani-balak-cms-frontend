import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Plus, Trash2 } from 'lucide-react';

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

import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { currencyTypes, transactionTypes } from '@/types/transaction';
import { Input } from '../ui/input';
import { useState } from 'react';
import { useProducts } from '@/features/product/useProducts';

import {
  useAddBuyTransaction,
  useAddSellTransaction,
} from '@/features/transaction/useAddTransaction';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { Label } from '../ui/label';
import { ComposedProduct } from '@/types/product';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';

function AddTransactionForm() {
  const { selectedCompanyId } = useCompaniesView();

  const { products } = useProducts();
  const { isAdding: isAddingBuy, addBuyTransaction } = useAddBuyTransaction();
  const { isAdding: isAddingSell, addSellTransaction } = useAddSellTransaction();

  const form = useForm<z.infer<typeof addTransactionSchema>>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      company: selectedCompanyId as string,
      currency: currencyTypes.IQD,
      label: '',
    },
  });

  const [transactionType, setTransactionType] = useState<
    transactionTypes.BUY | transactionTypes.SELL
  >(transactionTypes.BUY);

  const [selectedProductId, setSelectedProductId] = useState('');

  const [expenses, setExpenses] = useState<{ name: string; amount: number }[]>([]);
  const [composedProducts, setComposedProducts] = useState<ComposedProduct[]>([]);

  const addProduct = () => {
    const selectedProduct = products?.find(p => p._id === selectedProductId);

    if (selectedProduct) {
      setComposedProducts([
        ...composedProducts,
        {
          product: selectedProduct._id,
          quantity: 0,
          pricePerUnit: 0,
        },
      ]);
    }
  };

  const updateProduct = (index: number, field: 'pricePerUnit' | 'quantity', value: string) => {
    const updatedProducts = [...composedProducts];
    if (field === 'quantity' || field === 'pricePerUnit') {
      if (!isNaN(Number(value))) updatedProducts[index][field] = +value;
    }
    setComposedProducts(updatedProducts);
  };

  const removeProduct = (index: number) => {
    const updatedComposedProducts = composedProducts.filter((_, i) => i !== index);
    setComposedProducts(updatedComposedProducts);
  };

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

    if (composedProducts.length === 0) {
      toast.error('Please add products');
      return;
    }

    if (composedProducts.some(product => product.pricePerUnit === 0 || product.quantity === 0)) {
      toast.error('Please fill in all product details');
      return;
    }

    if (
      transactionType === transactionTypes.BUY &&
      expenses.some(expense => expense.amount === 0 || expense.name === '')
    ) {
      toast.error('Please fill in all expense details');
      return;
    }

    if (!success) {
      toast.error('Please fill in all details correctly');
      return;
    }

    if (transactionType === transactionTypes.BUY) {
      addBuyTransaction({ ...data, products: composedProducts, expenses });
    } else {
      addSellTransaction({ ...data, products: composedProducts });
    }
  }

  console.log(composedProducts);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-4">
          <Label>Transaction Type</Label>

          <RadioGroup
            onValueChange={value =>
              setTransactionType(value as transactionTypes.BUY | transactionTypes.SELL)
            }
            defaultValue={transactionType}
            className="flex items-center gap-6"
          >
            <div className="flex gap-2">
              <RadioGroupItem
                value={transactionTypes.BUY}
                className="text-blue-500 border-blue-500"
              />
              <Label>Buy</Label>
            </div>

            <div className="flex gap-2">
              <RadioGroupItem
                value={transactionTypes.SELL}
                className="text-green-500 border-green-500"
              />
              <Label>Sell</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between">
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
        </div>

        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-4">
          <FormLabel>Products</FormLabel>

          <Select onValueChange={setSelectedProductId} value={selectedProductId}>
            <SelectTrigger>
              <SelectValue
                placeholder={
                  selectedProductId
                    ? products?.find(p => p._id === selectedProductId)?.productName
                    : 'Select product'
                }
              />
            </SelectTrigger>

            <SelectContent>
              {products?.map(product => (
                <SelectItem
                  key={product._id}
                  value={product._id}
                  className="cursor-pointer hover:opacity-80"
                  onClick={() => setSelectedProductId(product._id)}
                >
                  {product.productName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type="button" variant="outline" onClick={addProduct}>
            <Plus /> Add Product
          </Button>

          <div className="flex flex-col gap-4">
            {composedProducts.map((product, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-4 bg-foreground/10 p-2 rounded-md"
              >
                <div className="flex items-center w-full">
                  <p className="flex-1">
                    {products?.find(p => p._id === product.product)?.productName}
                  </p>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeProduct(index)}
                    className="text-destructive dark:text-red-500"
                  >
                    <Trash2 />
                  </Button>
                </div>

                <div className="flex gap-2 items-center w-full justify-between">
                  <div className="space-y-2">
                    <Label>Price / Unit</Label>
                    <Input
                      type="text"
                      placeholder="Price / Unit"
                      value={product.pricePerUnit}
                      onChange={e => updateProduct(index, 'pricePerUnit', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input
                      type="text"
                      placeholder="Price / Unit"
                      value={product.quantity}
                      onChange={e => updateProduct(index, 'quantity', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {transactionType === transactionTypes.BUY && (
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

        <Button type="submit" disabled={isAddingBuy || isAddingSell}>
          <Plus /> Add Transaction
        </Button>
      </form>
    </Form>
  );
}

export default AddTransactionForm;
