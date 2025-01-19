import { deleteInvoiceApi } from '@/api/invoice.ts/delete-invoice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteInvoice() {
  const queryClient = useQueryClient();

  const { mutate: deleteInvoice, isPending: isDeleting } = useMutation({
    mutationFn: (invoiceId: string) => deleteInvoiceApi(invoiceId),
    onSuccess: () => {
      toast.success('Invoice successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoice'] });
    },
    onError: err => toast.error(err.message),
  });

  return { deleteInvoice, isDeleting };
}
