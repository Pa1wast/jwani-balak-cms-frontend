import { getKleshNote } from '@/api/klesh/get-klesh-note';
import { KleshNote } from '@/types/klesh-note';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function useKleshNote() {
  const { noteId } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ['klesh-note'],
    queryFn: () => getKleshNote(noteId as string),
  });

  const kleshNote: KleshNote = data?.data?.klesh;

  return { isLoading, error, kleshNote };
}
