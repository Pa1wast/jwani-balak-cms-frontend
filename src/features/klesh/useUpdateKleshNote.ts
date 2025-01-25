import { updateKleshNoteApi } from '@/api/klesh/update-klesh-note';
import { UpdatedKleshNote } from '@/types/klesh-note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateKleshNote() {
  const queryClient = useQueryClient();

  const { mutate: updateKleshNote, isPending: isUpdating } = useMutation({
    mutationFn: ({
      kleshNoteId,
      updatedKleshNote,
    }: {
      kleshNoteId: string;
      updatedKleshNote: UpdatedKleshNote;
    }) => updateKleshNoteApi({ kleshNoteId, updatedKleshNote }),
    onSuccess: () => {
      toast.success('Klesh note successfully updated', { position: 'bottom-center' });
      queryClient.invalidateQueries({ queryKey: ['klesh-notes'] });
      queryClient.invalidateQueries({ queryKey: ['klesh-note'] });
    },
    onError: err => toast.error(err.message, { position: 'bottom-center' }),
  });

  return { updateKleshNote, isUpdating };
}
