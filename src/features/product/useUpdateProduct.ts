import { updateProductApi } from '@/api/product/update-product';
import { NewProduct } from '@/types/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: ({
      productId,
      updatedProduct,
    }: {
      productId: string;
      updatedProduct: NewProduct;
    }) => updateProductApi({ productId, updatedProduct }),
    onSuccess: () => {
      toast.success('Product successfully updated');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
    onError: err => toast.error(err.message),
  });

  return { updateProduct, isUpdating };
}
