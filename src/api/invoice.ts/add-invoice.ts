import { API_URL } from '@/lib/api-url';
import { NewInvoice } from '@/types/invoice';

export async function addInvoiceApi(newInvoice: NewInvoice) {
  const apiUrl = `${API_URL}/invoice`;

  console.log(newInvoice);

  const response = await fetch(apiUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newInvoice),
  });

  if (!response.ok) {
    throw new Error('Could not add invoice');
  }

  const data = await response.json();

  return data;
}
