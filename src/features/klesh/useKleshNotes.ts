import { getKleshNotes } from '@/api/klesh/get-klesh-notes';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { KleshNote } from '@/types/klesh-note';
import { useQuery } from '@tanstack/react-query';

export function useKleshNotes() {
  const { selectedCompanyId } = useCompaniesView();

  const { isLoading, data, error } = useQuery({
    queryKey: ['klesh-notes'],
    queryFn: () => getKleshNotes(selectedCompanyId as string),
  });

  const kleshNotes: KleshNote[] = data?.data?.kleshes;

  return { isLoading, error, kleshNotes };
}
