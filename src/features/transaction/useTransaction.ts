import { getBuyTransaction, getSellTransaction } from '@/api/transaction/get-transaction';
import { BuyTransaction, SellTransaction } from '@/types/transaction';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function useBuyTransaction() {
  const { transactionId } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ['buy-transaction'],
    queryFn: () => getBuyTransaction(transactionId as string),
  });

  const transaction: BuyTransaction = data?.data?.buyTransaction;

  return { isLoading, error, transaction };
}

export function useSellTransaction() {
  const { transactionId } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ['buy-transaction'],
    queryFn: () => getSellTransaction(transactionId as string),
  });

  const transaction: SellTransaction = data?.data?.sellTransaction;

  return { isLoading, error, transaction };
}
