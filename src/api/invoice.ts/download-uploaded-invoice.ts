import { API_URL } from '@/lib/api-url';

export async function downloadInvoiceApi(filePath: string) {
  const apiUrl = `${API_URL}/uploadedInvoices/${filePath}`;

  const response = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not download invoice');
  }
}
