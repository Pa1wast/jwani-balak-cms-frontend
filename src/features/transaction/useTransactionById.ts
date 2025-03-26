import { getBuyTransaction, getSellTransaction } from '@/api/transaction/get-transaction';
import { BuyTransaction, SellTransaction } from '@/types/transaction';
import { useQuery } from '@tanstack/react-query';

export function useBuyTransactionById(transactionId: string) {
  const { isLoading, data, error } = useQuery({
    queryKey: ['transactions', transactionId],
    queryFn: () => getBuyTransaction(transactionId as string),
  });

  const transaction: BuyTransaction = data?.data?.Buytransaction;

  return { isLoading, error, transaction };
}

export function useSellTransactionById(transactionId: string) {
  const { isLoading, data, error } = useQuery({
    queryKey: ['transactions', transactionId],
    queryFn: () => getSellTransaction(transactionId as string),
  });

  const transaction: SellTransaction = data?.data?.transaction;

  return { isLoading, error, transaction };
}
