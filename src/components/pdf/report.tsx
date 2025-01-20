/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTransactions } from '@/features/transaction/useTransactions';
import TransactionsChart from '../transaction/transactions-chart';
import FinanceChart from '../ui/finance-chart';
import { useCompaniesView } from '@/contexts/companies-view-context';
import ErrorMessage from '../ui/error-message';
import { ArrowLeft, Download } from 'lucide-react';
import { useCompany } from '@/features/company/useCompany';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import Loader from '../ui/loader';
import { formatPrice } from '@/lib/price';
import { currencyTypes, transactionTypes } from '@/types/transaction';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { useProducts } from '@/features/product/useProducts';
import { Product } from '@/types/product';

function Report() {
  const { selectedCompanyId } = useCompaniesView();
  const { isLoading, company } = useCompany();
  const { isLoading: isLoadingTransactions, transactions } = useTransactions();
  const { productsCount } = useProducts();

  const [currency, setCurrency] = useState(currencyTypes.IQD);

  const pdfRef = useRef(null);

  async function handleClick() {
    const html2pdf = (await import('html2pdf.js')).default as any;

    if (!pdfRef) return;

    const element = pdfRef.current;
    const options = {
      margin: 0,
      filename: `report-${company.companyName}.pdf`,
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    html2pdf().set(options).from(element).save();
  }

  if (!selectedCompanyId)
    return (
      <div className="h-full w-full grid items-center">
        <ErrorMessage message="No country selected" goBack />
      </div>
    );

  if (isLoadingTransactions || isLoading)
    return (
      <div className="h-full w-full grid items-center">
        <Loader size="lg" />
      </div>
    );

  const filteredTransactions = !isLoadingTransactions
    ? transactions.filter(transaction => transaction.currency.toUpperCase() === currency)
    : [];

  const buyTransactions = filteredTransactions.filter(
    transaction => transaction.transactionType.toUpperCase() === transactionTypes.BUY
  );

  const sellTransactions = filteredTransactions.filter(
    transaction => transaction.transactionType.toUpperCase() === transactionTypes.SELL
  );

  const totalExpenses = buyTransactions.reduce((total, transaction) => {
    const transactionTotal = transaction.pricePerUnit * transaction.quantity;
    const expenseTotal = transaction.expenses?.reduce(
      (expenseSum, expense) => expenseSum + expense.amount,
      0
    );

    return total + transactionTotal + (expenseTotal ?? 0);
  }, 0);

  const totalRevenue = sellTransactions.reduce((total, transaction) => {
    const transactionTotal = transaction.pricePerUnit * transaction.quantity;

    return total + transactionTotal;
  }, 0);

  const totalProfits = totalRevenue - totalExpenses > 0 ? totalRevenue - totalExpenses : 0;

  const productSales = sellTransactions.reduce((acc: { [key: string]: number }, transaction) => {
    const productName = transaction.product.productName;
    const quantity = transaction.quantity;

    if (!acc[productName]) {
      acc[productName] = 0;
    }

    acc[productName] += quantity;
    return acc;
  }, {});

  let mostSoldProduct = null;
  let highestQuantity = 0;

  for (const [product, quantity] of Object.entries(productSales)) {
    if (quantity > highestQuantity) {
      highestQuantity = quantity;
      mostSoldProduct = product;
    }
  }

  return (
    <div>
      <div className="flex gap-2 top-2 left-2 p-4 justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard">
            <ArrowLeft /> Back to dashboard
          </Link>
        </Button>

        <Button size="sm" onClick={handleClick}>
          <Download /> Download report
        </Button>
      </div>

      <div className="flex gap-1 items-center ml-auto w-max px-4">
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

      <div className="p-4" ref={pdfRef}>
        <h2 className="text-2xl font-bold mb-12">{company.companyName} - Summary Report</h2>

        <div className="flex gap-1 flex-col bg-secondary/10 p-2 rounded-md">
          <h3 className="font-bold text-lg my-2">Products</h3>

          <div className="flex gap-1 items-center shadow-none p-2  flex-wrap border-0">
            <span className="text-sm text-foreground/60">Most Sold Product</span>
            <div className="flex flex-col items-center gap-1 ml-auto">
              {mostSoldProduct ? (
                <>
                  <p className="text-lg font-semibold">{mostSoldProduct}</p>
                  <p className="ml-auto text-sm font-medium text-foreground/60">
                    Quantity Sold: {highestQuantity}
                  </p>
                </>
              ) : (
                '_'
              )}
            </div>
          </div>

          <div className="flex gap-1 items-center shadow-none p-2  flex-wrap border-0">
            <span className="text-sm text-foreground/60">All Products</span>
            <p className="ml-auto text-lg font-semibold">{productsCount}</p>
          </div>

          <Separator />

          <h3 className="font-bold text-lg my-2">Transactions</h3>

          <div className="flex gap-1 items-center shadow-none p-2  flex-wrap border-0">
            <span className="text-sm text-foreground/60">Buy Transactions</span>
            <p className="ml-auto text-lg font-semibold">{buyTransactions?.length}</p>
          </div>

          <div className="flex gap-1 items-center shadow-none p-2  flex-wrap border-0">
            <span className="text-sm text-foreground/60">Sell Transactions</span>
            <p className="ml-auto text-lg font-semibold">{sellTransactions?.length}</p>
          </div>

          <div className="flex gap-1 items-center shadow-none p-2  flex-wrap border-0">
            <span className="text-sm text-foreground/60">All Transactions</span>
            <p className="ml-auto text-lg font-semibold">{filteredTransactions?.length}</p>
          </div>

          <TransactionsChart
            transactions={filteredTransactions}
            showRecentTransactions={false}
            enabelFilters={false}
            showTitle={false}
            className="border-0 shadow-none p-0 bg-secondary/10"
          />

          <Separator />

          <h3 className="font-bold text-lg my-2">Finances</h3>

          <div className="flex gap-1 items-center shadow-none p-2  flex-wrap border-0">
            <span className="text-sm text-foreground/60">Total Cost/Expenses</span>
            <p className="ml-auto text-lg font-semibold ">{formatPrice(totalExpenses, currency)}</p>
          </div>

          <div className="flex gap-1 items-center shadow-none p-2  flex-wrap border-0">
            <span className="text-sm text-foreground/60">Total Revenue</span>
            <p className="ml-auto text-lg font-semibold">{formatPrice(totalRevenue, currency)}</p>
          </div>

          <div className="flex gap-1 items-center shadow-none p-2  flex-wrap border-0">
            <span className="text-sm text-foreground/60">Total Profits</span>
            <p className="ml-auto text-lg font-semibold">{formatPrice(totalProfits, currency)}</p>
          </div>

          <FinanceChart
            transactions={filteredTransactions}
            enableFilters={false}
            showTitle={false}
            className="border-0 shadow-none p-0 bg-secondary/10"
          />
        </div>
      </div>
    </div>
  );
}

export default Report;
