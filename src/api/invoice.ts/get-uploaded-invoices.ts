import { API_URL } from '@/lib/api-url';

export async function getUploadedInvoices(companyId: string) {
  const apiUrl = `${API_URL}/uploadedInvoices?companyId=${companyId}`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error('Could not get uploaded invoices');
  }

  const data = await response.json();

  return data;
}
