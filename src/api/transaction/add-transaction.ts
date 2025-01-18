import { NewTransaction } from '@/types/transaction';

export async function addTransactionApi(newTransaction: NewTransaction) {
  const apiUrl = 'http://localhost:8080/transaction';

  console.log(newTransaction);

  const response = await fetch(apiUrl, {
    method: 'POST',
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
