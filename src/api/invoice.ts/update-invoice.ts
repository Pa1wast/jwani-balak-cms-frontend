import { API_URL } from '@/lib/api-url';
import { UpdatedInvoice } from '@/types/invoice';

export async function updateInvoiceApi(updatedInvoice: UpdatedInvoice) {
  const apiUrl = `${API_URL}/invoice/${updatedInvoice._id}`;

  const response = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ NO: updatedInvoice.NO }),
  });

  if (!response.ok) {
    throw new Error('Could not updated invoice');
  }

  const data = await response.json();

  return data;
}
