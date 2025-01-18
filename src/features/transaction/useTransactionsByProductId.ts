import { getTransaction } from '@/api/transaction/get-transaction';
import { Transaction } from '@/types/transaction';
import { useQuery } from '@tanstack/react-query';

export function useTransactionsByProductId(productId: string) {
  const { isLoading, data, error } = useQuery({
    queryKey: ['transaction'],
    queryFn: () => getTransaction(productId as string),
  });

  const transactions: Transaction[] = data?.data?.transaction;

  return { isLoading, error, transactions };
}
