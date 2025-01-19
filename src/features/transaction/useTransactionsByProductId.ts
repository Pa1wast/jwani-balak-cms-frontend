import { getTransactionsByProductId } from '@/api/transaction/get-transactions-by-product-id';
import { Transaction } from '@/types/transaction';
import { useQuery } from '@tanstack/react-query';

export function useTransactionsByProductId(productId: string) {
  const { isLoading, data, error } = useQuery({
    queryKey: ['transactions', productId],
    queryFn: () => getTransactionsByProductId(productId as string),
  });

  const transactions: Transaction[] = data?.data?.transactions;

  return { isLoading, error, transactions };
}
