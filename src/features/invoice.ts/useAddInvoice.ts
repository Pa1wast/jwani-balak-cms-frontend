import { addInvoiceApi } from '@/api/invoice.ts/add-invoice';
import { NewInvoice } from '@/types/invoice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAddInvoice() {
  const queryClient = useQueryClient();

  const { mutate: addInvoice, isPending: isAdding } = useMutation({
    mutationFn: (newInvoice: NewInvoice) => addInvoiceApi(newInvoice),
    onSuccess: () => {
      toast.success('Invoice successfully generated');
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoice'] });
    },
    onError: err => toast.error(err.message),
  });

  return { addInvoice, isAdding };
}
