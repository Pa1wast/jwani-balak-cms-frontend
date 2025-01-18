import { getProducts } from '@/api/product/get-products';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { useQuery } from '@tanstack/react-query';

export function useProducts() {
  const { selectedCompanyId } = useCompaniesView();

  const { isLoading, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(selectedCompanyId as string),
  });

  return { isLoading, error, products: data?.data?.products };
}
