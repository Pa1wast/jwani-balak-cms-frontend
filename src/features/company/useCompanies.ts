import { getCompanies } from '@/api/company/get-companies';
import { useQuery } from '@tanstack/react-query';

export function useCompanies() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  });

  return { isLoading, error, companies: data?.data?.companies };
}
