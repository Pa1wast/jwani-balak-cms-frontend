import { getInvoices } from '@/api/invoice.ts/get-invoices';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { Invoice } from '@/types/invoice';
import { useQuery } from '@tanstack/react-query';

export function useInvoices() {
  const { selectedCompanyId } = useCompaniesView();

  const { isLoading, data, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => getInvoices(selectedCompanyId as string),
  });

  const invoices: Invoice[] = data?.data?.invoices;

  return { isLoading, error, invoices };
}
