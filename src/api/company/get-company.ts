import { API_URL } from '@/lib/api-url';

export async function getCompany(companyId: string) {
  const apiUrl = `${API_URL}/company/${companyId}`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not get company');
  }

  const data = await response.json();

  return data;
}
