import {
  updateBuyTransactionApi,
  updateBuyTransactionProductApi,
  updateSellTransactionApi,
  updateSellTransactionProductApi,
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

export function useUpdateBuyTransactionProduct() {
  const queryClient = useQueryClient();

  const { mutate: updateBuyTransactionProduct, isPending: isUpdating } = useMutation({
    mutationFn: ({
      transactionId,
      updatedTransaction,
    }: {
      transactionId: string;
      updatedTransaction: UpdatedTransaction;
    }) => updateBuyTransactionProductApi({ transactionId, updatedTransaction }),
    onSuccess: () => {
      toast.success('Buy transaction product successfully updated');
      queryClient.invalidateQueries({ queryKey: ['buy-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['buy-transaction'] });
    },
    onError: err => toast.error(err.message),
  });

  return { updateBuyTransactionProduct, isUpdating };
}

export function useUpdateSellTransactionProduct() {
  const queryClient = useQueryClient();

  const { mutate: updateSellTransactionProduct, isPending: isUpdating } = useMutation({
    mutationFn: ({
      transactionId,
      updatedTransaction,
    }: {
      transactionId: string;
      updatedTransaction: UpdatedTransaction;
    }) => updateSellTransactionProductApi({ transactionId, updatedTransaction }),
    onSuccess: () => {
      toast.success('Sell transaction product successfully updated');
      queryClient.invalidateQueries({ queryKey: ['sell-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['sell-transaction'] });
    },
    onError: err => toast.error(err.message),
  });

  return { updateSellTransactionProduct, isUpdating };
}
