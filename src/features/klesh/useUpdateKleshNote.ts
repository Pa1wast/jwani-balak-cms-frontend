import { updateKleshNoteApi } from '@/api/klesh/update-klesh-note';
import { NewKleshNote } from '@/types/klesh-note';
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
      updatedKleshNote: NewKleshNote;
    }) => updateKleshNoteApi({ kleshNoteId, updatedKleshNote }),
    onSuccess: () => {
      toast.success('Company successfully updated');
      queryClient.invalidateQueries({ queryKey: ['klesh-notes'] });
      queryClient.invalidateQueries({ queryKey: ['klesh-note'] });
    },
    onError: err => toast.error(err.message),
  });

  return { updateKleshNote, isUpdating };
}
