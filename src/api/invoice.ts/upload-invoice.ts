import { API_URL } from '@/lib/api-url';
import { NewUploadedInvoice } from '@/types/invoice';

export async function uploadInvoiceApi(newUploadedInvoice: NewUploadedInvoice) {
  const apiUrl = `${API_URL}/uploadedInvoices`;

  const formData = new FormData();
  formData.append('company', newUploadedInvoice.company);
  formData.append('name', newUploadedInvoice.name);

  if (!newUploadedInvoice.invoice) throw new Error('Error Uploading invoice? No file provided.');
  formData.append('invoice', newUploadedInvoice.invoice);

  const response = await fetch(apiUrl, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Could not upload invoice');
  }

  const data = await response.json();

  return data;
}
