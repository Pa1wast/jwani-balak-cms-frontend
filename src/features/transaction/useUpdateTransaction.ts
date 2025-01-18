import { updateTransactionApi } from '@/api/transaction/update-transaction';
import { UpdatedtTransaction } from '@/types/transaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  const { mutate: updateTransaction, isPending: isUpdating } = useMutation({
    mutationFn: ({
      transactionId,
      updatedTransaction,
    }: {
      transactionId: string;
      updatedTransaction: UpdatedtTransaction;
    }) => updateTransactionApi({ transactionId, updatedTransaction }),
    onSuccess: () => {
      toast.success('Transaction successfully updated');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transaction'] });
    },
    onError: err => toast.error(err.message),
  });

  return { updateTransaction, isUpdating };
}
