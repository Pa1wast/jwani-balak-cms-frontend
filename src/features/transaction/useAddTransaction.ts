import { addBuyTransactionApi, addSellTransactionApi } from '@/api/transaction/add-transaction';
import { NewBuyTransaction, NewSellTransaction } from '@/types/transaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAddBuyTransaction() {
  const queryClient = useQueryClient();

  const { mutate: addBuyTransaction, isPending: isAdding } = useMutation({
    mutationFn: (newTransaction: NewBuyTransaction) => addBuyTransactionApi(newTransaction),
    onSuccess: () => {
      toast.success('Buy Transaction successfully added');
      queryClient.invalidateQueries({ queryKey: ['buy-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['buy-transaction'] });
    },
    onError: err => toast.error(err.message),
  });

  return { addBuyTransaction, isAdding };
}

export function useAddSellTransaction() {
  const queryClient = useQueryClient();

  const { mutate: addSellTransaction, isPending: isAdding } = useMutation({
    mutationFn: (newTransaction: NewSellTransaction) => addSellTransactionApi(newTransaction),
    onSuccess: () => {
      toast.success('Sell Transaction successfully added');
      queryClient.invalidateQueries({ queryKey: ['sell-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['sell-transaction'] });
    },
    onError: err => toast.error(err.message),
  });

  return { addSellTransaction, isAdding };
}
