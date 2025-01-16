// import { getPastMonths } from '@/utils/date';
import { Card, CardContent, CardHeader, CardTitle } from './card';
// import { useDarkMode } from '@/contexts/dark-mode-context';
import { Button } from './button';
import { ArrowRight, FilePlus } from 'lucide-react';
import { useState } from 'react';
import TransactionCard from './transaction-card';
import { LineChart } from '@mui/x-charts';

export enum transactionTypes {
  SELL = 'SELL',
  BUY = 'BUY',
  ALL = 'ALL',
}

// const expensesData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const revenueData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const profitsData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const months = getPastMonths(6);
// const colors = ['#ff00593c', '#0080ff4c', '#00ffaa46'];

function CompanyLineChart() {
  // const { isDarkMode } = useDarkMode();
  const [month, setMonth] = useState(0);
  const [showDataFor, setShowDataFor] = useState(transactionTypes.ALL);

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

        <Button variant="outline" size="sm">
          <FilePlus /> Generate Report
        </Button>
      </CardHeader>

      <CardContent className="p-2 grid grid-cols-1 lg:grid-cols-[1fr_max-content] gap-4">
        <div className="space-y-2">
          <ChartFilters
            month={month}
            showDataFor={showDataFor}
            onSetMonth={handleSetMonth}
            onSetShowDataFor={handleSetShowDataFor}
          />

          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
              {
                data: [6, 50.5, 2, 8.5, 1.5, 5],
              },
            ]}
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
            >
              View all <ArrowRight />
            </Button>
          </div>

          <div className="space-y-1">
            <TransactionCard
              transaction={{
                type: transactionTypes.SELL,
                productName: 'Loool',
                totalCost: '$3000',
                pricePerUnit: '40.90 IQD',
                quantity: 20,
                date: new Date(),
              }}
            />

            <TransactionCard
              transaction={{
                type: transactionTypes.BUY,
                productName: 'Noool',
                totalCost: '$5000',
                pricePerUnit: '$67.90',
                quantity: 28,
                date: new Date(),
              }}
            />
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
          variant={month === 0 ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onSetMonth(0)}
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

export default CompanyLineChart;
