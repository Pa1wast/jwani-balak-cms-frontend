import { API_URL } from '@/lib/api-url';
import { NewProduct } from '@/types/product';

export async function updateProductApi({
  productId,
  updatedProduct,
}: {
  productId: string;
  updatedProduct: NewProduct;
}) {
  const apiUrl = `${API_URL}/product/${productId}`;

  const response = await fetch(apiUrl, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProduct),
  });

  if (!response.ok) {
    throw new Error('Could not update product');
  }

  const data = await response.json();

  return data;
}
