import { deleteKleshNoteApi } from '@/api/klesh/delete-klesh-note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteKleshNote() {
  const queryClient = useQueryClient();

  const { mutate: deleteKleshNote, isPending: isDeleting } = useMutation({
    mutationFn: (kleshNoteId: string) => deleteKleshNoteApi(kleshNoteId),
    onSuccess: () => {
      toast.success('Klesh note successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['klesh-notes'] });
      queryClient.invalidateQueries({ queryKey: ['klesh-note'] });
    },
    onError: err => toast.error(err.message),
  });

  return { deleteKleshNote, isDeleting };
}
