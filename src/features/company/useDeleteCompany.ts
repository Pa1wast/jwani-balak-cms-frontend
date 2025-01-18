import { deleteCompanyApi } from '@/api/company/delete-company';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteCompany() {
  const queryClient = useQueryClient();

  const { mutate: deleteCompany, isPending: isDeleting } = useMutation({
    mutationFn: (companyId: string) => deleteCompanyApi(companyId),
    onSuccess: () => {
      toast.success('Company successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['companies', 'company'] });
    },
    onError: err => toast.error(err.message),
  });

  return { deleteCompany, isDeleting };
}
