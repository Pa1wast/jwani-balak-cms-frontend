import { API_URL } from '@/lib/api-url';

export async function getBuyTransactions(companyId: string) {
  const apiUrl = `${API_URL}/buyTransaction?companyId=${companyId}`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not get buy transactions');
  }

  const data = await response.json();

  return data;
}

export async function getSellTransactions(companyId: string) {
  const apiUrl = `${API_URL}/sellTransaction?companyId=${companyId}`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not get sell transactions');
  }

  const data = await response.json();

  return data;
}
