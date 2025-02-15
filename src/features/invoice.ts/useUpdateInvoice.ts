import { updateInvoiceApi } from '@/api/invoice.ts/update-invoice';
import { UpdatedInvoice } from '@/types/invoice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateInvoice() {
  const queryClient = useQueryClient();

  const { mutate: updateInvoice, isPending: isUpdating } = useMutation({
    mutationFn: (updatedInvoice: UpdatedInvoice) => updateInvoiceApi(updatedInvoice),
    onSuccess: () => {
      toast.success('Invoice successfully updated');
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoice'] });
    },
    onError: err => toast.error(err.message),
  });

  return { updateInvoice, isUpdating };
}
