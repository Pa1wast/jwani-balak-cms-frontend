import { API_URL } from '@/lib/api-url';

export async function downloadInvoice(filePath: string): Promise<File> {
  const apiUrl = `${API_URL}/uploadedInvoices/${filePath}`;

  const response = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Could not download invoice');
  }

  const blob = await response.blob();
  const fileName = filePath.split('/').pop() || 'invoice.pdf';

  return new File([blob], fileName, { type: blob.type });
}
