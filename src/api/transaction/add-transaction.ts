import { API_URL } from '@/lib/api-url';
import { NewTransaction } from '@/types/transaction';

export async function addTransactionApi(newTransaction: NewTransaction) {
  const apiUrl = `${API_URL}/transaction`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTransaction),
  });

  if (!response.ok) {
    console.log(response, 'not ok');
    throw new Error('Could not add transaction');
  }

  const data = await response.json();

  return data;
}
