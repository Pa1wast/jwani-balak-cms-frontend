import { deleteTransactionApi } from '@/api/transaction/delete-transaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  const { mutate: deleteTransaction, isPending: isDeleting } = useMutation({
    mutationFn: (transactionId: string) => deleteTransactionApi(transactionId),
    onSuccess: () => {
      toast.success('Transaction successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transaction'] });
    },
    onError: err => toast.error(err.message),
  });

  return { deleteTransaction, isDeleting };
}
