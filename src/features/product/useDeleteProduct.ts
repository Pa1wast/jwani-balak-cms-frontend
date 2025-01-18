import { deleteProductApi } from '@/api/product/delete-product';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: (productId: string) => deleteProductApi(productId),
    onSuccess: () => {
      toast.success('Product successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
    onError: err => toast.error(err.message),
  });

  return { deleteProduct, isDeleting };
}
