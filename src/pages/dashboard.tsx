import CompanyDetails from '@/components/company/company-details';
import { Card } from '@/components/ui/card';
import { Banknote, SquareArrowDown, SquareArrowUp } from 'lucide-react';
import TransactionsChart from '@/components/transaction/transactions-chart';
import { useCompany } from '@/features/company/useCompany';
import Loader from '@/components/ui/loader';
import ErrorMessage from '@/components/ui/error-message';
import { useBuyTransactions, useSellTransactions } from '@/features/transaction/useTransactions';
import { formatPrice } from '@/lib/price';
import { currencyTypes } from '@/types/transaction';

function Dashboard() {
  const { isLoading, company } = useCompany();

  const { isLoading: isLoadingBuyTransactions, transactions } = useBuyTransactions();
  const { isLoading: isLoadingSellTransactions, transactions: transactions2 } =
    useSellTransactions();

  if (isLoading)
    return (
      <div className="w-full h-full grid items-center">
        <Loader />
      </div>
    );

  if (!company)
    return (
      <div className="w-full h-full grid items-center">
        <ErrorMessage message="Failed to get company data!" />
      </div>
    );

  const totalExpenses = transactions
    ?.map(transaction =>
      transaction?.products?.reduce((acc, cur) => {
        if (transaction.currency === currencyTypes.USD) {
          return (acc += cur.pricePerUnit * cur.quantity * (cur.exchange?.rate ?? 1));
        } else {
          return (acc += cur.pricePerUnit * cur.quantity);
        }
      }, 0)
    )
    .reduce((acc: number, cur: number) => (acc += cur), 0);

  console.log(transactions, transactions2);

  const totalRevenue = transactions2
    ?.map(transaction =>
      transaction?.products?.reduce((acc, cur) => {
        if (transaction.currency === currencyTypes.USD) {
          return (acc += cur.pricePerUnit * cur.quantity * (cur.exchange?.rate ?? 1));
        } else {
          return (acc += cur.pricePerUnit * cur.quantity);
        }
      }, 0)
    )
    .reduce((acc: number, cur: number) => (acc += cur), 0);

  const totalProfits = totalRevenue - totalExpenses > 0 ? totalRevenue - totalExpenses : 0;

  return (
    <div>
      <CompanyDetails company={company} />

      <div className="space-y-2 mt-10">
        <div className="flex gap-1 flex-col md:flex-row">
          <Card className="flex gap-1 items-center  p-3 h-max flex-1 flex-wrap">
            <SquareArrowDown className="text-destructive" />
            <span className="text-sm text-foreground/60">Total Cost/Expenses</span>
            <p className="ml-auto text-lg font-semibold ">
              {formatPrice(totalExpenses, currencyTypes.IQD)}
            </p>
          </Card>

          <Card className="flex gap-1 items-center  p-3 h-max flex-1 flex-wrap">
            <Banknote className="text-primary" />
            <span className="text-sm text-foreground/60">Total Revenue</span>
            <p className="ml-auto text-lg font-semibold">
              {formatPrice(totalRevenue, currencyTypes.IQD)}
            </p>
          </Card>

          <Card className="flex gap-1 items-center  p-3 h-max flex-1 flex-wrap">
            <SquareArrowUp className="text-green-500" />
            <span className="text-sm text-foreground/60">Total Profits</span>
            <p className="ml-auto text-lg font-semibold">
              {formatPrice(totalProfits, currencyTypes.IQD)}
            </p>
          </Card>
        </div>

        {!isLoadingBuyTransactions && !isLoadingSellTransactions && (
          <TransactionsChart transactions={transactions} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
