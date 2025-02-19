import { API_URL } from '@/lib/api-url';

export async function getInvoice(invoiceId: string) {
  const apiUrl = `${API_URL}/invoice/${invoiceId}`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not get invoice');
  }

  const data = await response.json();

  return data;
}
