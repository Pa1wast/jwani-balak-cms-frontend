import { API_URL } from '@/lib/api-url';

export async function deleteBuyTransactionApi(transactionId: string) {
  const apiUrl = `${API_URL}/buyTransaction/${transactionId}`;

  const response = await fetch(apiUrl, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not delete sell transaction');
  }

  if (response.status !== 204) {
    const data = await response.json();
    return data;
  }

  return {};
}

export async function deleteSellTransactionApi(transactionId: string) {
  const apiUrl = `${API_URL}/sellTransaction/${transactionId}`;

  const response = await fetch(apiUrl, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not delete buy transaction');
  }

  if (response.status !== 204) {
    const data = await response.json();
    return data;
  }

  return {};
}
