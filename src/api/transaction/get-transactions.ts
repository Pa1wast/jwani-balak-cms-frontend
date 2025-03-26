import { API_URL } from '@/lib/api-url';

export async function getTransactionsApi(companyId: string) {
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

  const apiUrl2 = `${API_URL}/sellTransaction?companyId=${companyId}`;
  const response2 = await fetch(apiUrl2, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response2.ok) {
    throw new Error('Could not get sell transactions');
  }

  const data2 = await response2.json();

  const transactions = data?.data.buyTransactions.concat(data2?.data.sellTransactions);

  return transactions;
}

export async function getBuyTransactionsApi(companyId: string) {
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

export async function getSellTransactionsApi(companyId: string) {
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
