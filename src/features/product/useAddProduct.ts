import { addProductApi } from '@/api/product/add-product';
import { NewProduct } from '@/types/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAddProduct() {
  const queryClient = useQueryClient();

  const { mutate: addProduct, isPending: isAdding } = useMutation({
    mutationFn: (newProduct: NewProduct) => addProductApi(newProduct),
    onSuccess: () => {
      toast.success('Product successfully added');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: err => toast.error(err.message),
  });

  return { addProduct, isAdding };
}
