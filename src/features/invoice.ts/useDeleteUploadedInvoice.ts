import { deleteUploadedInvoiceApi } from '@/api/invoice.ts/delete-uploaded-invoice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteUploadedInvoice() {
  const queryClient = useQueryClient();

  const { mutate: deleteUploadedInvoice, isPending: isDeleting } = useMutation({
    mutationFn: (uploadedInvoiceId: string) => deleteUploadedInvoiceApi(uploadedInvoiceId),
    onSuccess: () => {
      toast.success('Invoice successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['uploaded-invoices'] });
    },
    onError: err => toast.error(err.message),
  });

  return { deleteUploadedInvoice, isDeleting };
}
