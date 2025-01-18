export async function deleteTransactionApi(transactionId: string) {
  const apiUrl = `http://localhost:8080/transaction/${transactionId}`;

  const response = await fetch(apiUrl, {
    method: 'DELETE',
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
