import { API_URL } from '@/lib/api-url';
import { NewProduct } from '@/types/product';

export async function addProductApi(newProduct: NewProduct) {
  const apiUrl = `${API_URL}/product`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  });

  if (!response.ok) {
    throw new Error('Could not add product');
  }

  const data = await response.json();

  return data;
}
