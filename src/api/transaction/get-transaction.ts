import { API_URL } from '@/lib/api-url';

export async function getTransaction(transactionId: string) {
  const apiUrl = `${API_URL}/transaction/${transactionId}`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not get transaction');
  }

  const data = await response.json();

  return data;
}
