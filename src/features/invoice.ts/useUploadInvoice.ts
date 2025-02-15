import { uploadInvoiceApi } from '@/api/invoice.ts/upload-invoice';
import { NewUploadedInvoice } from '@/types/invoice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUploadInvoice() {
  const queryClient = useQueryClient();

  const { mutate: uploadInvoice, isPending: isUploading } = useMutation({
    mutationFn: (newUploadedInvoice: NewUploadedInvoice) => uploadInvoiceApi(newUploadedInvoice),
    onSuccess: () => {
      toast.success('Invoice successfully uploaded');
      queryClient.invalidateQueries({ queryKey: ['uploaded-invoices'] });
    },
    onError: err => toast.error(err.message),
  });

  return { uploadInvoice, isUploading };
}
