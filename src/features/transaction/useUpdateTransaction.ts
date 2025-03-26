import {
  updateBuyTransactionApi,
  updateSellTransactionApi,
} from '@/api/transaction/update-transaction';
import { UpdatedTransaction } from '@/types/transaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateBuyTransaction() {
  const queryClient = useQueryClient();

  const { mutate: updateBuyTransaction, isPending: isUpdating } = useMutation({
    mutationFn: ({
      transactionId,
      updatedTransaction,
    }: {
      transactionId: string;
      updatedTransaction: UpdatedTransaction;
    }) => updateBuyTransactionApi({ transactionId, updatedTransaction }),
    onSuccess: () => {
      toast.success('Buy transaction successfully updated');
      queryClient.invalidateQueries({ queryKey: ['buy-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['buy-transactions'] });
    },
    onError: err => toast.error(err.message),
  });

  return { updateBuyTransaction, isUpdating };
}

export function useUpdateSellTransaction() {
  const queryClient = useQueryClient();

  const { mutate: updateSellTransaction, isPending: isUpdating } = useMutation({
    mutationFn: ({
      transactionId,
      updatedTransaction,
    }: {
      transactionId: string;
      updatedTransaction: UpdatedTransaction;
    }) => updateSellTransactionApi({ transactionId, updatedTransaction }),
    onSuccess: () => {
      toast.success('Sell transaction successfully updated');
      queryClient.invalidateQueries({ queryKey: ['sell-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['sell-transaction'] });
    },
    onError: err => toast.error(err.message),
  });

  return { updateSellTransaction, isUpdating };
}
