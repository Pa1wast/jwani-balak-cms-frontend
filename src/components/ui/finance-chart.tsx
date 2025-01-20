import { BarChart, barElementClasses } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { useDarkMode } from '@/contexts/dark-mode-context';
import { Button } from './button';
import { FilePlus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { dataTypes } from '@/types/finance';
import { Transaction } from '@/types/transaction';
import { calculateFinancials } from '@/lib/price';

const colors = ['#ff00593c', '#0080ff4c', '#00ffaa46'];

interface FinanceChartProps {
  transactions: Transaction[];
}

export default function FinanceChart({ transactions }: FinanceChartProps) {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [month, setMonth] = useState(12);

  const [showDataFor, setShowDataFor] = useState(dataTypes.ALL);

  const { expensesData, revenueData, profitsData } = calculateFinancials(
    transactions,
    month,
    showDataFor
  );

  function handleSetMonth(month: number) {
    setMonth(month);
  }

  function handleSetShowDataFor(dataType: dataTypes) {
    setShowDataFor(dataType);
  }

  return (
    <Card className="my-10 p-2 border">
      <CardHeader className="flex-row items-center justify-between flex-wrap gap-2">
        <CardTitle className="text-base md:text-xl">Expenses, Revenue, & Profits</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 p-2">
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
            [`.MuiBarElement-series-expensesData`]: {
              stroke: colors[0],
            },
            [`.MuiBarElement-series-revenueData`]: {
              stroke: colors[1],
            },
            [`.MuiBarElement-series-profitsData`]: {
              stroke: colors[2],
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
            { data: expensesData, label: 'Expenses', id: 'expensesData' },
            { data: revenueData, label: 'Revenue', id: 'revenueData' },
            { data: profitsData, label: 'Profits', id: 'profitsData' },
          ]}
          colors={colors}
          height={300}
        />
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
  showDataFor: dataTypes;
  onSetMonth: (month: number) => void;
  onSetShowDataFor: (dataType: dataTypes) => void;
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
          variant={showDataFor === dataTypes.EXPENSES ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onSetShowDataFor(dataTypes.EXPENSES)}
        >
          Expenses
        </Button>

        <Button
          variant={showDataFor === dataTypes.REVENUE ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onSetShowDataFor(dataTypes.REVENUE)}
        >
          Revenue
        </Button>

        <Button
          variant={showDataFor === dataTypes.PROFITS ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onSetShowDataFor(dataTypes.PROFITS)}
        >
          Profits
        </Button>

        <Button
          variant={showDataFor === dataTypes.ALL ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onSetShowDataFor(dataTypes.ALL)}
        >
          All
        </Button>
      </div>
    </div>
  );
}
