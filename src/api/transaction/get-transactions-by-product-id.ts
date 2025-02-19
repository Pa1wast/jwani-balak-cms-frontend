import { API_URL } from '@/lib/api-url';

export async function getTransactionsByProductId(productId: string) {
  const apiUrl = `${API_URL}/transaction?productId=${productId}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Could not get transactions by product ID');
  }

  const data = await response.json();

  return data;
}
