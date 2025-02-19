import { API_URL } from '@/lib/api-url';

export async function getKleshNotes(companyId: string, page = 1, limit = 10000) {
  const apiUrl = `${API_URL}/klesh?companyId=${companyId}&page=${page}&limit=${limit}`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not get klesh notes');
  }

  const data = await response.json();

  return data;
}
