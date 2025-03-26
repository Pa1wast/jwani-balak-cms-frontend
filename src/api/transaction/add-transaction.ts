import { API_URL } from '@/lib/api-url';
import { NewBuyTransaction, NewSellTransaction } from '@/types/transaction';

export async function addBuyTransactionApi(newTransaction: NewBuyTransaction) {
  const apiUrl = `${API_URL}/buyTransaction`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTransaction),
  });

  if (!response.ok) {
    throw new Error('Could not add buy transaction');
  }

  const data = await response.json();

  return data;
}

export async function addSellTransactionApi(newTransaction: NewSellTransaction) {
  const apiUrl = `${API_URL}/sellTransaction`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTransaction),
  });

  if (!response.ok) {
    throw new Error('Could not add sell transaction');
  }

  const data = await response.json();

  return data;
}
