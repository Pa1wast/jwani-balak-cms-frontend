import { getInvoices } from '@/api/invoice.ts/get-invoices';
import { Invoice } from '@/types/invoice';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function useInvoice() {
  const { invoiceId } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ['invoice'],
    queryFn: () => getInvoices(invoiceId as string),
  });

  const invoice: Invoice = data?.data?.invoice;

  return { isLoading, error, invoice };
}
