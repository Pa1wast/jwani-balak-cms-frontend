import { API_URL } from '@/lib/api-url';

export async function deleteTransactionApi(transactionId: string) {
  const apiUrl = `${API_URL}/transaction/${transactionId}`;

  const response = await fetch(apiUrl, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not delete transaction');
  }

  if (response.status !== 204) {
    const data = await response.json();
    return data;
  }

  return {};
}
