import { axisClasses, BarChart, barElementClasses } from '@mui/x-charts';
import { Transaction, transactionTypes } from '@/types/transaction';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import TransactionCard from '@/components/transaction/transaction-card';
import { calculateTransactionData } from '@/lib/price';
import { useDarkMode } from '@/contexts/dark-mode-context';
import { Link } from 'react-router-dom';

const colors = ['#0080ff4c', '#00ffaa46'];

interface TransactionsChartProps {
  transactions: Transaction[];
}

function TransactionsChart({ transactions }: TransactionsChartProps) {
  const { isDarkMode } = useDarkMode();
  const [month, setMonth] = useState(12);
  const [showDataFor, setShowDataFor] = useState(transactionTypes.ALL);

  const { buyTransactions, sellTransactions } = calculateTransactionData(
    transactions,
    month,
    showDataFor
  );

  const mostRecentTransactions = transactions
    .slice()
    .sort(
      (a: Transaction, b: Transaction) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 2);

  function handleSetMonth(month: number) {
    if (month !== 0 && !month) return;
    setMonth(month);
  }

  function handleSetShowDataFor(dataType: transactionTypes) {
    if (!dataType) return;
    setShowDataFor(dataType);
  }

  return (
    <Card className="my-10 p-2 border">
      <CardHeader className="flex-row items-center justify-between flex-wrap gap-2">
        <CardTitle className="text-base md:text-xl">Transactions</CardTitle>
      </CardHeader>

      <CardContent className="p-2 grid grid-cols-1 lg:grid-cols-[1fr_max-content] gap-4">
        <div className="space-y-2">
          <ChartFilters
            month={month}
            showDataFor={showDataFor}
            onSetMonth={handleSetMonth}
            onSetShowDataFor={handleSetShowDataFor}
          />

          <BarChart
            sx={{
              [`.${barElementClasses.root}`]: {
                strokeWidth: 2,
              },
              [`.MuiBarElement-series-buyTransactionsData`]: {
                stroke: colors[0],
              },
              [`.MuiBarElement-series-sellTransactionsData`]: {
                stroke: colors[1],
              },
              [`.MuiChartsLegend-itemBackground`]: {
                fill: isDarkMode ? '#c7c7c7' : undefined,
              },
              [`.${axisClasses.root}`]: {
                [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                  stroke: isDarkMode ? '#ffffff' : '#000',
                  strokeWidth: 2,
                },
                [`.${axisClasses.tickLabel}`]: {
                  fill: isDarkMode ? '#fff' : '#000',
                },
              },
              border: '1px solid',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
              backgroundImage: isDarkMode
                ? 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)'
                : 'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
              backgroundSize: '35px 35px',
              backgroundPosition: '20px 20px, 20px 20px',
            }}
            series={[
              { data: buyTransactions, label: 'Buy Transactions', id: 'buyTransactionsData' },
              { data: sellTransactions, label: 'Sell Transactions', id: 'sellTransactionsData' },
            ]}
            colors={colors}
            height={300}
          />
        </div>

        <div className="space-y-4">
          <div className="flex gap-2 justify-between items-center">
            <h4 className="font-semibold text-sm text-foreground/60">Recent Transactions</h4>

            <Button
              variant="ghost"
              size="sm"
              className="text-xs px-2 py-1 hover:bg-transparent text-foreground/60 hover:text-foreground w-max h-max"
              asChild
            >
              <Link to="/dashboard/transactions">
                View all <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="space-y-1">
            {mostRecentTransactions.map((transaction: Transaction) => (
              <TransactionCard key={transaction._id} transaction={transaction} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ChartFilters({
  month,
  showDataFor,
  onSetMonth,
  onSetShowDataFor,
}: {
  month: number;
  showDataFor: transactionTypes;
  onSetMonth: (month: number) => void;
  onSetShowDataFor: (dataType: transactionTypes) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 justify-between">
      <div className="border border-border w-max rounded-lg overflow-hidden">
        <Button
          variant={month === 1 ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onSetMonth(1)}
        >
          1 Month
        </Button>

        <Button
          variant={month === 3 ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onSetMonth(3)}
        >
          3 Months
        </Button>

        <Button
          variant={month === 6 ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onSetMonth(6)}
        >
          6 Months
        </Button>

        <Button
          variant={month === 12 ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onSetMonth(12)}
        >
          1 Year
        </Button>
      </div>

      <div className="border border-border w-max rounded-lg overflow-hidden">
        <Button
          variant={showDataFor === transactionTypes.BUY ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onSetShowDataFor(transactionTypes.BUY)}
        >
          Buy
        </Button>

        <Button
          variant={showDataFor === transactionTypes.SELL ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onSetShowDataFor(transactionTypes.SELL)}
        >
          Sell
        </Button>

        <Button
          variant={showDataFor === transactionTypes.ALL ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onSetShowDataFor(transactionTypes.ALL)}
        >
          All
        </Button>
      </div>
    </div>
  );
}

export default TransactionsChart;
