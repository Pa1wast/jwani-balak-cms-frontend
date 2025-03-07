import { BadgeInfo, CircleAlert, FilePlus, Pen, Trash, TriangleAlert, X } from 'lucide-react';
import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { CardContent } from '@mui/material';
import { Badge } from '../ui/badge';
import { currencyTypes, transactionTypes } from '@/types/transaction';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import ErrorMessage from '../ui/error-message';
import Loader from '../ui/loader';
import { useTransaction } from '@/features/transaction/useTransaction';
import { formatDate } from '@/lib/date';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { useDeleteTransaction } from '@/features/transaction/useDeleteTransaction';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import UpdateTransactionForm from './update-transaction-form';
import { calculateProfit, formatPercentage, formatPrice } from '@/lib/price';
import AddExpenseForm from './add-expense-form';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { useState } from 'react';
import { useCompaniesView } from '@/contexts/companies-view-context';
import AddInvoiceForm from '../invoice/add-invoice-form';
import { useUpdateTransaction } from '@/features/transaction/useUpdateTransaction';
import { useTransactionById } from '@/features/transaction/useTransactionById';

function TransactionDetails() {
  const navigate = useNavigate();
  const { selectedCompanyId } = useCompaniesView();

  const { isLoading, error, transaction } = useTransaction();

  const { transaction: buyTransaction } = useTransactionById(transaction?.buyTransaction as string);

  const { isUpdating, updateTransaction } = useUpdateTransaction();

  const { isDeleting, deleteTransaction } = useDeleteTransaction();

  const [sellingPricePerUnit, setSellingPricePerUnit] = useState(0);
  const [profitMargin, setProfitMargin] = useState(0);

  if (isLoading)
    return (
      <div className="h-full grid items-center">
        <Loader size="lg" />
      </div>
    );

  if (error || !transaction)
    return (
      <div className="h-full grid items-center">
        <ErrorMessage message={error?.message ?? 'Something went wrong'} />
      </div>
    );

  if (transaction?.company._id !== selectedCompanyId)
    return (
      <div className="h-full grid items-center">
        <ErrorMessage message={'Could not find transaction'} goBack />
      </div>
    );

  const currency = transaction.currency as currencyTypes;

  // BUY Transaction
  const totalAmountExpenses = transaction.expenses?.reduce((acc, cur) => acc + cur.amount, 0);
  const totalBuyCost = transaction.pricePerUnit * transaction.quantity;
  const totalAmountPaid = totalAmountExpenses ? totalAmountExpenses + totalBuyCost : totalBuyCost;
  const breakEvenQuantity = Math.ceil(totalAmountPaid / sellingPricePerUnit);
  const breakEvenRevenue = breakEvenQuantity * sellingPricePerUnit;
  const estimatedProfitAmount = calculateProfit(
    profitMargin,
    sellingPricePerUnit * transaction.quantity,
    totalAmountPaid
  );
  const revenueNeeded = totalAmountPaid + estimatedProfitAmount.value;

  // SELL Transaction
  const allSellExpenses = buyTransaction?.expenses;

  const allSellExpensesAmount = allSellExpenses
    ? allSellExpenses.reduce((acc, cur) => acc + cur.amount, 0)
    : 0;

  const totalCost = buyTransaction?.pricePerUnit * buyTransaction?.quantity + allSellExpensesAmount;

  const totalRevenue = transaction.pricePerUnit * transaction.quantity;

  let profitAmount = totalRevenue - totalCost;
  let actualProfitMargin = totalRevenue > 0 ? (profitAmount / totalRevenue) * 100 : 0;

  if (profitAmount <= 0) {
    profitAmount = 0;
    actualProfitMargin = 0;
  }

  function handleDeleteExpense(expenseId: string) {
    const updatedExpenses = transaction.expenses?.filter(expense => expense._id !== expenseId);

    updateTransaction({
      transactionId: transaction._id,
      updatedTransaction: {
        transactionType: transaction.transactionType,
        expenses: updatedExpenses,
      },
    });
  }

  return (
    <div>
      <h1 className="text-lg md:text-xl font-semibold mb-10">
        Transaction | <span className="text-xs font-normal">#{transaction._id}</span>
      </h1>

      <div className="space-y-2 mb-2">
        <div className="flex flex-row items-center w-full justify-between mb-4">
          <Badge
            className={cn(
              'text-left font-bold text-xl flex justify-center items-center rounded-md px-2 w-max',
              transaction.transactionType.toUpperCase() === transactionTypes.SELL
                ? 'bg-green-500 dark:bg-green-500/20 dark:text-green-500 hover:bg-green-500/80 dark:hover:bg-green-500/60'
                : 'bg-blue-500 dark:bg-blue-500/20 dark:text-blue-500 hover:bg-blue-500/80 dark:hover:bg-blue-500/60'
            )}
          >
            {transaction.transactionType.toUpperCase()} Transaction
          </Badge>

          <p className="font-medium">{formatDate(transaction.createdAt)}</p>
        </div>

        <div className="flex gap-1 flex-wrap sm:flex-nowrap">
          <Card className="overflow-hidden w-full">
            <CardContent className="flex gap-10 flex-row flex-wrap">
              <div className="flex flex-wrap flex-1 items-center gap-4">
                <p className="text-lg text-foreground/60 min-w-max">Product name:</p>

                {transaction.product ? (
                  <p className="md:text-lg font-semibold truncate max-w-[200px] md:max-w-[500px]">
                    {transaction.product?.productName}
                  </p>
                ) : (
                  <ErrorMessage message="Could not find product data" />
                )}
              </div>

              <div className="flex items-center gap-4">
                <p className="text-lg text-foreground/60">Price / Unit:</p>
                <p className="text-lg font-semibold">
                  {formatPrice(transaction.pricePerUnit, currency)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-lg text-foreground/60">Quantity:</p>
                <p className="text-lg font-semibold">{transaction.quantity}</p>
              </div>
            </CardContent>

            <CardFooter className="flex-row p-4 items-center justify-between w-full">
              <p className="text-lg text-foreground/60">
                {transaction.transactionType.toUpperCase() === transactionTypes.SELL
                  ? 'Revenue: '
                  : 'Total Cost (w/o) expenses: '}
              </p>
              <p
                className={cn(
                  'text-xl font-bold ',
                  transaction.transactionType.toUpperCase() === transactionTypes.SELL
                    ? 'text-blue-500'
                    : 'text-red-500'
                )}
              >
                {formatPrice(totalBuyCost, currency)}
              </p>
            </CardFooter>
          </Card>

          <Card className="w-full sm:w-max">
            <CardContent className="flex flex-col gap-1">
              <Dialog>
                {transaction.product && (
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      <FilePlus />
                      Generate Invoice
                    </Button>
                  </DialogTrigger>
                )}
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Generate invoice</DialogTitle>
                  </DialogHeader>

                  <AddInvoiceForm transactions={[transaction]} />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="outline">
                    <Pen />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update transaction</DialogTitle>
                  </DialogHeader>
                  <UpdateTransactionForm transaction={transaction} />
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" variant="destructive">
                    <Trash />
                    Delete
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      All related sell transaction will be deleted as well. This action cannot be
                      undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="text-background hover:bg-destructive/80 bg-destructive dark:hover:bg-red-500/80 dark:text-foreground dark:bg-red-500"
                      onClick={() => {
                        deleteTransaction(transaction._id);
                        navigate('/dashboard/transactions');
                      }}
                      disabled={isDeleting}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex gap-2 w-full flex-col sm:flex-row mb-2">
        {transaction.transactionType.toUpperCase() === transactionTypes.BUY && (
          <Card className="flex-1 max-h-max">
            <CardHeader>
              <CardTitle>Add Expenses</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col space-y-4">
              <AddExpenseForm transaction={transaction} />
            </CardContent>
          </Card>
        )}

        {transaction.transactionType.toUpperCase() === transactionTypes.BUY && (
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>All Expenses</CardTitle>
            </CardHeader>
            <CardContent className="gap-2 flex mr-2 flex-col lg:grid lg:grid-cols-2 overflow-auto h-[150px]">
              {transaction.expenses?.map(expense => (
                <Badge
                  key={expense._id}
                  variant="outline"
                  className="w-full lg:h-max flex justify-between rounded-md"
                >
                  <div className="flex justify-between w-full gap-4">
                    <p className="p-2">{expense.name}</p>
                    <p className="p-2 font-bold">{formatPrice(expense.amount, currency)}</p>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    className=" h-6 w-6 m-2"
                    onClick={() => handleDeleteExpense(expense._id as string)}
                    disabled={isUpdating}
                  >
                    <X />
                  </Button>
                </Badge>
              ))}

              {transaction.transactionType.toUpperCase() === transactionTypes.BUY &&
                !transaction.expenses?.length && (
                  <p className="text-foreground/60">There are no expenses!</p>
                )}

              {transaction.transactionType.toUpperCase() === transactionTypes.SELL &&
                !allSellExpenses?.length && (
                  <p className="text-foreground/60">There are no expenses!</p>
                )}
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="flex-1 mb-2">
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="gap-2 flex flex-col flex-wrap">
          <p className="flex gap-1 items-center font-semibold">
            Expenses
            <span className="inline-block ml-auto text-xs">
              ({transaction.currency}) | (% Of the total cost)
            </span>
          </p>

          <div className="space-y-1">
            {transaction.transactionType.toUpperCase() === transactionTypes.BUY &&
              transaction.expenses?.map((expense, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="w-full flex justify-between rounded-md bg-secondary/50 dark:bg-secondary"
                >
                  <p className="p-2">{expense.name}</p>

                  <div className="flex gap-1">
                    <p className="p-2 font-bold">{formatPrice(expense.amount, currency)}</p>

                    <div className="h-[20px] my-auto w-[1px] bg-foreground/50" />

                    <p className="p-2">{formatPercentage(expense.amount, totalBuyCost)} </p>
                  </div>
                </Badge>
              ))}

            {transaction.transactionType.toUpperCase() === transactionTypes.SELL &&
              allSellExpenses?.map((expense, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="w-full flex justify-between rounded-md bg-secondary/50 dark:bg-secondary"
                >
                  <p className="p-2">{expense.name}</p>
                  <div className="flex gap-1">
                    <p className="p-2 font-bold">{formatPrice(expense.amount, currency)}</p>

                    <div className="h-[20px] my-auto w-[1px] bg-foreground/50" />

                    <p className="p-2">{formatPercentage(expense.amount, totalBuyCost)} </p>
                  </div>
                </Badge>
              ))}
          </div>

          <div className="w-full flex font-medium  p-2 rounded-md justify-between">
            <p>Total Expenses: </p>

            <p className=" font-bold">
              {transaction.transactionType.toUpperCase() === transactionTypes.BUY &&
                formatPrice(!totalAmountExpenses ? 0 : totalAmountExpenses, currency)}
              {transaction.transactionType.toUpperCase() === transactionTypes.SELL &&
                formatPrice(!allSellExpensesAmount ? 0 : allSellExpensesAmount, currency)}
            </p>
          </div>
        </CardContent>

        {transaction.transactionType.toUpperCase() === transactionTypes.BUY && <Separator />}

        {transaction.transactionType.toUpperCase() === transactionTypes.BUY && (
          <CardFooter className="flex flex-col gap-1 pt-4">
            <div className="w-full flex bg-blue-500/30 dark:bg-blue-500/30 font-semibold p-2 rounded-md justify-between">
              <p>Total Cost (w/o) expenses: </p>

              <p className="text-lg font-bold ">{formatPrice(totalBuyCost, currency)}</p>
            </div>

            <div className="w-full flex bg-red-500/20 dark:bg-red-500/50 font-semibold p-2 rounded-md justify-between">
              <p>Total Amount Paid: </p>

              <p className="text-lg font-bold">{formatPrice(totalAmountPaid, currency)}</p>
            </div>
          </CardFooter>
        )}
      </Card>

      {transaction.transactionType.toUpperCase() === transactionTypes.BUY ? (
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Insights & Estimations</CardTitle>
          </CardHeader>

          <CardContent className="gap-2 flex flex-col flex-wrap">
            <div className="space-y-8 ">
              <p className="text-lg font-bold">Profit Analysis</p>
              <div className="space-y-4">
                <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-4">
                  <p className="font-semibold w-full">Selling Price / Unit: </p>

                  <div className="flex gap-1 w-full justify-end items-center">
                    <span className="text-sm font-semibold">{currency}</span>
                    <Input
                      type="text"
                      value={sellingPricePerUnit}
                      onChange={e => {
                        const value = e.target.value;
                        if (!isNaN(Number(value)) && value.length <= 20)
                          setSellingPricePerUnit(Number(value));
                      }}
                      className="sm:w-max"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-4">
                  <p className="font-semibold w-full">Profit Margin: </p>
                  <div className="flex gap-1 w-full justify-end items-center">
                    <span className="text-sm font-semibold">%</span>
                    <Input
                      type="text"
                      value={profitMargin}
                      onChange={e => {
                        const value = e.target.value;
                        if (!isNaN(Number(value)) && value.length <= 20)
                          setProfitMargin(Number(value));
                      }}
                      className="sm:w-max"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex gap-1 w-full items-center">
                    <p className="font-semibold">
                      Estimated Profit Amount({transaction.currency}):{' '}
                    </p>
                    {estimatedProfitAmount.info && (
                      <p className="bg-secondary/40 dark:bg-secondary/60 text-sm py-1 px-2 rounded-lg flex gap-1 items-center">
                        <BadgeInfo className="size-4" />
                        {estimatedProfitAmount.info}
                      </p>
                    )}

                    {estimatedProfitAmount.warn && (
                      <p className=" bg-orange-500/10 text-orange-500 text-sm py-1 px-2 rounded-lg flex gap-1 items-center">
                        <TriangleAlert className="size-4" />
                        {estimatedProfitAmount.warn}
                      </p>
                    )}

                    {estimatedProfitAmount.error && (
                      <p className=" bg-red-500/10 text-red-500 text-sm py-1 px-2 rounded-lg flex gap-1 items-center">
                        <CircleAlert className="size-4" />
                        {estimatedProfitAmount.error}
                      </p>
                    )}

                    {!sellingPricePerUnit && profitMargin > 0 && (
                      <p className=" bg-red-500/10 text-red-500 text-sm py-1 px-2 rounded-lg flex gap-1 items-center">
                        <CircleAlert className="size-4" />
                        Selling price must be set.
                      </p>
                    )}
                  </div>
                  <p
                    className={cn(
                      'font-semibold text-green-500 w-max text-nowrap',
                      estimatedProfitAmount.warn && 'text-orange-500',
                      estimatedProfitAmount.error && 'text-red-500'
                    )}
                  >
                    {sellingPricePerUnit > 0
                      ? formatPrice(estimatedProfitAmount.value, currency)
                      : '_'}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-8">
              <p className="text-lg font-bold flex items-center flex-wrap gap-1">
                Break-even Analysis
                {!sellingPricePerUnit && (
                  <span className="bg-secondary/40  font-normal dark:bg-secondary/60 text-sm py-1 px-2 rounded-lg flex gap-1 items-center">
                    <BadgeInfo className="size-4" />
                    No selling price is set.
                  </span>
                )}
              </p>
              <div className="space-y-1">
                <div className="flex flex-wrap bg-secondary/20 p-1 rounded-md items-center justify-between gap-1">
                  <div className="flex gap-1 items-center flex-wrap">
                    <p className="font-semibold">Break-even quantity: </p>
                    {sellingPricePerUnit > 0 && breakEvenQuantity > transaction.quantity && (
                      <span className="font-normal bg-red-500/10 text-red-500 text-xs sm:text-sm py-1 px-2 rounded-lg flex gap-1 items-center">
                        <CircleAlert className="size-4" />
                        Insufficient stock to reach the break-even point.
                      </span>
                    )}
                  </div>

                  <p className="font-semibold">
                    {sellingPricePerUnit > 0 ? breakEvenQuantity : '_'}
                  </p>
                </div>

                <div className="flex items-center justify-between bg-secondary/20 p-1 rounded-md gap-1">
                  <p className="font-semibold">(Break-even quantity) revenue: </p>

                  <p className="font-semibold">
                    {sellingPricePerUnit > 0 ? formatPrice(breakEvenRevenue, currency) : '_'}
                  </p>
                </div>

                <div className="flex items-center justify-between bg-secondary/20 p-1 rounded-md gap-1">
                  <p className="font-semibold">(Break-even quantity) profit: </p>

                  <p className="font-semibold">
                    {sellingPricePerUnit > 0
                      ? formatPrice(breakEvenRevenue - totalAmountPaid, currency)
                      : '_'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>

          <Separator />

          <CardFooter className="flex flex-row justify-between gap-1 pt-4">
            <div className="w-full flex flex-wrap bg-green-500/10 dark:bg-green-500/30 font-semibold p-2 rounded-md justify-between">
              <p className="text-lg font-bold flex flex-wrap items-center gap-1">
                Revenue To Achieve Target Profit:
                {!profitMargin && (
                  <span className="bg-secondary/20 font-normal dark:bg-secondary/40 text-sm py-1 px-2 rounded-lg flex gap-1 items-center">
                    <BadgeInfo className="size-4" />
                    No profit margin is set.
                  </span>
                )}
              </p>

              <p className="text-lg font-bold text-green-500">
                {sellingPricePerUnit > 0 && profitMargin
                  ? formatPrice(revenueNeeded, currency)
                  : '_'}
              </p>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Insights</CardTitle>
          </CardHeader>

          <CardContent className="gap-2 flex flex-col flex-wrap">
            <div className="w-full flex flex-wrap bg-red-500/20 dark:bg-red-500/50 font-semibold p-2 rounded-md justify-between">
              <p className="text-lg font-bold">Total Cost (with) Expenses:</p>

              <p className="text-lg font-bold text-red-500 dark:text-foreground">
                {formatPrice(totalCost, currency)}

                <span className="text-xs ml-2 text-foreground">x{buyTransaction?.quantity}</span>
              </p>
            </div>

            <div className="w-full flex flex-wrap bg-blue-500/20 dark:bg-blue-500/50 font-semibold p-2 rounded-md justify-between">
              <p className="text-lg font-bold">Total Revenue:</p>

              <p className="text-lg font-bold text-blue-500 dark:text-foreground">
                {formatPrice(totalRevenue, currency)}

                <span className="text-xs ml-2 text-foreground">x{transaction?.quantity}</span>
              </p>
            </div>

            <Separator />

            <div className="w-full flex flex-wrap items-center bg-green-500/40 dark:bg-green-500/30 font-semibold p-2 rounded-md justify-between">
              <div className="flex gap-1 items-center">
                <p className="text-lg font-bold">Profit:</p>

                {profitAmount === 0 && (
                  <span className=" font-normal dark:bg-secondary/40 text-sm py-1 px-2 rounded-lg flex gap-1 items-center">
                    <BadgeInfo className="size-4" />
                    No profit has been made. Quantity bought is{' '}
                    <span className="font-semibold">x{buyTransaction?.quantity}</span> at{' '}
                    <span className="font-semibold">
                      {formatPrice(buyTransaction?.pricePerUnit, currency)}
                    </span>{' '}
                    Per Unit.
                  </span>
                )}
              </div>

              <p className="text-lg font-bold flex flex-col gap-2">
                <span className="text-green-500">
                  Amount: {formatPrice(profitAmount, currency)}
                </span>
                <span className="text-green-700 dark:text-green-200">
                  {' '}
                  Margin: {actualProfitMargin.toFixed(2)}%
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default TransactionDetails;
