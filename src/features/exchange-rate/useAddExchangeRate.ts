import { addExchangeRateApi } from '@/api/exchange-rate/add-exchange-rate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAddExchangeRate() {
  const queryClient = useQueryClient();

  const { mutate: addExchangeRate, isPending: isAdding } = useMutation({
    mutationFn: (newExchangeRate: number) => addExchangeRateApi(newExchangeRate),
    onSuccess: () => {
      toast.success('Exchange Rate successfully added', { position: 'top-left' });
      queryClient.invalidateQueries({ queryKey: ['exchange-rate'] });
    },
    onError: err => toast.error(err.message, { position: 'top-left' }),
  });

  return { addExchangeRate, isAdding };
}
