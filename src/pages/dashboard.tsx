import CompanyDetails from '@/components/company/company-details';
import { Card } from '@/components/ui/card';
import { Banknote, SquareArrowDown, SquareArrowUp } from 'lucide-react';
import FinanceChart from '@/components/ui/finance-chart';
import TransactionsChart from '@/components/transaction/transactions-chart';
import { useCompany } from '@/features/company/useCompany';
import Loader from '@/components/ui/loader';
import ErrorMessage from '@/components/ui/error-message';
import { useTransactions } from '@/features/transaction/useTransactions';
import { formatPrice } from '@/lib/price';
import { transactionTypes } from '@/types/transaction';

function Dashboard() {
  const { isLoading, company } = useCompany();

  const { isLoading: isLoadingTransactions, transactions } = useTransactions();

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

  const totalExpenses = !isLoadingTransactions
    ? transactions
        .filter(transaction => transaction.transactionType.toUpperCase() === transactionTypes.BUY)
        .reduce((total, transaction) => {
          const transactionTotal = transaction.pricePerUnit * transaction.quantity;
          const expenseTotal = transaction.expenses?.reduce(
            (expenseSum, expense) => expenseSum + expense.amount,
            0
          );

          return total + transactionTotal + (expenseTotal ?? 0);
        }, 0)
    : 0;

  const totalRevenue = !isLoadingTransactions
    ? transactions
        .filter(transaction => transaction.transactionType.toUpperCase() === transactionTypes.SELL)
        .reduce((total, transaction) => {
          const transactionTotal = transaction.pricePerUnit * transaction.quantity;

          return total + transactionTotal;
        }, 0)
    : 0;

  const totalProfits = totalRevenue - totalExpenses > 0 ? totalRevenue - totalExpenses : 0;

  return (
    <div>
      <CompanyDetails company={company} />

      <div className="space-y-2 mt-10">
        <div className="flex gap-1 flex-col md:flex-row">
          <Card className="flex gap-1 items-center  p-3 h-max flex-1 flex-wrap">
            <SquareArrowDown className="text-destructive" />
            <span className="text-sm text-foreground/60">Total Expenses</span>
            <p className="ml-auto text-lg font-semibold ">{formatPrice(totalExpenses, 'IQD')}</p>
          </Card>

          <Card className="flex gap-1 items-center  p-3 h-max flex-1 flex-wrap">
            <Banknote className="text-primary" />
            <span className="text-sm text-foreground/60">Total Revenue</span>
            <p className="ml-auto text-lg font-semibold">{formatPrice(totalRevenue, 'IQD')}</p>
          </Card>

          <Card className="flex gap-1 items-center  p-3 h-max flex-1 flex-wrap">
            <SquareArrowUp className="text-green-500" />
            <span className="text-sm text-foreground/60">Total Profits</span>
            <p className="ml-auto text-lg font-semibold">{formatPrice(totalProfits, 'IQD')}</p>
          </Card>
        </div>

        {!isLoadingTransactions && <FinanceChart transactions={transactions} />}

        {!isLoadingTransactions && <TransactionsChart transactions={transactions} />}
      </div>
    </div>
  );
}

export default Dashboard;
