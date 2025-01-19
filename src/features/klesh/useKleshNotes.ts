import { getProducts } from '@/api/product/get-products';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { KleshNote } from '@/types/klesh-note';
import { useQuery } from '@tanstack/react-query';

export function useKleshNotes() {
  const { selectedCompanyId } = useCompaniesView();

  const { isLoading, data, error } = useQuery({
    queryKey: ['klesh-notes'],
    queryFn: () => getProducts(selectedCompanyId as string),
  });

  const kleshNotes: KleshNote[] = data?.data?.kleshs;

  return { isLoading, error, kleshNotes };
}
