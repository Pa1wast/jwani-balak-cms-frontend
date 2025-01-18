import { getTransaction } from '@/api/transaction/get-transaction';
import { Transaction } from '@/types/transaction';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function useTransaction() {
  const { transactionId } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ['transaction'],
    queryFn: () => getTransaction(transactionId as string),
  });

  const transaction: Transaction = data?.data?.transaction;

  return { isLoading, error, transaction };
}
