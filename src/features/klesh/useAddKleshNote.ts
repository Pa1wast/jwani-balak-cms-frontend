import { addKleshNoteApi } from '@/api/klesh/add-klesh-note';
import { KleshNote, NewKleshNote } from '@/types/klesh-note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAddKleshNote() {
  const queryClient = useQueryClient();

  const {
    mutate: addKleshNote,
    mutateAsync: asyncAddKleshNote,
    isPending: isAdding,
    data,
  } = useMutation({
    mutationFn: (newKleshNote: NewKleshNote) => addKleshNoteApi(newKleshNote),
    onSuccess: () => {
      toast.success('Klesh note successfully added', { position: 'bottom-center' });
      queryClient.invalidateQueries({ queryKey: ['klesh-notes'] });
      queryClient.invalidateQueries({ queryKey: ['klesh-notes'] });
    },
    onError: err => toast.error(err.message, { position: 'bottom-center' }),
  });

  const addedKleshNote: KleshNote = data?.data?.klesh;

  return { addKleshNote, isAdding, addedKleshNote, asyncAddKleshNote };
}
