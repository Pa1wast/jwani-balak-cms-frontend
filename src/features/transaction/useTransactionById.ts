import { getTransaction } from '@/api/transaction/get-transaction';
import { Transaction } from '@/types/transaction';
import { useQuery } from '@tanstack/react-query';

export function useTransactionById(transactionId: string) {
  const { isLoading, data, error } = useQuery({
    queryKey: ['transactions', transactionId],
    queryFn: () => getTransaction(transactionId as string),
  });

  const transaction: Transaction = data?.data?.transaction;

  return { isLoading, error, transaction };
}
