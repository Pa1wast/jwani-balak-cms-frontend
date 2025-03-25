import { getBuyTransactions, getSellTransactions } from '@/api/transaction/get-transactions';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { BuyTransaction, SellTransaction } from '@/types/transaction';
import { useQuery } from '@tanstack/react-query';

export function useBuyTransactions() {
  const { selectedCompanyId } = useCompaniesView();

  const { isLoading, data, error } = useQuery({
    queryKey: ['buy-transactions'],
    queryFn: () => getBuyTransactions(selectedCompanyId as string),
  });

  const transactions: BuyTransaction[] = data?.data?.buyTransactions;

  return { isLoading, error, transactions };
}

export function useSellTransactions() {
  const { selectedCompanyId } = useCompaniesView();

  const { isLoading, data, error } = useQuery({
    queryKey: ['buy-transactions'],
    queryFn: () => getSellTransactions(selectedCompanyId as string),
  });

  const transactions: SellTransaction[] = data?.data?.sellTransactions;

  return { isLoading, error, transactions };
}
