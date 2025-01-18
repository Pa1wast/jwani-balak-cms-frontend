import { getCompany } from '@/api/company/get-company';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { useQuery } from '@tanstack/react-query';

export function useCompany() {
  const { selectedCompanyId } = useCompaniesView();

  const { isLoading, data, error } = useQuery({
    queryKey: ['company', selectedCompanyId],
    queryFn: () => getCompany(selectedCompanyId as string),
  });

  return { isLoading, error, company: data?.data?.company };
}
