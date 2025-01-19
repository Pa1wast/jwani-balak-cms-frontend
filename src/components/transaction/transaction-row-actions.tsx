import { Transaction } from '@/types/transaction';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { AlertCircle, ArrowRight, Copy, FilePlus, MoreHorizontal, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddInvoiceForm from '../invoice/add-invoice-form';
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import {
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

interface TransactionRowActionsProps {
  transaction: Transaction;
}

function TransactionRowActions({ transaction }: TransactionRowActionsProps) {
  const { isDeleting, deleteTransaction } = useDeleteTransaction();

  return (
    <>
      <Dialog>
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hidden md:flex">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem asChild>
                <Link to={`/dashboard/transactions/${transaction._id}`}>View details</Link>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(transaction._id)}>
                Copy transaction ID
              </DropdownMenuItem>

              {transaction.product && (
                <DialogTrigger asChild>
                  <DropdownMenuItem>Generate invoice</DropdownMenuItem>
                </DialogTrigger>
              )}

              <DropdownMenuSeparator />

              <AlertDialogTrigger asChild>
                <DropdownMenuItem>
                  Delete transaction
                  <AlertCircle className="ml-auto dark:text-red-500 text-destructive" />
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate invoice</DialogTitle>
            </DialogHeader>

            <AddInvoiceForm product={transaction.product} />
          </DialogContent>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="text-background hover:bg-destructive/80 bg-destructive dark:hover:bg-red-500/80 dark:text-foreground dark:bg-red-500"
                onClick={() => deleteTransaction(transaction._id)}
                disabled={isDeleting}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Dialog>

      <div className="md:hidden flex justify-between w-full">
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="icon">
            <Copy />
          </Button>

          <Button variant="outline" size="icon">
            <FilePlus />
          </Button>

          <Button variant="outline" asChild>
            <Link to={`/dashboard/transactions/${transaction._id}`}>
              View detials <ArrowRight />
            </Link>
          </Button>
        </div>

        <Button variant="destructive" size="icon" className="">
          <Trash />
        </Button>
      </div>
    </>
  );
}

export default TransactionRowActions;
