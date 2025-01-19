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
import { currencyTypes, transactionTypes } from '@/types/transaction';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function Dashboard() {
  const { isLoading, company } = useCompany();

  const { isLoading: isLoadingTransactions, transactions } = useTransactions();

  const [currency, setCurrency] = useState(currencyTypes.IQD);

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

  const filteredTransactions = !isLoadingTransactions
    ? transactions.filter(transaction => transaction.currency.toUpperCase() === currency)
    : [];

  const totalExpenses = filteredTransactions
    .filter(transaction => transaction.transactionType.toUpperCase() === transactionTypes.BUY)
    .reduce((total, transaction) => {
      const transactionTotal = transaction.pricePerUnit * transaction.quantity;
      const expenseTotal = transaction.expenses?.reduce(
        (expenseSum, expense) => expenseSum + expense.amount,
        0
      );

      return total + transactionTotal + (expenseTotal ?? 0);
    }, 0);

  const totalRevenue = filteredTransactions
    .filter(transaction => transaction.transactionType.toUpperCase() === transactionTypes.SELL)
    .reduce((total, transaction) => {
      const transactionTotal = transaction.pricePerUnit * transaction.quantity;

      return total + transactionTotal;
    }, 0);

  const totalProfits = totalRevenue - totalExpenses > 0 ? totalRevenue - totalExpenses : 0;

  return (
    <div>
      <CompanyDetails company={company} />

      <div className="space-y-2 mt-10">
        <div className="flex gap-1 items-center ml-auto w-max">
          <Button
            variant={currency === currencyTypes.IQD ? 'default' : 'outline'}
            onClick={() => setCurrency(currencyTypes.IQD)}
            className={cn(
              'text-orange-500 border-orange-500 hover:bg-orange-500/10 hover:text-orange-500',
              currency === currencyTypes.IQD &&
                'bg-orange-500 text-orange-100 hover:bg-orange-500 hover:text-orange-100'
            )}
          >
            IQD
          </Button>
          <Button
            variant={currency === currencyTypes.USD ? 'default' : 'outline'}
            onClick={() => setCurrency(currencyTypes.USD)}
            className={cn(
              'text-cyan-500 border-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-500',
              currency === currencyTypes.USD &&
                'bg-cyan-500 text-cyan-100 hover:bg-cyan- hover:text-cyan-100'
            )}
          >
            USD
          </Button>
        </div>

        <div className="flex gap-1 flex-col md:flex-row">
          <Card className="flex gap-1 items-center  p-3 h-max flex-1 flex-wrap">
            <SquareArrowDown className="text-destructive" />
            <span className="text-sm text-foreground/60">Total Expenses</span>
            <p className="ml-auto text-lg font-semibold ">{formatPrice(totalExpenses, currency)}</p>
          </Card>

          <Card className="flex gap-1 items-center  p-3 h-max flex-1 flex-wrap">
            <Banknote className="text-primary" />
            <span className="text-sm text-foreground/60">Total Revenue</span>
            <p className="ml-auto text-lg font-semibold">{formatPrice(totalRevenue, currency)}</p>
          </Card>

          <Card className="flex gap-1 items-center  p-3 h-max flex-1 flex-wrap">
            <SquareArrowUp className="text-green-500" />
            <span className="text-sm text-foreground/60">Total Profits</span>
            <p className="ml-auto text-lg font-semibold">{formatPrice(totalProfits, currency)}</p>
          </Card>
        </div>

        {!isLoadingTransactions && <FinanceChart transactions={filteredTransactions} />}

        {!isLoadingTransactions && <TransactionsChart transactions={transactions} />}
      </div>
    </div>
  );
}

export default Dashboard;
