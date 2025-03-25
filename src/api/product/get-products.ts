import { API_URL } from '@/lib/api-url';

export async function getProducts(companyId: string) {
  const apiUrl = `${API_URL}/product?companyId=${companyId}`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not get products');
  }

  const data = await response.json();

  return data;
}
