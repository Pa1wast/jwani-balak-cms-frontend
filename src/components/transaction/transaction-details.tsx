import { Pen, Trash, X } from 'lucide-react';
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
import { formatPrice } from '@/lib/price';
import AddExpenseForm from './add-expense-form';
import { useTransactionsByProductId } from '@/features/transaction/useTransactionsByProductId';

function TransactionDetails() {
  const { isLoading, error, transaction } = useTransaction();

  const { isLoading: isLoading2, transactions } = useTransactionsByProductId(
    transaction?.product?._id
  );

  const { isDeleting, deleteTransaction } = useDeleteTransaction();
  const navigate = useNavigate();

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
              <div className="flex flex-1 items-center gap-4">
                <p className="text-lg text-foreground/60 min-w-max">Product name:</p>
                <p className="md:text-lg font-semibold truncate max-w-[200px] md:max-w-[500px]">
                  {transaction.product.productName}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-lg text-foreground/60">Price / Unit:</p>
                <p className="text-lg font-semibold">
                  {formatPrice(transaction.pricePerUnit, transaction.currency as currencyTypes)}
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
                {formatPrice(
                  transaction.pricePerUnit * transaction.quantity,
                  transaction.currency as currencyTypes
                )}
              </p>
            </CardFooter>
          </Card>

          <Card className="w-full sm:w-max h-max">
            <CardContent className="flex flex-col gap-1">
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
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
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

      <div className="flex gap-2 w-full flex-col sm:flex-row">
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

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>All Expenses</CardTitle>
          </CardHeader>
          <CardContent className="gap-2 flex flex-row flex-wrap">
            {transaction.expenses?.map((expense, index) => (
              <Badge
                key={index}
                variant="outline"
                className="w-max h-max flex justify-between rounded-md p-0 overflow-hidden"
              >
                <div className="flex gap-4">
                  <p className="p-2">{expense.name}</p>
                  <p className="p-2 text-destructive/60 font-bold dark:text-red-700">
                    {formatPrice(expense.amount, transaction.currency as currencyTypes)}
                  </p>
                </div>

                <div className="h-full w-[1px] bg-secondary" />

                <Button size="icon" variant="ghost" className=" h-6 w-6 m-2">
                  <X />
                </Button>
              </Badge>
            ))}

            {!transaction.expenses?.length && (
              <p className="text-foreground/60">There are no expenses!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default TransactionDetails;
