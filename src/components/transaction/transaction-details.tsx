import { useParams } from 'react-router-dom';
import { data as transactions } from '@/components/transaction/transactions-data-table';
import { CircleOff, Plus, X } from 'lucide-react';
import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { CardContent } from '@mui/material';
import { Badge } from '../ui/badge';
import { currencyTypes, transactionTypes } from '@/types/transaction';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

function TransactionDetails() {
  const { transactionId } = useParams();
  const transaction = transactions.find(transaction => transaction.id === transactionId);

  const [expenses, setExpenses] = useState<{ name: string; amount: string }[]>([]);
  const [curExpense, setCurExpense] = useState<{ name: string; amount: string }>({
    name: '',
    amount: '',
  });

  const addExpense = () => {
    if (!curExpense.name) {
      toast.error('Expense name is required!');
      return;
    }
    if (!curExpense.amount) {
      toast.error('Expense amount is required!');
      return;
    }

    setExpenses([...expenses, curExpense]);
    setCurExpense({ name: '', amount: '' });
  };

  const removeExpense = (index: number) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  if (!transaction)
    return (
      <div className="h-full grid items-center">
        <p className="text-lg bg-secondary/30 w-max mx-auto p-4 rounded-lg flex items-center gap-2">
          <CircleOff /> Could not load transaction data!
        </p>
      </div>
    );

  return (
    <div>
      <h1 className="text-lg md:text-xl font-semibold mb-10">
        Transaction <span className="text-xs font-normal">#{transactionId}</span>
      </h1>

      <div className="space-y-2 mb-2">
        <div className="flex flex-row items-center w-full justify-between mb-4">
          <Badge
            className={cn(
              'text-left font-bold text-xl flex justify-center items-center rounded-md px-2 w-max',
              transaction.type === transactionTypes.SELL
                ? 'bg-green-500 dark:bg-green-500/20 dark:text-green-500 hover:bg-green-500/80 dark:hover:bg-green-500/60'
                : 'bg-blue-500 dark:bg-blue-500/20 dark:text-blue-500 hover:bg-blue-500/80 dark:hover:bg-blue-500/60'
            )}
          >
            {transaction.type} Transaction
          </Badge>

          <p className="font-medium">{transaction.createdAt.toLocaleDateString('en-GB')}</p>
        </div>

        <Card className="overflow-hidden">
          {/* <CardHeader className="flex-row items-center w-full justify-between"></CardHeader> */}
          <CardContent className="flex gap-10 flex-row flex-wrap">
            <div className="flex flex-1 items-center gap-4">
              <p className="text-lg text-foreground/60 min-w-max">Product name:</p>
              <p className="md:text-lg font-semibold truncate max-w-[200px] md:max-w-[500px]">
                {transaction.productName}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-lg text-foreground/60">Price / Unit:</p>
              <p className="text-lg font-semibold">
                {transaction.currency === currencyTypes.IQD
                  ? `${new Intl.NumberFormat('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(transaction.pricePerUnit)} IQD`
                  : `$${new Intl.NumberFormat('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(transaction.pricePerUnit)}`}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-lg text-foreground/60">Quantity:</p>
              <p className="text-lg font-semibold">{transaction.quantity}</p>
            </div>
          </CardContent>

          <CardFooter className="flex-row p-4 items-center justify-between w-full">
            <p className="text-lg text-foreground/60">Totla Cost (w/o) expenses:</p>
            <p className={'text-xl font-bold text-red-900 dark:text-red-500'}>
              {transaction.currency === currencyTypes.IQD
                ? `${new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(transaction.pricePerUnit * transaction.quantity)} IQD`
                : `$${new Intl.NumberFormat('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(transaction.pricePerUnit * transaction.quantity)}`}
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="flex gap-2 w-full ">
        <Card className="flex-1 max-h-max">
          <CardHeader>
            <CardTitle>Add Expenses</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col space-y-4 ">
            <div className="flex gap-2 w-full items-center">
              <Input
                type="text"
                placeholder="Expense name"
                value={curExpense.name}
                onChange={e => setCurExpense(cur => ({ ...cur, name: e.target.value }))}
                className="w-full"
              />
              <Input
                type="text"
                placeholder="Amount"
                value={curExpense.amount}
                onChange={e => setCurExpense(cur => ({ ...cur, amount: e.target.value }))}
                className="w-full"
              />
            </div>

            <Button type="button" variant="outline" onClick={addExpense}>
              <Plus /> Add Expense
            </Button>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>All Expenses</CardTitle>
          </CardHeader>
          <CardContent className="gap-2 flex flex-row flex-wrap">
            {expenses.map((expense, index) => (
              <Badge
                variant="outline"
                className="w-max h-max flex justify-between rounded-md p-0 overflow-hidden"
              >
                <div className="flex gap-4">
                  <p className="p-2">{expense.name}</p>
                  <p className="p-2 text-destructive/60 dark:text-red-700">${expense.amount}</p>
                </div>
                <div className="h-full w-[1px] bg-secondary" />
                <Button
                  size="icon"
                  variant="ghost"
                  className=" h-6 w-6 m-2"
                  onClick={() => removeExpense(index)}
                >
                  <X />
                </Button>
              </Badge>
            ))}
            {!expenses.length && <p className="text-foreground/60">There are no expenses!</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default TransactionDetails;
