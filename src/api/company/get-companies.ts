import { API_URL } from '@/lib/api-url';

export async function getCompanies() {
  const apiUrl = `${API_URL}/company?page=1&limit=10000`;
  const response = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not get companies');
  }

  const data = await response.json();

  return data;
}
