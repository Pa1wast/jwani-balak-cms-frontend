import { BarChart, barElementClasses } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { getPastMonths } from '@/utils/date';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { useDarkMode } from '@/contexts/dark-mode-context';
import { Button } from './button';
import { FilePlus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { dataTypes } from '@/types/finance';

const expensesData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const revenueData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const profitsData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const months = getPastMonths(6);
const colors = ['#ff00593c', '#0080ff4c', '#00ffaa46'];

function FinanceChart() {
  const navigate = useNavigate();
  console.log(navigate);
  const { isDarkMode } = useDarkMode();
  const [month, setMonth] = useState(0);
  const [showDataFor, setShowDataFor] = useState(dataTypes.ALL);

  function handleSetMonth(month: number) {
    if (month !== 0 && !month) return;
    setMonth(month);
  }

  function handleSetShowDataFor(dataType: dataTypes) {
    if (!dataType) return;
    setShowDataFor(dataType);
  }

  function handleGenerateReport() {
    toast.success('Report genereated successfully', {
      action: { label: 'View', onClick: () => navigate('/dashboard/reports') },
    });
  }

  return (
    <Card className="my-10 p-2 border">
      <CardHeader className="flex-row items-center justify-between flex-wrap gap-2">
        <CardTitle className="text-base md:text-xl">Exepenses, Revenue, & Profits</CardTitle>

        <Button variant="outline" size="sm" onClick={handleGenerateReport}>
          <FilePlus /> Generate Report
        </Button>
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
          xAxis={[{ scaleType: 'band', data: months }]}
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
          variant={month === 0 ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => onSetMonth(0)}
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

export default FinanceChart;
