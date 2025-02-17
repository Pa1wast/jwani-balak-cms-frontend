import { NewProduct } from '@/types/product';

export async function addProductApi(newProduct: NewProduct) {
  const apiUrl = 'http://85.217.171.125:8080/product';

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
