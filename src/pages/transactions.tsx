import AddTransactionForm from '@/components/transaction/add-transaction-form';
import TransactionDataTable from '@/components/transaction/transactions-data-table';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Plus } from 'lucide-react';

function Transactions() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-lg md:text-xl">Products</h1>
          <p className="text-xs md:text-sm">View, edit, and manage products here.</p>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus /> Add Transaction
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-auto">
            <SheetHeader className="mb-6">
              <SheetTitle>Create Transaction</SheetTitle>
            </SheetHeader>

            <AddTransactionForm />
          </SheetContent>
        </Sheet>
      </div>

      <TransactionDataTable />
    </div>
  );
}

export default Transactions;
