import {
  deleteBuyTransactionApi,
  deleteSellTransactionApi,
} from '@/api/transaction/delete-transaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteBuyTransaction() {
  const queryClient = useQueryClient();

  const { mutate: deleteBuyTransaction, isPending: isDeleting } = useMutation({
    mutationFn: (transactionId: string) => deleteBuyTransactionApi(transactionId),
    onSuccess: () => {
      toast.success('Buy Transaction successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['buy-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['buy-transaction'] });
    },
    onError: err => toast.error(err.message),
  });

  return { deleteBuyTransaction, isDeleting };
}

export function useDeleteSellTransaction() {
  const queryClient = useQueryClient();

  const { mutate: deleteSellTransaction, isPending: isDeleting } = useMutation({
    mutationFn: (transactionId: string) => deleteSellTransactionApi(transactionId),
    onSuccess: () => {
      toast.success('Sell Transaction successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['sell-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['sell-transaction'] });
    },
    onError: err => toast.error(err.message),
  });

  return { deleteSellTransaction, isDeleting };
}
