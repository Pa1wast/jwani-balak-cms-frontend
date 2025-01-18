import { editCompanyApi } from '@/api/company/edit-company';
import { NewCompany } from '@/types/company';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  const { mutate: updateCompany, isPending: isUpdating } = useMutation({
    mutationFn: ({
      companyId,
      updatedCompany,
    }: {
      companyId: string;
      updatedCompany: NewCompany;
    }) => editCompanyApi({ companyId, updatedCompany }),
    onSuccess: () => {
      toast.success('Company successfully updated');
      queryClient.invalidateQueries({ queryKey: ['companies', 'company'] });
    },
    onError: err => toast.error(err.message),
  });

  return { updateCompany, isUpdating };
}
