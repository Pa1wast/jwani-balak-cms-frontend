import { getProducts } from '@/api/product/get-products';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { Product } from '@/types/product';
import { useQuery } from '@tanstack/react-query';

export function useProducts() {
  const { selectedCompanyId } = useCompaniesView();

  const { isLoading, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(selectedCompanyId as string),
  });

  const products: Product[] = data?.data?.products;

  return { isLoading, error, products };
}
