import { API_URL } from '@/lib/api-url';

export async function getBuyTransaction(transactionId: string) {
  const apiUrl = `${API_URL}/buyTransaction/${transactionId}`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not get buy transaction');
  }

  const data = await response.json();

  return data;
}

export async function getSellTransaction(transactionId: string) {
  const apiUrl = `${API_URL}/sellTransaction/${transactionId}`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not get sell transaction');
  }

  const data = await response.json();

  return data;
}
