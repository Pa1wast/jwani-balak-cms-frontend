import Loader from '../ui/loader';
import { Transaction } from '@/types/transaction';
import { useTransactions } from '@/features/transaction/useTransactions';

interface ProductStockQuantityProps {
  productId: string;
}

function ProductStockQuantity({ productId }: ProductStockQuantityProps) {
  const { isLoading, transactions } = useTransactions();

  if (isLoading) return <Loader size="sm" text={false} />;

  const filteredTransactions = transactions?.filter((transaction: Transaction) =>
    transaction.products.some(product => product.product === productId)
  );

  const buyTransactions = filteredTransactions.filter(
    (transaction: Transaction) => 'expenses' in transaction
  );

  const sellTransactions = filteredTransactions.filter(
    (transaction: Transaction) => !('expenses' in transaction)
  );

  const buyQuantity = buyTransactions
    ?.map((transaction: Transaction) =>
      transaction.products.reduce((acc, cur) => (acc += cur.quantity), 0)
    )
    .reduce((acc: number, cur: number) => (acc += cur), 0);
  const sellQuantity = sellTransactions
    ?.map((transaction: Transaction) =>
      transaction.products.reduce((acc, cur) => (acc += cur.quantity), 0)
    )
    .reduce((acc: number, cur: number) => (acc += cur), 0);

  const stockQuantity = buyQuantity - sellQuantity;

  return <p className="font-semibold">{stockQuantity}</p>;
}

export default ProductStockQuantity;
