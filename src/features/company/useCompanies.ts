import { getCompanies } from '@/api/company/get-companies';
import { Company } from '@/types/company';
import { useQuery } from '@tanstack/react-query';

export function useCompanies() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  });

  const companies: Company[] = data?.data?.companies;

  return { isLoading, error, companies };
}
