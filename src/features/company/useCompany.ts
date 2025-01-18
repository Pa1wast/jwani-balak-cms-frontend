import { getCompany } from '@/api/company/get-company';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { Company } from '@/types/company';
import { useQuery } from '@tanstack/react-query';

export function useCompany() {
  const { selectedCompanyId } = useCompaniesView();

  const { isLoading, data, error } = useQuery({
    queryKey: ['company', selectedCompanyId],
    queryFn: () => getCompany(selectedCompanyId as string),
  });

  const company: Company = data?.data?.company;

  return { isLoading, error, company };
}
