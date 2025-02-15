import { getUploadedInvoices } from '@/api/invoice.ts/get-uploaded-invoices';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { UploadedInvoice } from '@/types/invoice';
import { useQuery } from '@tanstack/react-query';

export function useUploadedInvoices() {
  const { selectedCompanyId } = useCompaniesView();

  const { isLoading, data, error } = useQuery({
    queryKey: ['uploaded-invoices'],
    queryFn: () => getUploadedInvoices(selectedCompanyId as string),
  });

  const uploadedInvoices: UploadedInvoice[] = data?.data?.uploadedInvoices;

  return { isLoading, error, uploadedInvoices };
}
