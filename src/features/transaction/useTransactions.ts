import { getTransactions } from '@/api/transaction/get-transactions';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { Transaction } from '@/types/transaction';
import { useQuery } from '@tanstack/react-query';

export function useTransactions() {
  const { selectedCompanyId } = useCompaniesView();

  const { isLoading, data, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions(selectedCompanyId as string),
  });

  const transactions: Transaction[] = data?.data?.transactions;

  return { isLoading, error, transactions };
}
