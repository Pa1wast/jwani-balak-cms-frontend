import { addKleshNoteApi } from '@/api/klesh/add-klesh-note';
import { NewKleshNote } from '@/types/klesh-note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAddKleshNote() {
  const queryClient = useQueryClient();

  const { mutate: addKleshNote, isPending: isAdding } = useMutation({
    mutationFn: (newKleshNote: NewKleshNote) => addKleshNoteApi(newKleshNote),
    onSuccess: () => {
      toast.success('Klesh note successfully added');
      queryClient.invalidateQueries({ queryKey: ['klesh-notes'] });
      queryClient.invalidateQueries({ queryKey: ['klesh-notes'] });
    },
    onError: err => toast.error(err.message),
  });

  return { addKleshNote, isAdding };
}
