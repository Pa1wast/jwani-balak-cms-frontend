import { useTransactionsByProductId } from '@/features/transaction/useTransactionsByProductId';
import Loader from '../ui/loader';
import { transactionTypes } from '@/types/transaction';

interface ProductStockQuantityProps {
  productId: string;
}

function ProductStockQuantity({ productId }: ProductStockQuantityProps) {
  const { isLoading, transactions } = useTransactionsByProductId(productId);

  if (isLoading) return <Loader size="sm" text={false} />;

  const buyTransactions = transactions.filter(
    transaction => transaction.transactionType.toUpperCase() === transactionTypes.BUY
  );

  const sellTransactions = transactions.filter(
    transaction => transaction.transactionType.toUpperCase() === transactionTypes.SELL
  );

  const quantityBought = buyTransactions.reduce((acc, cur) => acc + cur.quantity, 0);
  const quantitySold = sellTransactions.reduce((acc, cur) => acc + cur.quantity, 0);

  const stockQuantity = quantityBought - quantitySold;

  return <p className="font-semibold">{stockQuantity}</p>;
}

export default ProductStockQuantity;
