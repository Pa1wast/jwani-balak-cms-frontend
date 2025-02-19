import { API_URL } from '@/lib/api-url';

export async function deleteInvoiceApi(invoiceId: string) {
  const apiUrl = `${API_URL}/invoice/${invoiceId}`;
  const response = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not delete invoice');
  }

  if (response.status !== 204) {
    const data = await response.json();
    return data;
  }

  return {};
}
