import { NewProduct } from '@/types/product';

export async function updateProductApi({
  productId,
  updatedProduct,
}: {
  productId: string;
  updatedProduct: NewProduct;
}) {
  const apiUrl = `http://85.217.171.125:8080/product/${productId}`;

  const response = await fetch(apiUrl, {
    method: 'PATCH',
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
