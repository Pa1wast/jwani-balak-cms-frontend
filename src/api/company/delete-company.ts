import { API_URL } from '@/lib/api-url';

export async function deleteCompanyApi(companyId: string) {
  const apiUrl = `${API_URL}/company/${companyId}`;

  const response = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not delete company');
  }

  if (response.status !== 204) {
    const data = await response.json();
    return data;
  }

  return {};
}
