import { addCompanyApi } from '@/api/company/add-company';
import { NewCompany } from '@/types/company';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAddCompany() {
  const queryClient = useQueryClient();

  const { mutate: addCompany, isPending: isAdding } = useMutation({
    mutationFn: (newCompany: NewCompany) => addCompanyApi(newCompany),
    onSuccess: () => {
      toast.success('Company successfully added');
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
    onError: err => toast.error(err.message),
  });

  return { addCompany, isAdding };
}
