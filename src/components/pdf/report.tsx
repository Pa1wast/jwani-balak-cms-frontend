/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBuyTransactions, useSellTransactions } from '@/features/transaction/useTransactions';
import TransactionsChart from '@/components/transaction/transactions-chart';
import FinanceChart from '@/components/ui/finance-chart';
import { useCompaniesView } from '@/contexts/companies-view-context';
import ErrorMessage from '@/components/ui/error-message';
import { ArrowLeft, Download } from 'lucide-react';
import { useCompany } from '@/features/company/useCompany';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Loader from '@/components/ui/loader';
import { formatPrice } from '@/lib/price';
import { currencyTypes, SellTransaction } from '@/types/transaction';
import { Separator } from '@/components/ui/separator';
import { useProducts } from '@/features/product/useProducts';

function Report() {
  const { selectedCompanyId } = useCompaniesView();
  const { isLoading, company } = useCompany();
  const { isLoading: isLoadingTransactions, transactions: buyTransactions } = useBuyTransactions();
  const { isLoading: isLoadingTransactions2, transactions: sellTransactions } =
    useSellTransactions();
  const { productsCount, products } = useProducts();

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

  if (isLoadingTransactions || isLoadingTransactions2 || isLoading)
    return (
      <div className="h-full w-full grid items-center">
        <Loader size="lg" />
      </div>
    );

  const totalExpenses = buyTransactions
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

  const totalRevenue = sellTransactions
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

  const highestPricedProduct = sellTransactions
    .flatMap((transaction: SellTransaction) => transaction.products)
    .reduce((maxProduct, currentProduct) => {
      const currentValue = currentProduct.pricePerUnit * currentProduct.quantity;
      const maxValue = maxProduct.pricePerUnit * maxProduct.quantity;

      return currentValue > maxValue ? currentProduct : maxProduct;
    }, sellTransactions[0]?.products[0]);

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

      <div className="p-4" ref={pdfRef}>
        <h2 className="text-2xl font-bold mb-12">{company.companyName} - Summary Report</h2>

        <div className="flex gap-1 flex-col bg-secondary/10 p-2 rounded-md">
          <h3 className="font-bold text-lg my-2">Products</h3>

          <div className="flex gap-1 items-center shadow-none p-2  flex-wrap border-0">
            <span className="text-sm text-foreground/60">Most Sold Product</span>
            <div className="flex flex-col items-center gap-1 ml-auto">
              {products?.find(p => p._id === highestPricedProduct.product)?.productName}
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
            <p className="ml-auto text-lg font-semibold">
              {buyTransactions?.length + sellTransactions?.length}
            </p>
          </div>

          <TransactionsChart
            transactions={[...buyTransactions, ...sellTransactions]}
            showRecentTransactions={false}
            enabelFilters={false}
            showTitle={false}
            className="border-0 shadow-none p-0 bg-secondary/10"
          />

          <Separator />

          <h3 className="font-bold text-lg my-2">Finances</h3>

          <div className="flex gap-1 items-center shadow-none p-2  flex-wrap border-0">
            <span className="text-sm text-foreground/60">Total Cost/Expenses</span>
            <p className="ml-auto text-lg font-semibold ">
              {formatPrice(totalExpenses, currencyTypes.IQD)}
            </p>
          </div>

          <div className="flex gap-1 items-center shadow-none p-2  flex-wrap border-0">
            <span className="text-sm text-foreground/60">Total Revenue</span>
            <p className="ml-auto text-lg font-semibold">
              {formatPrice(totalRevenue, currencyTypes.IQD)}
            </p>
          </div>

          <div className="flex gap-1 items-center shadow-none p-2  flex-wrap border-0">
            <span className="text-sm text-foreground/60">Total Profits</span>
            <p className="ml-auto text-lg font-semibold">
              {formatPrice(totalProfits, currencyTypes.IQD)}
            </p>
          </div>

          <FinanceChart
            transactions={[...buyTransactions, ...sellTransactions]}
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
