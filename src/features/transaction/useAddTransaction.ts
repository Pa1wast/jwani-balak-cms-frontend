import { addTransactionApi } from '@/api/transaction/add-transaction';
import { NewTransaction } from '@/types/transaction';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAddTransaction() {
  const queryClient = useQueryClient();

  const { mutate: addTransaction, isPending: isAdding } = useMutation({
    mutationFn: (newTransaction: NewTransaction) => addTransactionApi(newTransaction),
    onSuccess: () => {
      toast.success('Transaction successfully added');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transaction'] });
    },
    onError: err => toast.error(err.message),
  });

  return { addTransaction, isAdding };
}
